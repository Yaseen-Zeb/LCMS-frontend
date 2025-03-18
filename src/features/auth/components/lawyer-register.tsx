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
import {
  ILawyerRegisterForm,
  LawyerRegisterFormDV,
  LawyerRegisterFormSchema,
} from "../api/schema";
import { Dispatch, SetStateAction, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { EXPERTISE_AREAS } from "@/utils/constant";
import { MultiSelect } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "@/providers/auth-provider";
import { api } from "@/lib/api-client";
import { dialogClose } from "@/components/ui/dialog";
import toast from "react-hot-toast";

const LawyerRegisterForm = ({
  setIsAuthDialogOpen,
}: {
  setIsAuthDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);

  const form = useForm<ILawyerRegisterForm>({
    resolver: zodResolver(LawyerRegisterFormSchema),
    defaultValues: LawyerRegisterFormDV,
  });

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: "profile_picture" | "certificate"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue(field, file, { shouldValidate: true });
      if (field === "profile_picture")
        setProfilePreview(URL.createObjectURL(file));
      if (field === "certificate") setCertificateFile(file);
    } else {
      setProfilePreview(null);
      setCertificateFile(null);
      form.setValue(field, null as unknown as File, { shouldValidate: true });
    }
  };

  const { initializeAuth } = useAuthContext();

  const onSubmit = async (data: ILawyerRegisterForm) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone_number", data.phone_number);
    formData.append("address", data.address);
    formData.append("profile_picture", data.profile_picture);
    formData.append("certificate", data.certificate);
    formData.append("role", "lawyer");

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
        Lawyer Register
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 pb-4 max-w-md mx-auto"
        >
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
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
                    defaultValue={field.value || []}
                    placeholder={"Select required expertise"}
                    maxCount={2}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="profile_picture"
            render={() => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) => handleFileChange(e, "profile_picture")}
                  />
                </FormControl>
                <FormMessage />
                {profilePreview && (
                  <div className="mt-2 h-20 w-20 ">
                    <img
                      src={profilePreview}
                      alt="Preview"
                      className="w-full h-full"
                    />
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="certificate"
            render={() => (
              <FormItem>
                <FormLabel>Certificate</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleFileChange(e, "certificate")}
                  />
                </FormControl>
                {certificateFile && (
                  <p className="mt-2 text-sm text-gray-500">
                    Selected file: {certificateFile.name}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Addess</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter address" {...field}></Textarea>
                </FormControl>
                <FormMessage />
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

export default LawyerRegisterForm;
