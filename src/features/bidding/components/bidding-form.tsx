import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction, useEffect } from "react";
import { BiddingFormDV, BiddingFormSchema, IBiddingForm } from "../api/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBidMutation } from "../api/api-queries";
import { useAuthContext } from "@/providers/auth-provider";

const BiddingForm = ({
  isBidFormOpen,
  setIsBidFormOpen,
}: {
  isBidFormOpen: boolean;
  setIsBidFormOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { bidCaseId } = useAuthContext();
  const form = useForm<IBiddingForm>({
    resolver: zodResolver(BiddingFormSchema),
    defaultValues: BiddingFormDV,
  });

  const bidMutation = useBidMutation();

  const onSubmit = (data: IBiddingForm) => {
    if (bidCaseId) {
      bidMutation.mutate({ ...data, caseId: bidCaseId });
    }
  };

  useEffect(() => {
    if (!isBidFormOpen) {
      form.reset();
    }
  }, [isBidFormOpen, form]);

  return (
    <Dialog open={isBidFormOpen} onOpenChange={setIsBidFormOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <Form {...form}>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold leading-none tracking-tight">
              Submit Your Bid
            </h2>
            <span className="text-sm text-muted-foreground">
              Provide a detailed description of your bid before submission.
              Ensure clarity and accuracy for better consideration.
            </span>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 mb-2"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsBidFormOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={bidMutation.isLoading}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BiddingForm;
