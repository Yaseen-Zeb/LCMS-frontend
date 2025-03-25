import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Check, Eye, Menu, Send, X } from "lucide-react";
import NavBar from "@/components/shared/nav-bar";
import { useAuthContext } from "@/providers/auth-provider";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import {
  useGetMessages,
  useGetPartners,
  useSendMessage,
} from "../api/api-queries";
import { Skeleton } from "@/components/ui/skeleton";
import { env } from "@/config/env";
import ApiResponseError from "@/components/shared/api-response-error";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  IMessageForm,
  MessageFormDV,
  MessageFormSchema,
} from "../api/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import formatTime from "@/utils/formatTime";
import MessageActions from "./message-actions";
import OngoingCases from "./ongoing-cases";

export default function Chat() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // <-- NEW

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { user, loading } = useAuthContext();
  const {
    data: partners,
    isLoading: isPartnersLoading,
    isError: isPartnerError,
    error: partnerError,
  } = useGetPartners();

  const selectedUser =
    partners?.data.find((p) => p.id === selectedUserId) ?? null;
  const selectedUserCases = selectedUser?.cases ?? [];

  const {
    data: messages,
    isLoading: isMessagesLoading,
    isError: isMessageError,
    error: messageError,
  } = useGetMessages(selectedUser?.id ?? 0, {
    enabled: !!selectedUser,
  });

  const paramId = searchParams.get("partnerId");

  if (!selectedUser && partners?.data && paramId) {
    const matched = partners.data.find((p) => p.id === parseInt(paramId));
    if (matched) {
      setSelectedUserId(matched.id);
    }
    navigate("/chat", { replace: true });
  }

  const form = useForm<IMessageForm>({
    resolver: zodResolver(MessageFormSchema),
    defaultValues: MessageFormDV,
  });

  const sendMessageMutation = useSendMessage();

  const onSubmit = (data: IMessageForm) => {
    sendMessageMutation.mutate(
      {
        ...data,
        receiverId: selectedUser!.id,
        senderId: user!.id,
      },
      {
        onSuccess: () => {
          form.reset();
        },
      }
    );
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages]);

  if (!loading && !user) {
    return <Navigate to="/" />;
  }

  const renderPartnersSkeleton = () =>
    Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className="p-3 flex items-center gap-3 border-b border-gray-200"
      >
        <Skeleton className="h-9 w-10 rounded-full" />
        <div className="flex flex-col gap-1 w-full">
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-3 w-3/5" />
        </div>
      </div>
    ));

  const renderPartnerList = () => {
    if (isPartnersLoading) return renderPartnersSkeleton();
    if (isPartnerError)
      return <ApiResponseError msg={(partnerError as Error).message} />;
    if (!partners?.data?.length) {
      return (
        <p className="text-center text-gray-400 text-base">
          {user?.role === "client"
            ? "You can only chat with lawyers who are assigned to your cases. No eligible lawyers found."
            : "You can only chat with clients you are assisting. No eligible clients found."}
        </p>
      );
    }

    const filteredPartners = partners.data.filter((partner) =>
      partner.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredPartners.map((partner) => (
      <div
        key={partner.id}
        onClick={() => {
          setSelectedUserId(partner.id);
          setSidebarOpen(false);
        }}
        className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-200 border-b border-gray-400 ${
          selectedUser?.id === partner.id ? "bg-gray-100" : ""
        }`}
      >
        <div className="relative inline-block">
          <Avatar>
            <AvatarImage
              src={`${env.VITE_APP_BASE_URL}/${partner.profile_picture}`}
            />
            <AvatarFallback>{partner.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
              partner.is_online ? "bg-green-500" : "bg-gray-400"
            }`}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">{partner.name}</span>
          <span className="text-gray-500 text-sm">Tap to open chat</span>
        </div>
      </div>
    ));
  };

  const renderMessages = () => {
    if (isMessagesLoading)
      return <div className="space-y-4">{renderPartnersSkeleton()}</div>;
    if (isMessageError)
      return <ApiResponseError msg={(messageError as Error).message} />;
    if (!messages?.data?.length)
      return <p className="text-center">No messages yet</p>;

    return (
      <>
        {messages.data.map((msg) => {
          const isMine = msg.senderId === user!.id;
          return (
            <div
              key={msg.id}
              className={`flex gap-2 items-start ${
                isMine ? "justify-end" : ""
              }`}
            >
              <div
                className={`group flex flex-col gap-1 ${
                  isMine ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`relative break-words overflow-hidden p-2 px-3 pr-6 rounded-2xl text-sm max-w-[80vw] md:max-w-xs ${
                    isMine
                      ? "bg-blue-400 text-white rounded-br-none rounded-tl-none"
                      : "bg-gray-200 rounded-tl-none rounded-br-none"
                  }`}
                >
                  {msg.message}
                  <div
                    className={`absolute hidden group-hover:flex z-50 right-0.5 bottom-1 ${
                      isMine ? "text-white" : ""
                    }`}
                  >
                    <MessageActions message={msg} />
                  </div>
                </div>
                <div
                  className={`flex items-center gap-2 text-xs text-gray-400 w-full ${
                    isMine ? "justify-end" : "justify-start"
                  }`}
                >
                  <span>{formatTime(msg.createdAt)}</span>
                  {isMine && (
                    <span className="flex items-center gap-1 italic">
                      {msg.seen ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </>
    );
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] bg-gray-100 overflow-hidden relative">
        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center justify-between p-3 bg-white shadow">
          <h2 className="text-lg font-bold">Chats</h2>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Sidebar */}
        <aside
          className={`z-40 fixed md:static top-0 left-0 h-full w-3/4 max-w-sm bg-white p-4 shadow-lg border-r transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <div className="flex justify-between items-center mb-4 md:hidden">
            <h2 className="text-xl font-bold">Chats</h2>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <Input
            placeholder="Search..."
            className="mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // <-- SEARCH HERE
          />
          <div className="overflow-auto h-[calc(100vh-160px)] space-y-1">
            {renderPartnerList()}
          </div>
        </aside>

        {/* Chat Window */}
        <main className="flex-1 flex flex-col bg-white shadow-lg overflow-hidden">
          {selectedUser ? (
            <>
              <div className="flex items-center justify-between p-4 border-b shadow-md">
                <div className="flex items-center gap-3">
                  <div className="relative inline-block">
                    <Avatar>
                      <AvatarImage src={`${env.VITE_APP_BASE_URL}/${selectedUser.profile_picture}`} />
                      <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        selectedUser.is_online ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="block md:hidden">{selectedUser.name.slice(0, 5)}...</span><span className="hidden md:block">{selectedUser.name}</span>
                    {!selectedUser.is_online && selectedUser.last_seen && (
                      <span className="text-sm text-gray-500">
                        Last seen: {formatTime(selectedUser.last_seen)}
                      </span>
                    )}
                  </div>
                </div>
                {user?.role === "client" && (
                  <OngoingCases cases={selectedUserCases} selectedUserId={Number(selectedUserId)} />
                )}
              </div>

              <div className="flex-1 p-4 overflow-auto space-y-4">
                {renderMessages()}
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="p-4 border-t"
                >
                  <div className="flex items-center gap-3 w-full">
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder="Type a message..."
                              {...field}
                              className="w-full"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={sendMessageMutation.isLoading}
                    >
                      <Send className="mr-2 h-4 w-4" /> Send
                    </Button>
                  </div>
                </form>
              </Form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-lg text-center p-4">
              Select a user to start chatting
            </div>
          )}
        </main>
      </div>
    </>
  );
}
