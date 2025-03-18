import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useUpdateProfileImage } from "@/api/api-queries";
import {
  IUpdateProfileImageForm,
  UpdateProfileImageSchema,
} from "@/api/schema";
import { Pencil, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { env } from "@/config/env";
import { useState } from "react";

const UpdateProfilePicture = ({ old_image }: { old_image?: string }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<IUpdateProfileImageForm>({
    // mode:"onChange",
    resolver: zodResolver(UpdateProfileImageSchema),
    defaultValues: { profile_picture: undefined },
  });

  const updateProfileImage = useUpdateProfileImage();

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("profile_picture", selectedFile);
    updateProfileImage.mutate(formData);
  };

  return (
    <Dialog
      onOpenChange={() => {
        form.reset();
        setSelectedFile(null);
      }}
    >
      <DialogTrigger asChild>
        <button className="absolute bottom-1 right-1 bg-white p-1 rounded-full cursor-pointer shadow-md">
          <Pencil size={16} className="text-gray-600" />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
        </DialogHeader>

        {/* Profile Picture Preview */}
        <div className="flex justify-center">
          {selectedFile ? (
            <img
              className="w-20 h-20 rounded-full"
              src={URL.createObjectURL(selectedFile)}
              alt="Selected Preview"
            />
          ) : old_image ? (
            <img
              className="w-20 h-20 rounded-full"
              src={`${env.VITE_APP_BASE_URL}/${old_image}`}
              alt="Profile"
            />
          ) : (
            <UserCircle size={80} />
          )}
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpload)}
            className="flex flex-col items-end gap-4 w-full"
          >
            <FormField
              control={form.control}
              name="profile_picture"
              render={() => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0] || null;
                        setSelectedFile(file);
                        form.setValue("profile_picture", file as File, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </FormControl>
                  {form.formState.errors.profile_picture && <FormMessage />}
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end">
              <Button type="submit" disabled={updateProfileImage.isLoading}>Update</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfilePicture;
