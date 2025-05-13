import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  dialogClose,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BookmarkCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAcceptBid } from "../api/api-queries";
import { useAuthContext } from "@/providers/auth-provider";
import { IAcceptBidForm, AcceptBidSchema, AcceptBidFormDV } from "../api/schema";
import { IBid } from "@/types";

const AcceptBidDialog = ({ bid }: { bid: IBid }) => {
  const { user } = useAuthContext();
  const form = useForm<IAcceptBidForm>({
    resolver: zodResolver(AcceptBidSchema),
    defaultValues: AcceptBidFormDV,
  });

  const acceptBidMutation = useAcceptBid();

  const onSubmit = (data: IAcceptBidForm) => {
    acceptBidMutation.mutate({
      ...data,
      caseId: bid.case_id,
      receiverId: bid.lawyer.id,
      senderId: user!.id,
      bidId: bid.id,
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-1.5 w-full">
        <BookmarkCheck size={15} /> Accept
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Bid Acceptance</DialogTitle>
          <DialogDescription>
            By accepting this bid, you will initiate a direct chat with <strong>{bid.lawyer.name}</strong> to discuss your case progress. Please note that:
            <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-600">
              <li>All other bids for this case will be deactivated.</li>
              <li>You will engage in direct communication with this lawyer.</li>
              <li>Ensure you are comfortable proceeding with this lawyer before accepting.</li>
            </ul>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Write your first message to the lawyer to initiate the discussion:<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`Hello ${bid.lawyer.name}, I would like to discuss my case...`}
                      {...field}
                      onKeyDown={(event) => event.stopPropagation()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                onClick={() => dialogClose()}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                disabled={acceptBidMutation.isLoading}
                type="submit"
                variant="default"
                className="w-full sm:w-auto"
              >
                Accept and Start Chat
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
 export default AcceptBidDialog;

