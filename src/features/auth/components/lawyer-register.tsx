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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    formData.append("bio", data.bio || "");
    formData.append("experience", String(data.experience));
    formData.append("specialization", JSON.stringify(data.specialization));
    formData.append("profile_picture", data.profile_picture);
    formData.append("certificate", data.certificate);
    formData.append("role", "lawyer");
    formData.append("cnic", data.cnic);
    formData.append("gender", data.gender);
    formData.append("languages_spoken", data.languages_spoken);
    formData.append("website_or_social", data.website_or_social ?? "");

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

          <FormField
            control={form.control}
            name="specialization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Specialization<span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <MultiSelect
                    options={EXPERTISE_AREAS}
                    onValueChange={field.onChange}
                    defaultValue={field.value || []}
                    placeholder={"Select your specialization"}
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
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Experience<span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter your experience"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cnic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  CNIC<span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 3520112345671" {...field} />
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

          <FormField
            control={form.control}
            name="languages_spoken"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Languages Spoken<span className="text-destructive">*</span>
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
            name="website_or_social"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website / LinkedIn / Portfolio</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://linkedin.com/in/your-profile"
                    {...field}
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
                <FormLabel>
                  Profile Picture<span className="text-destructive">*</span>
                </FormLabel>
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
                <FormLabel>
                  Certificate<span className="text-destructive">*</span>
                </FormLabel>
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
                <FormLabel>
                  Addess<span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter address" {...field}></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter bio" {...field}></Textarea>
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
