import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaseFormDV, CaseFormSchema, ICaseForm } from "../api/schema";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MultiSelect } from "@/components/ui/multi-select";
import {
  EXPERTISE_AREAS,
  CASE_CATEGORIES,
  BUDGET_TYPE,
} from "@/utils/constant";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  dialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAddCaseMutation, useUpdateCaseMutation } from "../api/api-queries";
import { useAuthContext } from "@/providers/auth-provider";
import { ICase } from "@/types";
import { Edit } from "lucide-react";

const CaseForm = ({
  action,
  selectedRow,
}: {
  action: string;
  selectedRow?: ICase;
}) => {
  const { user } = useAuthContext();
  const form = useForm<ICaseForm>({
    resolver: zodResolver(CaseFormSchema),
    defaultValues: action === "add" ? CaseFormDV : selectedRow,
  });
  const addCaseMutation = useAddCaseMutation();
  const updateCaseMutation = useUpdateCaseMutation();

  const onSubmit = (data: ICaseForm) => {
    if (action === "add") {
      addCaseMutation.mutate({ ...data, client_id: user!.id });
      return;
    }
    updateCaseMutation.mutate({
      ...data,
      client_id: user!.id,
      case_id: selectedRow!.id,
    });
  };

  return (
    <Dialog
      onOpenChange={() => {
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        {action == "add" ? (
          <Button>Post Case</Button>
        ) : (
          <span className="flex items-center w-full">
            {" "}
            <Button className="h-7 w-full" variant={"outline"}>
              <Edit size={15} className="mr-2 h-4 w-4" /> Edit
            </Button>
          </span>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {" "}
            {action === "add" ? "Post" : "Update"} Case
          </DialogTitle>
          <DialogDescription>
            Provide details about your legal case.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter case title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your case"
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Case Category Dropdown */}
            <FormField
              control={form.control}
              name="case_category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Case Category<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={"Select case category"} />
                      </SelectTrigger>
                      <SelectContent>
                        {CASE_CATEGORIES.map(
                          (
                            option: { label: string; value: string },
                            index: number
                          ) => (
                            <SelectItem key={index} value={option.value}>
                              {option.label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expertise_required"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Required Expertise{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
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

            {/* Urgency Dropdown */}
            <FormField
              control={form.control}
              name="urgency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Urgency Level<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={"Select urgency level"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="priority">Priority</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Budget Type<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={"Select budget type"} />
                      </SelectTrigger>
                      <SelectContent>
                        {BUDGET_TYPE.map(
                          (
                            option: { label: string; value: string },
                            index: number
                          ) => (
                            <SelectItem key={index} value={option.value}>
                              {option.label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Budget Amount */}
            <FormField
              control={form.control}
              name="budget_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Budget in USD<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter budget amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location Field */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Location<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter location"
                      {...field}
                    ></Textarea>
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
              <Button
                type="submit"
                disabled={
                  addCaseMutation.isLoading || updateCaseMutation.isLoading
                }
              >
                {action == "add" ? "Submit" : "Update"} Case
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CaseForm;
