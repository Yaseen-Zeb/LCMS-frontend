import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  ClientRegisterFormDV,
  ClientRegisterFormSchema,
  IClientRegisterForm,
} from "../api/schema";
import { Dispatch, SetStateAction, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { dialogClose } from "@/components/ui/dialog";
import { useAuthContext } from "@/providers/auth-provider";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ClientRegisterForm = ({
  setIsAuthDialogOpen,
}: {
  setIsAuthDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<IClientRegisterForm>({
    resolver: zodResolver(ClientRegisterFormSchema),
    defaultValues: ClientRegisterFormDV,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      form.setValue("profile_picture", file, { shouldValidate: true });
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
      form.setValue("profile_picture", null as unknown as File, {
        shouldValidate: true,
      }); // Type assertion trick
    }
  };

  const { initializeAuth } = useAuthContext(); // Moved outside of onSubmit

  const onSubmit = async (data: IClientRegisterForm) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone_number", data.phone_number);
    formData.append("address", data.address);
    formData.append("gender", data.gender);
    formData.append("city", data.city);
    formData.append("cnic", data.cnic);
    formData.append("profession", data.profession);
    formData.append("languages_spoken", data.languages_spoken);
    formData.append("profile_picture", data.profile_picture);
    formData.append("role", "client");

    try {
      const response = await api.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsLoading(false);
      localStorage.setItem("token", response.data.token);
      initializeAuth();
      dialogClose();
      toast.success("Registered successfully");
    } catch (error) {
      console.error("Error registering:", error);
      setIsLoading(false);
      toast.error("Error registering user: " + (error as Error).message);
    }
  };

  return (
    <div className="px-1 mt-3">
      <h2 className="text-lg font-semibold leading-none tracking-tight mb-2">
        Client Register
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 mb-4"
        >
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name<span className="text-destructive">*</span></FormLabel>
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
                <FormLabel>Email<span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password<span className="text-destructive">*</span></FormLabel>
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

          {/* Phone Number Field */}
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number<span className="text-destructive">*</span></FormLabel>
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
                <FormLabel>CNIC<span className="text-destructive">*</span></FormLabel>
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
      <FormLabel>Gender<span className="text-destructive">*</span></FormLabel>
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
                <FormLabel>Profession<span className="text-destructive">*</span></FormLabel>
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
                <FormLabel>Languages Spoken<span className="text-destructive">*</span></FormLabel>
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
                <FormLabel>City<span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Enter your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address Field */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address<span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter your address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Profile Picture Upload */}
          <FormField
            control={form.control}
            name="profile_picture"
            render={() => (
              <FormItem>
                <FormLabel>Profile Picture<span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleFileChange}
                  />
                </FormControl>
                <FormMessage />
                {previewUrl && (
                  <div className="mt-2 h-20 w-20 ">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full"
                    />
                  </div>
                )}
              </FormItem>
            )}
          />

          <div className="flex gap-2 justify-end items-center">
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsAuthDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Register
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ClientRegisterForm;
