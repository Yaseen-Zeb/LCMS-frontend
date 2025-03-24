import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "../../../components/shared/header";
import NavBar from "../../../components/shared/nav-bar";
import Footer from "../../../components/shared/footer";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FeedbackFormDV,
  FeedbackFormSchema,
  IFeedBackForm,
} from "../api/schema";
import { useAddFeedback } from "../api/api-queries";
const ContactUs = () => {
  const form = useForm<IFeedBackForm>({
    resolver: zodResolver(FeedbackFormSchema),
    defaultValues: FeedbackFormDV,
  });

  const addFeedbackMutation = useAddFeedback();

  const onSubmit = (data: IFeedBackForm) => {
    addFeedbackMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <div className="text-gray-800 flex flex-col justify-center">
      <NavBar />
      <Header />

      <div className="container mx-auto p-6">
        <Card className="shadow-lg rounded-2xl p-6 bg-white">
          <CardContent>
            <h2 className="text-xl font-medium mb-1">Get in Touch</h2>
            <p className="text-gray-600 mb-3">
              Have questions, need assistance, or found a bug? Reach out to
              us—we’re happy to help and always working to improve the app!
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4 mb-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name<span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email<span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. user@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message<span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type message here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={addFeedbackMutation.isLoading}
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
