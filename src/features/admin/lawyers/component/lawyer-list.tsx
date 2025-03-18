import { useState } from "react";
import { useGetLawyers } from "../api/api-queries";
import Loader from "@/components/ui/loader";
import ApiResponseError from "@/components/shared/api-response-error";
import formatDate from "@/utils/formatDate";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { env } from "@/config/env";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Status from "@/components/shared/status";
import LawyerActions from "./lawyer-actions";
import { XCircle } from "lucide-react";

const LawyerList = () => {
  const { data: lawyers, isLoading, isError, error } = useGetLawyers();
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ApiResponseError msg={(error as Error).message} />;
  }

  // Convert user input ("Active" → true, "Inactive" → false)
  const searchQueryLower = searchQuery.toLowerCase();
  const statusValue =
    searchQueryLower === "active"
      ? true
      : searchQueryLower === "inactive"
      ? false
      : null;

  // Filtered Lawyers List
  const filteredLawyers = lawyers?.data.filter((lawyer) => {
    const matchesSearch =
      `${lawyer.name} ${lawyer.email} ${lawyer.phone_number}`
        .toLowerCase()
        .includes(searchQueryLower);

    const matchesStatus =
      statusValue !== null ? lawyer.status === statusValue : true;

    return matchesSearch || matchesStatus;
  });

  return (
    <>
      <h3 className="text-xl font-semibold">Total Lawyers</h3>

      {/* Search Input */}
      <div className="flex gap-4 my-3">
        <div className="flex w-full max-w-sm">
          <Input
            type="text"
            placeholder="Search by name, email, phone, or status"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border-gray-300 h-10 rounded-br-none rounded-tr-none focus:outline-none"
          />
        </div>

        {/* Clear Filters Button */}
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
              <td scope="col" className="px-6 py-3 whitespace-nowrap">
                Profile
              </td>
              <td scope="col" className="px-6 py-3 whitespace-nowrap">
                Name
              </td>
              <td scope="col" className="px-6 py-3 whitespace-nowrap">
                Email
              </td>
              <td scope="col" className="px-6 py-3 whitespace-nowrap">
                Ph. Number
              </td>
              <td scope="col" className="px-6 py-3 whitespace-nowrap">
                Join At
              </td>
              <td scope="col" className="px-6 py-3 whitespace-nowrap">
                Status
              </td>
              <td scope="col" className="px-6 py-3 whitespace-nowrap">
                Actions
              </td>
            </tr>
          </thead>
          <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            {filteredLawyers.length ? (
              filteredLawyers.map((lawyer, index) => (
                <tr key={lawyer.id || index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Avatar>
                      <AvatarImage
                        src={`${env.VITE_APP_BASE_URL}/${lawyer.profile_picture}`}
                        alt="Profile"
                      />
                      <AvatarFallback>N/A</AvatarFallback>
                    </Avatar>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{lawyer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lawyer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lawyer.phone_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(lawyer.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Status status={lawyer.status ? "Active" : "Inactive"} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <LawyerActions lawyer={lawyer} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No lawyers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LawyerList;
