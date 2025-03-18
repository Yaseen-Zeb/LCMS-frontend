import { useState } from "react";
import Loader from "@/components/ui/loader";
import ApiResponseError from "@/components/shared/api-response-error";
import formatDate from "@/utils/formatDate";
import { Input } from "@/components/ui/input";
import Status from "@/components/shared/status";
import { useGetCases } from "../api/api-queries";
import ViewCase from "./view-case";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

const CaseList = () => {
  const { data: cases, isLoading, isError, error } = useGetCases();
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ApiResponseError msg={(error as Error).message} />;
  }

  // Convert user input to lowercase for case-insensitive search
  const searchQueryLower = searchQuery.toLowerCase();

  // Filtered Cases List
  const filteredCases = cases?.data.filter((caseItem) => {
    return (
      `${caseItem.title} ${caseItem.case_category} ${caseItem.urgency} ${caseItem.status}`
        .toLowerCase()
        .includes(searchQueryLower)
    );
  });

  return (
    <>
      <h3 className="text-xl font-semibold">Total Cases</h3>

      {/* Search Input */}
      <div className="flex gap-4 my-3">
        <div className="flex w-full max-w-sm">
          <Input
            type="text"
            placeholder="Search by title, category, urgency, or status"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border-gray-300 h-10 rounded-br-none rounded-tr-none focus:outline-none"
          />
        </div>

        {/* Clear Search Button */}
        {searchQuery && (
          <Button
            variant="outline"
            className="text-red-600 border-gray-300 flex items-center gap-1"
            onClick={() => setSearchQuery("")}
          >
            <XCircle size={16} /> Clear Search
          </Button>
        )}
      </div>

      <div className="relative overflow-x-auto border rounded-sm">
        <table className="w-full text-sm text-left rtl:text-right shadow-sm text-gray-500">
          <thead className="text-gray-600 font-semibold bg-gray-200">
            <tr>
              <td scope="col" className="px-6 py-3 whitespace-nowrap">Title</td>
              <td scope="col" className="px-6 py-3 whitespace-nowrap">Case Category</td>
              <td scope="col" className="px-6 py-3 whitespace-nowrap">Urgency</td>
              <td scope="col" className="px-6 py-3 whitespace-nowrap">Posted Date</td>
              <td scope="col" className="px-6 py-3 whitespace-nowrap">Status</td>
              <td scope="col" className="px-6 py-3 whitespace-nowrap">Action</td>
            </tr>
          </thead>
          <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            {filteredCases.length ? (
              filteredCases.map((caseItem, index) => (
                <tr key={caseItem.id || index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {caseItem.title.length < 30
                      ? caseItem.title
                      : caseItem.title.substring(0, 30) + " ..."}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{caseItem.case_category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Status status={caseItem.urgency} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatDate(caseItem.createdAt)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Status status={caseItem.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ViewCase caseItem={caseItem} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No cases found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CaseList;
