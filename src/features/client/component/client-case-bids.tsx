import NoDataFound from "@/components/shared/no-data-found";
import { IBid, ICase } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BookmarkCheck, Eye, MoreHorizontal } from "lucide-react";
import DeleteAlert from "@/components/shared/delete-alert";
import { useState } from "react";
import { useDeleteCase } from "@/features/case/api/api-queries";
import formatDate from "@/utils/formatDate";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  dialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Status from "@/components/shared/status";
import { useAcceptBid, useUpdateBidStatus } from "../api/api-queries";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AcceptBidFormDV,
  AcceptBidSchema,
  IAcceptBidForm,
} from "../api/schema";
import { useAuthContext } from "@/providers/auth-provider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const getValue = (val?: string | number | null) => (val ? val : "N/A");

const BidSheet = ({ bidItem }: { bidItem: IBid }) => {
  const updateBidMutation = useUpdateBidStatus();

  const handleOpenChange = (open: boolean) => {
    if (open && bidItem.bid_status === "not_seen") {
      updateBidMutation.mutate(bidItem.id);
    }
  };

  return (
    <Sheet onOpenChange={handleOpenChange}>
      <SheetTrigger className="flex items-center gap-1.5 w-full">
        <Eye size={15} /> View
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl font-medium">
            Bid Information
          </SheetTitle>
        </SheetHeader>

        {/* Bid Basic Details */}
        <div className="p-2">
          <div className="grid grid-cols-4 gap-2 p-2">
            <p className="text-sm col-span-1">
              <span className="font-medium">Description:</span>
            </p>
            <p className="text-sm col-span-3">{bidItem.description}</p>
            <p className="text-sm col-span-1">
              <span className="font-medium">Date:</span>
            </p>
            <p className="text-sm col-span-3">
              {formatDate(bidItem.createdAt)}
            </p>
            <p className="text-sm col-span-1">
              <span className="font-medium">Status:</span>
            </p>
            <p className="text-sm col-span-3">
              <Status status={bidItem.bid_status} />
            </p>
          </div>
        </div>

        {/* Tabs for Lawyer and Case Details */}
        <Tabs defaultValue="lawyer" className="mt-4">
          <TabsList className="w-full px-1">
            <TabsTrigger value="lawyer" className="w-1/2">
              Lawyer Detail
            </TabsTrigger>
            <TabsTrigger value="case" className="w-1/2">
              Case Detail
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lawyer">
            <h3 className="text-lg font-medium">Lawyer Information</h3>
            <div className="grid grid-cols-4 gap-2 p-2">
              <p className="text-sm col-span-1 font-medium">Name:</p>
              <p className="text-sm col-span-3">
                {getValue(bidItem.lawyer.name)}
              </p>

              <p className="text-sm col-span-1 font-medium">Email:</p>
              <p className="text-sm col-span-3">
                {getValue(bidItem.lawyer.email)}
              </p>

              <p className="text-sm col-span-1 font-medium">Phone No:</p>
              <p className="text-sm col-span-3">
                {getValue(bidItem.lawyer.phone_number)}
              </p>

              <p className="text-sm col-span-1 font-medium">CNIC:</p>
              <p className="text-sm col-span-3">
                {getValue(bidItem.lawyer.cnic)}
              </p>

              <p className="text-sm col-span-1 font-medium">Gender:</p>
              <p className="text-sm col-span-3">
                {getValue(bidItem.lawyer.gender)}
              </p>

              <p className="text-sm col-span-1 font-medium">Languages:</p>
              <p className="text-sm col-span-3">
                {getValue(bidItem.lawyer.languages_spoken)}
              </p>

              <p className="text-sm col-span-1 font-medium">Links:</p>
              <p className="text-sm col-span-3">
                {bidItem.lawyer.website_or_social ? (
                  <a
                    href={bidItem.lawyer.website_or_social}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {bidItem.lawyer.website_or_social}
                  </a>
                ) : (
                  "N/A"
                )}
              </p>

              <p className="text-sm col-span-1 font-medium">Bio:</p>
              <p className="text-sm col-span-3 whitespace-pre-line">
                {getValue(bidItem.lawyer.bio)}
              </p>

              <p className="text-sm col-span-1 font-medium">Expertise:</p>
              <p className="text-sm col-span-3">
                {(bidItem?.lawyer.specialization || []).length > 0
                  ? bidItem.lawyer.specialization?.join(", ")
                  : "N/A"}
              </p>

              <p className="text-sm col-span-1 font-medium">Experience:</p>
              <p className="text-sm col-span-3">
                {bidItem.lawyer.experience
                  ? `${bidItem.lawyer.experience} years`
                  : "N/A"}
              </p>

              <p className="text-sm col-span-1 font-medium">Address:</p>
              <p className="text-sm col-span-3">
                {getValue(bidItem.lawyer.address)}
              </p>
            </div>
          </TabsContent>

          {/* Case Detail Tab */}
          <TabsContent value="case">
            <h3 className="text-lg font-medium col-span-4">Case Information</h3>
            <div className="grid grid-cols-4 gap-2 p-2">
              <p className="text-sm col-span-1">
                <span className="font-medium">Title:</span>
              </p>
              <p className="text-sm col-span-3">{bidItem.case.title}</p>
              <p className="text-sm col-span-1">
                <span className="font-medium">Required:</span>
              </p>
              <p className="text-sm col-span-3">
                {bidItem.case.expertise_required.join(", ")}
              </p>
              <p className="text-sm col-span-1">
                <span className="font-medium">Category:</span>
              </p>
              <p className="text-sm col-span-3">{bidItem.case.case_category}</p>
              <p className="text-sm col-span-1">
                <span className="font-medium">Urgency:</span>
              </p>
              <p className="text-sm col-span-3">{bidItem.case.urgency}</p>
              <p className="text-sm col-span-1">
                <span className="font-medium">Budget:</span>
              </p>
              <p className="text-sm col-span-3">
                {bidItem.case.budget_amount} ({bidItem.case.budget_type})
              </p>
              <p className="text-sm col-span-1">
                <span className="font-medium">Total Bids:</span>
              </p>
              <p className="text-sm col-span-3">
                {bidItem.case.total_bids ?? 0}
              </p>
              <p className="text-sm col-span-1">
                <span className="font-medium">Status:</span>
              </p>
              <p className="text-sm col-span-3">{bidItem.case.status}</p>
              <p className="text-sm col-span-1">
                <span className="font-medium">Description:</span>
              </p>
              <p className="text-sm col-span-3">{bidItem.case.description}</p>
              <p className="text-sm col-span-1">
                <span className="font-medium">Location:</span>
              </p>
              <p className="text-sm col-span-3">{bidItem.case.location}</p>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

const acceptBidDialog = (
  lawyer_id: number,
  lawyer_name: string,
  case_id: number,
  bid_id: number
) => {
  const { user } = useAuthContext();
  const form = useForm<IAcceptBidForm>({
    resolver: zodResolver(AcceptBidSchema),
    defaultValues: AcceptBidFormDV,
  });
  const acceptBidMutation = useAcceptBid();

  const onSubmit = (data: IAcceptBidForm) => {
    acceptBidMutation.mutate({
      ...data,
      caseId: case_id,
      receiverId: lawyer_id,
      senderId: user!.id,
      bidId: bid_id,
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-1.5 w-full">
        <BookmarkCheck size={15} /> Accept
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Bid Acceptance</DialogTitle>
          <DialogDescription>
            By accepting this bid, you will initiate a direct chat with **
            {lawyer_name}** to discuss your case progress. Please note that:
            <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-600">
              <li>All other bids for this case will be deactivated.</li>
              <li>You will engage in direct communication with this lawyer.</li>
              <li>
                Ensure you are comfortable proceeding with this lawyer before
                accepting.
              </li>
            </ul>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Write your first message to the lawyer to initiate the
                    discussion:<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`Hello ${lawyer_name}, I would like to discuss my case...`}
                      {...field}
                      onKeyDown={(event) => event.stopPropagation()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => dialogClose()}>
                Cancel
              </Button>
              <Button
                disabled={acceptBidMutation.isLoading}
                type="submit"
                variant="default"
              >
                Accept and Start Chat
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const ClientCaseBids = ({ cases }: { cases: (ICase & { bids: IBid[] })[] }) => {
  const deleteCaseMutation = useDeleteCase();
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  function handleDeleteItem() {
    if (!itemToDelete) return;
    deleteCaseMutation.mutate(itemToDelete, {
      onSuccess: () => {
        setShowDeleteAlert(false);
        setItemToDelete(null);
      },
    });
  }

  const renderDropdown = (bidItem: IBid, isCaseOpen: boolean) => {
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="rounded-full h-8 w-8 flex items-center justify-center"
          >
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32">
          <DropdownMenuItem
            className="text-primary w-full"
            onSelect={(e) => e.preventDefault()}
          >
            <BidSheet bidItem={bidItem} />
          </DropdownMenuItem>
          {isCaseOpen && (
            <DropdownMenuItem
              className=" text-green-500 gap-1.5"
              onSelect={(e) => e.preventDefault()}
            >
              {acceptBidDialog(
                bidItem.lawyer.id,
                bidItem.lawyer.name,
                bidItem.case_id,
                bidItem.id
              )}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-medium">Submitted Bids for my Cases</h3>
      </div>

      {cases.length ? (
        <Accordion type="multiple" className="w-full space-y-2">
          {cases.map((caseItem) => (
            <AccordionItem
              key={caseItem.id}
              value={caseItem.id.toString()}
              className="border rounded-md"
            >
              <AccordionTrigger className="p-2.5 rounded-md bg-gray-50 text-primary items-start">
                {caseItem.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-gray-600 font-semibold bg-gray-100">
                      <tr>
                        <td className="px-6 py-3 whitespace-nowrap">
                          Description
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap">Lawyer</td>
                        <td className="px-6 py-3 whitespace-nowrap">Status</td>
                        <td className="px-6 py-3 whitespace-nowrap">
                          Submitted
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap">Actions</td>
                      </tr>
                    </thead>
                    <tbody>
                      {caseItem.bids.map((bidItem) => (
                        <tr key={bidItem.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {bidItem.description.length > 20
                              ? `${bidItem.description.substring(0, 20)}...`
                              : bidItem.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {bidItem.lawyer.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Status status={bidItem.bid_status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {formatDate(bidItem.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {renderDropdown(
                              bidItem,
                              !!(caseItem.status === "open")
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <NoDataFound />
      )}

      {showDeleteAlert && (
        <DeleteAlert
          title={"case"}
          deleleItem={handleDeleteItem}
          isPending={deleteCaseMutation.isLoading}
          open={showDeleteAlert}
          onClose={() => setShowDeleteAlert(false)}
        />
      )}
    </>
  );
};

export default ClientCaseBids;
