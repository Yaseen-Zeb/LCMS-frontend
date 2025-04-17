import CaseForm from "@/features/case/components/case-form";
import NoDataFound from "@/components/shared/no-data-found";
import { ICase } from "@/types";
import { Button } from "@/components/ui/button";
import {
  BadgePercent,
  Briefcase,
  Edit,
  Eye,
  MapPin,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import DeleteAlert from "@/components/shared/delete-alert";
import { useState } from "react";
import { useDeleteCase } from "@/features/case/api/api-queries";
import { useAuthContext } from "@/providers/auth-provider";
import formatDate from "@/utils/formatDate";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";

const ClientCases = ({ cases }: { cases: ICase[] }) => {
  const { user, handleBidAuthModal } = useAuthContext();
  const { id } = useParams();
  const deleteCaseMutation = useDeleteCase();
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const isMyProfile = user && user.id === Number(id);

  function handleDeleteItem() {
    if (!itemToDelete) return;
    deleteCaseMutation.mutate(itemToDelete, {
      onSuccess: () => {
        setShowDeleteAlert(false);
        setItemToDelete(null);
      },
    });
  }

  // const renderDropdown = (caseItem: ICase, isMyProfile: boolean | null) => {
  //   return (
  //     <>
  //       {isMyProfile ? (
  //         <DropdownMenu modal={false}>
  //           <DropdownMenuTrigger asChild>
  //             <Button
  //               variant="ghost"
  //               className="rounded-full h-8 w-8 flex items-center justify-center"
  //             >
  //               <MoreHorizontal className="h-5 w-5 text-gray-500" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent className="w-32">
  //             <Link to={`/case/detail/${caseItem.id}`}>
  //               <DropdownMenuItem className="gap-0 text-primary">
  //                 <Eye size={15} className="mr-2" /> View
  //               </DropdownMenuItem>
  //             </Link>

  //             <DropdownMenuItem
  //               className="text-primary"
  //               onSelect={(e) => e.preventDefault()}
  //             >
  //               <CaseForm action="update" selectedRow={caseItem} />
  //             </DropdownMenuItem>
  //             <DropdownMenuItem
  //               onClick={() => {
  //                 setShowDeleteAlert(true);
  //                 setItemToDelete(caseItem.id);
  //               }}
  //               className="gap-0 text-red-500"
  //             >
  //               <Trash2 size={15} className="mr-2" /> Delete
  //             </DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       ) : (
  //         <Link to={`/case/detail/${caseItem.id}`}>
  //           <span className="gap-1.5 text-primary flex items-center whitespace-nowrap">
  //             <Eye size={15} className="" /> View Details
  //           </span>
  //         </Link>
  //       )}
  //     </>
  //   );
  // };

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-medium">
          {isMyProfile ? "My Posted Cases" : "Client Posted Cases"}
        </h3>
        {isMyProfile && <CaseForm action="add" />}
      </div>

      {cases.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cases?.map((caseItem) => (
            <div
              key={caseItem.id}
              className="p-4 bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] rounded-lg border border-gray-200 hover:border-primary group"
            >
              <Link to={`/case/detail/${caseItem.id}`} className="w-full">
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-primary group-hover:cursor-pointer min-h-[56px]">
                  {caseItem.title.length < 57
                    ? caseItem.title
                    : caseItem.title.substring(0, 57) + " ..."}
                </h2>
              </Link>

              <div className="flex items-center text-gray-600 text-sm mt-2">
                <span className="flex items-center gap-2">
                  <Briefcase size={16} />
                  Budget: {caseItem.budget_amount} PKR <b>·</b>{" "}
                  {caseItem.budget_type}
                </span>
              </div>
              <div className="flex items-center text-gray-600 text-sm mt-2">
                <span className="flex items-center gap-2">
                  <TrendingUp size={16} />
                  Submitted Bids: {caseItem.total_bids || 0}
                </span>
              </div>
              <div className="flex items-center text-gray-600 text-sm mt-2">
                <span className="flex items-start gap-2">
                  <span>
                    <MapPin size={16} className="mt-0.5" />
                  </span>
                  Location:{" "}
                  {caseItem.location.length < 60
                    ? caseItem.location
                    : caseItem.location.substring(0, 60) + " ..."}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {caseItem.expertise_required.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-gray-500 text-sm mt-3">
                Posted Date: {formatDate(caseItem.createdAt)} <b>·</b>{" "}
                {caseItem.urgency}
              </p>
              <Separator className="my-3" />
              {isMyProfile ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-end">
                  <Link to={`/case/detail/${caseItem.id}`}>
                    <Button
                      variant={"outline"}
                      className="gap-0 text-primary h-7 w-full"
                    >
                      <Eye size={15} className="mr-2" /> View
                    </Button>
                  </Link>

                  {caseItem.status === "open" ? (
                    <CaseForm action="update" selectedRow={caseItem} />
                  ) : (
                    <span className="flex items-center w-full">
                      {" "}
                      <Button
                        className="h-7 w-full"
                        variant={"outline"}
                        onClick={() =>
                          toast.error(
                            `This case is currently ${caseItem.status} and cannot be updated`
                          )
                        }
                      >
                        <Edit size={15} className="mr-2 h-4 w-4" /> Edit
                      </Button>
                    </span>
                  )}

                  <Button
                    variant={"outline"}
                    className="gap-0 text-primary h-7 w-full"
                    onClick={() => {
                      if (caseItem.status === "open") {
                        setShowDeleteAlert(true);
                        setItemToDelete(caseItem.id);
                      } else {
                        toast.error(
                          `This case is currently ${caseItem.status} and cannot be deleted`
                        );
                      }
                    }}
                  >
                    <Trash2 size={15} className="mr-2" /> Delete
                  </Button>
                </div>
              ) : (
                <div
                  className={`grid  justify-between text-sm gap-3 ${
                    user && user?.role !== "lawyer"
                      ? "grid-cols-1"
                      : "grid-cols-2"
                  }`}
                >
                  {(!user || user?.role == "lawyer") && (
                    <Button
                      className="flex gap-1 h-6 w-full"
                      variant={"outline"}
                      onClick={() => {
                        if (caseItem.status === "open") {
                          handleBidAuthModal(caseItem.id);
                        } else {
                          toast.success(
                            `This case is currently ${caseItem.status} and bid cannot be submitted now.`
                          );
                        }
                      }}
                    >
                      <BadgePercent />
                      Bid
                    </Button>
                  )}
                  <Link to={`/case/detail/${caseItem.id}`} className="w-full">
                    <Button
                      className="flex gap-1 h-6 w-full"
                      variant={"outline"}
                    >
                      <Eye />
                      {user && user?.role !== "lawyer"
                        ? "View Case Details"
                        : "View"}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        // <div className="relative overflow-x-auto border rounded-sm">
        //   <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        //     <thead className="text-gray-600 font-semibold bg-gray-100">
        //       <tr>
        //         <td scope="col" className="px-6 py-3 whitespace-nowrap">
        //           Title
        //         </td>
        //         <td scope="col" className="px-6 py-3 whitespace-nowrap">
        //           Budget
        //         </td>
        //         <td scope="col" className="px-6 py-3 whitespace-nowrap">
        //           Budget Type
        //         </td>
        //         <td scope="col" className="px-6 py-3 whitespace-nowrap">
        //           Submitted bids
        //         </td>
        //         <td scope="col" className="px-6 py-3 whitespace-nowrap">
        //           Status
        //         </td>

        //         <td scope="col" className="px-6 py-3 whitespace-nowrap">
        //           Posted Date
        //         </td>

        //         <td scope="col" className="px-6 py-3 whitespace-nowrap">
        //           Actions
        //         </td>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       {cases.map((caseItem, index) => (
        //         <tr key={caseItem.id || index}>
        //           <td className="px-6 py-4 whitespace-nowrap">
        //             {" "}
        //             {caseItem.title.length > 22 ? (
        //               <>
        //                 {caseItem.title.substring(0, 22)}
        //                 <b> ...</b>
        //               </>
        //             ) : (
        //               caseItem.title
        //             )}
        //           </td>

        //           <td className="px-6 py-4 whitespace-nowrap">
        //             {caseItem.budget_amount
        //               ? `$${caseItem.budget_amount}`
        //               : "N/A"}
        //           </td>
        //           <td className="px-6 py-4 whitespace-nowrap">
        //             {caseItem.budget_type || "N/A"}
        //           </td>
        //           <td className="px-6 py-4 whitespace-nowrap">
        //             {caseItem.total_bids ?? 0}
        //           </td>
        //           <td className="px-6 py-4 whitespace-nowrap">
        //             <Status status={caseItem.status} />
        //           </td>
        //           <td className="px-6 py-4 whitespace-nowrap">
        //             {formatDate(caseItem.createdAt)}
        //           </td>
        //           <td className="px-6 py-4 whitespace-nowrap">
        //             {renderDropdown(caseItem, isMyProfile)}
        //           </td>
        //         </tr>
        //       ))}
        //     </tbody>
        //   </table>
        // </div>
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

export default ClientCases;
