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

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types";
import { useClientUpdateProfileMutation } from "../api/api-queries";
import {
  ClientProfileUpdateFormSchema,
  IClientUpdateProfileForm,
} from "../api/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UpdateClientProfile = ({ oldDetalil }: { oldDetalil: IUser }) => {
  const form = useForm<IClientUpdateProfileForm>({
    resolver: zodResolver(ClientProfileUpdateFormSchema),
    defaultValues: oldDetalil,
  });
  const clientUpdateProfileMutation = useClientUpdateProfileMutation();

  const onSubmit = (data: IClientUpdateProfileForm) => {
    clientUpdateProfileMutation.mutate(data);
  };

  return (
    <Dialog onOpenChange={() => form.reset()}>
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
                    <FormLabel>
                      Name<span className="text-destructive">*</span>
                    </FormLabel>
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
                    <FormLabel>
                      Email<span className="text-destructive">*</span>
                    </FormLabel>
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
                    <FormLabel>
                      Phone Number<span className="text-destructive">*</span>
                    </FormLabel>
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

              {/* CNIC Field */}
              <FormField
                control={form.control}
                name="cnic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      CNIC<span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 3520212345671" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Gender<span className="text-destructive">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Profession Field */}
              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Profession<span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Languages Spoken Field */}
              <FormField
                control={form.control}
                name="languages_spoken"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Languages Spoken
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., English, Urdu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      City<span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your city" {...field} />
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
                    <FormLabel>
                      Address<span className="text-destructive">*</span>
                    </FormLabel>
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
             <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
  <Button
    variant="outline"
    type="button"
    onClick={() => dialogClose()}
    className="w-full sm:w-auto"
  >
    Cancel
  </Button>
  <Button
    type="submit"
    disabled={clientUpdateProfileMutation.isLoading}
    className="w-full sm:w-auto"
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

export default UpdateClientProfile;
