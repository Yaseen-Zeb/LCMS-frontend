import {
  Dialog,
  dialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ILawyerUpdateProfileForm,
  LawyerProfileUpdateFormSchema,
} from "../../../lawyer/api/schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types";
import { useclientUpdateProfileMutation } from "../../api/api-queries";

const UpdateProfile = ({ oldDetalil }: { oldDetalil: IUser }) => {
  const form = useForm<ILawyerUpdateProfileForm>({
    resolver: zodResolver(LawyerProfileUpdateFormSchema),
    defaultValues: oldDetalil,
  });
  const clientUpdateProfileMutation = useclientUpdateProfileMutation();

  const onSubmit = (data: ILawyerUpdateProfileForm) => {
    clientUpdateProfileMutation.mutate(data);
  };
  return (
    <Dialog onOpenChange={()=>form.reset()}>
      <DialogTrigger>
        {" "}
        <Button variant={"outline"} className="w-[170px] h-8">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="px-1 mt-3">
          <h2 className="text-lg font-semibold leading-none tracking-tight mb-2">
            Update Profile
          </h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 pb-4 max-w-md mx-auto"
            >
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number Field */}
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your full address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 justify-end items-center">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => dialogClose()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={clientUpdateProfileMutation.isLoading}
                >
                  Update
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;
