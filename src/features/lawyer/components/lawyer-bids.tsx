import NoDataFound from "@/components/shared/no-data-found";
import { IBid } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal } from "lucide-react";
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
import { Link } from "react-router-dom";
import Status from "@/components/shared/status";

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
        <div className="py-2">
          <div className="grid grid-cols-4 gap-2">
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

        <h3 className="text-lg font-medium col-span-4">Case Information</h3>
        <div className="grid grid-cols-4 gap-2">
          <p className="text-sm col-span-1">
            <span className="font-medium">Title:</span>
          </p>
          <p className="text-sm col-span-3">{bidItem.case.title}</p>
          <p className="text-sm col-span-1">
            <span className="font-medium">Required:</span>
          </p>
          <p className="text-sm col-span-3 space-x-1 space-y-1 flex flex-wrap justify-start">
            {bidItem.case.expertise_required.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full"
              >
                {tag}
              </span>
            ))}
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
          <p className="text-sm col-span-3">{bidItem.case.total_bids ?? 0}</p>
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
        {/* <h3 className="text-lg font-medium col-span-4">About Client</h3> */}
        <Link to={`/client/profile/${bidItem.case.client_id}`}>
          <Button variant={"outline"} className="w-full mt-3">
            View Client Profile
          </Button>
        </Link>
      </SheetContent>
    </Sheet>
  );
};

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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LawyerBids = ({ bids }: { bids: IBid[] }) => {
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

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-medium">My Submitted Bids for Cases</h3>
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
                  Client Status
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
                    {bidItem.description.length > 25 ? (
                      <>
                        {bidItem.description.substring(0, 25)}
                        <b> ...</b>
                      </>
                    ) : (
                      bidItem.description
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {bidItem.case.title.length > 25 ? (
                      <>
                        {bidItem.case.title.substring(0, 25)}
                        <b> ...</b>
                      </>
                    ) : (
                      bidItem.case.title
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Status status={bidItem.bid_status} />
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

export default LawyerBids;
