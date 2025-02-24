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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormDV, LogInFormSchema, ILoginForm } from "../api/schema";
import { useSignInMutation } from "../api/api-queries";
import { DialogFooter } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

const Login = ({
  setIsOpen,
  setTab,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setTab: Dispatch<SetStateAction<string>>;
}) => {
  const form = useForm<ILoginForm>({
    resolver: zodResolver(LogInFormSchema),
    defaultValues: LoginFormDV,
  });

  const signInMutation = useSignInMutation();

  const onSubmit = (data: ILoginForm) => {
    signInMutation.mutate(data);
  };
  return (
    <Form {...form}>
      <div className="flex flex-col mb-4">
        <h2 className="text-lg font-semibold leading-none tracking-tight">
          Access Your Account
        </h2>
        <span className="text-sm text-muted-foreground">
          Please login to continue.
        </span>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 mb-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button
            variant="outline"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={signInMutation.isLoading}>
            Login
          </Button>
        </DialogFooter>
      </form>
      <p className="text-sm text-start mt-2">
        Don't have an account?{" "}
        <button
          type="button"
          className="text-primary underline"
          onClick={() => setTab("register")}
        >
          Register here
        </button>
      </p>
    </Form>
  );
};

export default Login;
