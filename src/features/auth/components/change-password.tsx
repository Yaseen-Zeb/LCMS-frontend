import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  dialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ChangePasswordFormDV,
  ChangePasswordFormSchema,
  IChangePasswordForm,
} from "../api/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePasswordMutation } from "../api/api-queries";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const form = useForm<IChangePasswordForm>({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues: ChangePasswordFormDV,
  });

  const changePasswordMutation = useChangePasswordMutation();

  const onSubmit = (data: IChangePasswordForm) => {
    changePasswordMutation.mutate(data);
  };
  return (
    <Dialog onOpenChange={() => form.reset()}>
      <DialogTrigger>
        <Button variant={"outline"} className="w-[170px] h-8">
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <div className="flex flex-col mb-4">
            <h2 className="text-lg font-semibold leading-none tracking-tight">
              Change Your Password
            </h2>
            <span className="text-sm text-muted-foreground">
              Enter your current password and set a new one.
            </span>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 mb-2"
          >
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currect Password<span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        {...field}
                        className="pr-10" // Ensure space for the icon
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <Eye className="text-gray-500" size={18} />
                        ) : (
                          <EyeClosed className="text-gray-500" size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password<span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword1 ? "text" : "password"}
                        placeholder="********"
                        {...field}
                        className="pr-10" // Ensure space for the icon
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center"
                        onClick={() => setShowPassword1((prev) => !prev)}
                      >
                        {showPassword1 ? (
                          <Eye className="text-gray-500" size={18} />
                        ) : (
                          <EyeClosed className="text-gray-500" size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password<span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword2 ? "text" : "password"}
                        placeholder="********"
                        {...field}
                        className="pr-10" // Ensure space for the icon
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center"
                        onClick={() => setShowPassword2((prev) => !prev)}
                      >
                        {showPassword2 ? (
                          <Eye className="text-gray-500" size={18} />
                        ) : (
                          <EyeClosed className="text-gray-500" size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => dialogClose()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={changePasswordMutation.isLoading}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
