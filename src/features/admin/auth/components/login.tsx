import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ILoginForm, LoginFormDV, LogInFormSchema } from "../api/schema";
import { useSignInMutation } from "../api/api-queries";
import { Eye, EyeClosed } from "lucide-react";
import { logo } from "@/assets";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<ILoginForm>({
    resolver: zodResolver(LogInFormSchema),
    defaultValues: LoginFormDV,
  });

  const signInMutation = useSignInMutation();

  const onSubmit = (data: ILoginForm) => {
    signInMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-muted w-[450px]">
      <div className="bg-card w-full  p-4 rounded-lg shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] space-y-6">
        <div className="grid place-items-center">
          <img src={logo} alt="LCMS Logo" className="w-20" />
          <h1 className="text-lg font-semibold text-balance text-center">
            Login to your account
          </h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. user@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        {...field}
                        className="pr-10"
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

            <div className="flex justify-end">
              <Button type="submit" disabled={signInMutation.isLoading}>
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Login;
