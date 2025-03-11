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
} from "../api/schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types";
import { useLawyerUpdateProfileMutation } from "../api/api-queries";
import { EXPERTISE_AREAS } from "@/utils/constant";
import { MultiSelect } from "@/components/ui/multi-select";

const UpdateLawyerProfile = ({ oldDetalil }: { oldDetalil: IUser }) => {
  const form = useForm<ILawyerUpdateProfileForm>({
    resolver: zodResolver(LawyerProfileUpdateFormSchema),
    defaultValues: oldDetalil,
  });
  const lawyerUpdateProfileMutation = useLawyerUpdateProfileMutation();

  const onSubmit = (data: ILawyerUpdateProfileForm) => {
    lawyerUpdateProfileMutation.mutate(data);
  };
  return (
    <Dialog onOpenChange={() => form.reset(oldDetalil)}>
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
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialization</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={EXPERTISE_AREAS}
                        onValueChange={field.onChange}
                        placeholder={"Select specialization"}
                        maxCount={2}
                        className="w-full"
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter years of experience"
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
                        rows={3}
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
                  disabled={lawyerUpdateProfileMutation.isLoading}
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

export default UpdateLawyerProfile;
