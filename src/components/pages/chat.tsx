import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MoreVertical } from "lucide-react";
import NavBar from "../shared/nav-bar";

export default function Chat() {
  return (
    <>
      <NavBar />
      <div className="flex h-[calc(100vh-64px)] bg-gray-100 overflow-auto">
        {/* Sidebar */}
        <aside className="w-[28%] bg-white p-4 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Chats</h2>
          <Input placeholder="Search..." className="mb-4" />
          <div className=" overflow-auto h-[calc(100vh-200px)]">
            {["Yaseen Zeb", "Kamran", "Ali khatak", "Sohail Khan"].map(
              (name, i) => (
                <div
                  key={i}
                  className="p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-200 border-b border-gray-400"
                >
                  <Avatar>
                    <AvatarImage
                      src={`https://i.pravatar.cc/50?img=${i + 11}`}
                    />
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold">{name}</span>
                    <span className="text-gray-500 text-sm">
                      Lorem ipsum dummy text
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </aside>

        {/* Chat Window */}
        <main className="flex-1 flex flex-col bg-white shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/50?img=11" />
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
              <span className="font-semibold text-lg">Yaseen Zeb</span>
            </div>
            <div className="flex gap-3">
              <MoreVertical className="cursor-pointer text-gray-600" />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-auto space-y-4">
            {/* Message 1 */}
            <div className="flex gap-2 items-start">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/50?img=12" />
                <AvatarFallback>P</AvatarFallback>
              </Avatar>
              <div className="bg-gray-200 p-2 rounded-lg max-w-xs text-sm">
                Hi Ram, how are you doing?
              </div>
            </div>

            {/* Message 2 */}
            <div className="flex gap-2 items-start justify-end">
              <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs text-sm">
                I'm good, how about you?
              </div>
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/50?img=11" />
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
            </div>

            {/* Message 3 */}
            <div className="flex gap-2 items-start">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/50?img=12" />
                <AvatarFallback>P</AvatarFallback>
              </Avatar>
              <div className="bg-gray-200 p-2 rounded-lg max-w-xs text-sm">
                I'm doing well too! Been a busy week though. Work has been
                crazy.
              </div>
            </div>

            {/* Message 4 */}
            <div className="flex gap-2 items-start justify-end">
              <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs text-sm">
                I can imagine! Anything interesting going on?
              </div>
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/50?img=11" />
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
            </div>

            {/* Message 5 */}
            <div className="flex gap-2 items-start">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/50?img=12" />
                <AvatarFallback>P</AvatarFallback>
              </Avatar>
              <div className="bg-gray-200 p-2 rounded-lg max-w-xs text-sm">
                Yeah, we're launching a new project next week. Super excited but
                also stressed.
              </div>
            </div>

            {/* Message 6 */}
            <div className="flex gap-2 items-start justify-end">
              <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs text-sm">
                That sounds amazing! What's the project about?
              </div>
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/50?img=11" />
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
            </div>

            {/* Message 7 */}
            <div className="flex gap-2 items-start">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/50?img=12" />
                <AvatarFallback>P</AvatarFallback>
              </Avatar>
              <div className="bg-gray-200 p-2 rounded-lg max-w-xs text-sm">
                It's an AI-powered analytics tool for businesses. Hoping it
                makes a difference!
              </div>
            </div>

            {/* Message 8 */}
            <div className="flex gap-2 items-start justify-end">
              <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs text-sm">
                Wow, that sounds like a big deal. Let me know if you need any
                help!
              </div>
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/50?img=11" />
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
            </div>

            {/* Message 9 */}
            <div className="flex gap-2 items-start">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/50?img=12" />
                <AvatarFallback>P</AvatarFallback>
              </Avatar>
              <div className="bg-gray-200 p-2 rounded-lg max-w-xs text-sm">
                Appreciate it! Let's catch up soon over coffee?
              </div>
            </div>

            {/* Message 10 */}
            <div className="flex gap-2 items-start justify-end">
              <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs text-sm">
                Sounds like a plan! Let me know when you're free.
              </div>
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/50?img=11" />
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t flex items-center gap-3">
            <Input placeholder="Type a message..." className="flex-1" />
            <Button>Send</Button>
          </div>
        </main>
      </div>
    </>
  );
}
