import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IMessage } from "@/types";
import { ListCollapse } from "lucide-react";
import formatDate from "@/utils/formatDate";
import formatTime from "@/utils/formatTime";
import { useDeleteForEveryOne, useDeleteForMe } from "../api/api-queries";
import { useAuthContext } from "@/providers/auth-provider";

const MessageActions = ({ message }: { message: IMessage }) => {
  const { user } = useAuthContext();
  const deleteForMeMutation = useDeleteForMe();
  const deleteForEveryOneMutation = useDeleteForEveryOne();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ListCollapse className="cursor-pointer" size={17} />
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-gray-700 text-base">
            Message Info
          </DialogTitle>
          <DialogDescription className="space-y-1 text-gray-600 mt-2">
            <p>
              <span className=" text-black">Message:</span> {message.message}
            </p>
            <p>
              <span className=" text-black">Date:</span>{" "}
              {formatDate(message.createdAt)}
            </p>
            <p>
              <span className=" text-black">Time:</span>{" "}
              {formatTime(message.createdAt)}
            </p>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col gap-2 items-start mt-4">
          <Button
            variant="outline"
            className={`w-full ${
              deleteForEveryOneMutation.isLoading ? "cursor-not-allowed" : ""
            }`}
            disabled={deleteForMeMutation.isLoading}
            onClick={() =>
              deleteForMeMutation.mutate({
                messageId: message.id,
                userId: user!.id,
              })
            }
          >
            Delete for me
          </Button>
          <Button
            variant="destructive"
            className={`w-full ${
              deleteForMeMutation.isLoading ? "cursor-not-allowed" : ""
            }`}
            disabled={deleteForEveryOneMutation.isLoading}
            onClick={() =>
              deleteForEveryOneMutation.mutate({ messageId: message.id })
            }
          >
            Delete for everyone
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageActions;
