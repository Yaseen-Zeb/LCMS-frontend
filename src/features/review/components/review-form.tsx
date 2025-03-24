import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IReviewForm, ReviewFormDV, ReviewFormSchema } from "../api/schema";
import { useSubmitReview } from "../api/api-queries";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookmarkCheck, PartyPopper } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const ReviewForm = ({
  case_id,
  lawyer_id,
}: {
  case_id: number;
  lawyer_id: number;
}) => {
  const form = useForm<IReviewForm>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: ReviewFormDV,
  });

  const submitReviewMutation = useSubmitReview();

  const onSubmit = (data: IReviewForm) => {
    submitReviewMutation.mutate({
      ...data,
      case_id,
      lawyer_id,
    });
  };

  return (
    <Dialog onOpenChange={() => form.reset()}>
      <DialogTrigger asChild>
        <div className="flex gap-1 items-center text-green-600">
          <BookmarkCheck className="w-4 h-4" />
          Case Completed?
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            Complete Case & Review <PartyPopper className="text-primary mb-1" />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Please provide a review for the lawyer to finalize the case.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                      onKeyDown={(e) => e.stopPropagation()}
                        rows={4}
                        placeholder="Write your review here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={submitReviewMutation.isLoading}
                className="w-full"
              >
                Submit Review & Complete
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm;
