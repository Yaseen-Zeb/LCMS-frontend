import CaseForm from "@/features/case/components/case-form";
import NoDataFound from "@/components/shared/no-data-found";
import { ICase } from "@/types";
import Status from "@/components/shared/status";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import DeleteAlert from "@/components/shared/delete-alert";
import { useState } from "react";
import { useDeleteCase } from "@/features/case/api/api-queries";
import { useAuthContext } from "@/providers/auth-provider";
import formatDate from "@/utils/formatDate";

const ClientCases = ({ cases }: { cases: ICase[] }) => {
  const { user } = useAuthContext();
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

  const renderDropdown = (caseItem: ICase, isMyProfile: boolean | null) => {
    return (
      <>
        {isMyProfile ? (
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
              <Link to={`/case/detail/${caseItem.id}`}>
                <DropdownMenuItem className="gap-0 text-primary">
                  <Eye size={15} className="mr-2" /> View
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem
                className="text-primary"
                onSelect={(e) => e.preventDefault()}
              >
                <CaseForm action="update" selectedRow={caseItem} />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setShowDeleteAlert(true);
                  setItemToDelete(caseItem.id);
                }}
                className="gap-0 text-red-500"
              >
                <Trash2 size={15} className="mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to={`/case/detail/${caseItem.id}`}>
            <span className="gap-1.5 text-primary flex items-center whitespace-nowrap">
              <Eye size={15} className="" /> View Details
            </span>
          </Link>
        )}
      </>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-medium">
          {isMyProfile ? "My Posted Cases" : "Client Posted Cases"}
        </h3>
        {isMyProfile && <CaseForm action="add" />}
      </div>

      {cases.length ? (
        <div className="relative overflow-x-auto border rounded-sm">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-gray-600 font-semibold bg-gray-100">
              <tr>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Title
                </td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Budget
                </td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Budget Type
                </td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Submitted bids
                </td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Status
                </td>

                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Posted Date
                </td>

                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Actions
                </td>
              </tr>
            </thead>
            <tbody>
              {cases.map((caseItem, index) => (
                <tr key={caseItem.id || index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {" "}
                    {caseItem.title.length > 22 ? (
                      <>
                        {caseItem.title.substring(0, 22)}
                        <b> ...</b>
                      </>
                    ) : (
                      caseItem.title
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {caseItem.budget_amount
                      ? `$${caseItem.budget_amount}`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {caseItem.budget_type || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {caseItem.total_bids ?? 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Status status={caseItem.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(caseItem.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderDropdown(caseItem, isMyProfile)}
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

export default ClientCases;
