import NoDataFound from "@/components/shared/no-data-found";
import { IBid } from "@/types";
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
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

 

const renderSheet = (bidItem: IBid) => {
  return (
    <Sheet>
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

          {/* Lawyer Detail Tab */}
          <TabsContent value="lawyer">
            <h3 className="text-lg font-medium">Lawyer Information</h3>
            <div className="grid grid-cols-4 gap-2 p-2">
              <p className="text-sm col-span-1">
                <span className="font-medium">Name:</span>
              </p>
              <p className="text-sm col-span-3">{bidItem.lawyer.name}</p>
              <p className="text-sm col-span-1">
                <span className="font-medium">Email:</span>
              </p>
              <p className="text-sm col-span-3">{bidItem.lawyer.email}</p>
              <p className="text-sm col-span-1">
                <span className="font-medium">Phone No:</span>
              </p>
              <p className="text-sm col-span-3">
                {bidItem.lawyer.phone_number}
              </p>
              <p className="text-sm col-span-1">
                <span className="font-medium">Expertise:</span>
              </p>
              <p className="text-sm col-span-3">
                {(bidItem?.lawyer?.specialization || []).join(", ")}
              </p>
              <p className="text-sm col-span-1">
                <span className="font-medium">Experience:</span>
              </p>
              <p className="text-sm col-span-3">
                {bidItem.lawyer.experience} years
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
              <p className="text-sm col-span-3">{bidItem.case.total_bids}</p>
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

const acceptBidDialog = () =>{
  return(
    <Dialog>
  <DialogTrigger className="flex items-center gap-1.5"><BookmarkCheck size={15} /> Accept</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

const ClientCaseBids = ({ bids }: { bids: IBid[] }) => {
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

  const renderDropdown = (bidItem: IBid) => {
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
            className="text-primary"
            onSelect={(e) => e.preventDefault()}
          >
            {renderSheet(bidItem)}
          </DropdownMenuItem>
          <DropdownMenuItem className=" text-green-500 gap-1.5" onSelect={(e) => e.preventDefault()}>
            {acceptBidDialog()}
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-medium">Submitted Bids for my Cases</h3>
      </div>

      {bids.length ? (
        <div className="relative overflow-x-auto border rounded-sm">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-gray-600 font-semibold bg-gray-100">
              <tr>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Bid Description
                </td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Case Title
                </td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Lawyer Name
                </td>

                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Submission Date
                </td>

                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Actions
                </td>
              </tr>
            </thead>
            <tbody>
              {bids.map((bidItem, index) => (
                <tr key={bidItem.id || index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {bidItem.description.length > 40 ? (
                      <>
                        {bidItem.description.substring(0, 40)}
                        <b> ...</b>
                      </>
                    ) : (
                      bidItem.description
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {bidItem.case.title.length > 40 ? (
                      <>
                        {bidItem.case.title.substring(0, 40)}
                        <b> ...</b>
                      </>
                    ) : (
                      bidItem.case.title
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {bidItem.lawyer.name.length > 40 ? (
                      <>
                        {bidItem.lawyer.name.substring(0, 40)}
                        <b> ...</b>
                      </>
                    ) : (
                      bidItem.lawyer.name
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(bidItem.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderDropdown(bidItem)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
