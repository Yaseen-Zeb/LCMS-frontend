import { useState } from "react";
import Loader from "@/components/ui/loader";
import ApiResponseError from "@/components/shared/api-response-error";
import { Input } from "@/components/ui/input";
import { useDeleteFeedback, useGetFeedbacks } from "../api/api-queries";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

const FeedbackList = () => {
  const { data: feedbacks, isLoading, isError, error } = useGetFeedbacks();
  const deleteFeedbackMutation = useDeleteFeedback(); // ✅ Move hook outside render conditions

  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ApiResponseError msg={(error as Error).message} />;
  }

  // Convert user input to lowercase for case-insensitive search
  const searchQueryLower = searchQuery.toLowerCase();

  // Filter feedbacks list
  const filteredFeedbacks = feedbacks?.data.filter((feedback) =>
    `${feedback.name} ${feedback.email} ${feedback.message}`
      .toLowerCase()
      .includes(searchQueryLower)
  );

  return (
    <>
      <h3 className="text-xl font-semibold">Total Feedbacks</h3>

      {/* Search Input */}
      <div className="flex gap-4 my-3">
        <div className="flex w-full max-w-sm">
          <Input
            type="text"
            placeholder="Search Feedbacks and Queries"
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
              <td scope="col" className="px-6 py-3 whitespace-nowrap">Name</td>
              <td scope="col" className="px-6 py-3 whitespace-nowrap">Email</td>
              <td scope="col" className="px-6 py-3 whitespace-nowrap">Message</td>
              <td scope="col" className="px-6 py-3 whitespace-nowrap">Action</td>
            </tr>
          </thead>
          <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            {filteredFeedbacks.length ? (
              filteredFeedbacks.map((feedback, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">{feedback.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{feedback.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {feedback.message.length > 50
                      ? feedback.message.substring(0, 50) + " ..."
                      : feedback.message}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      disabled={deleteFeedbackMutation.isLoading}
                      onClick={() => deleteFeedbackMutation.mutate({ id: feedback.id })}
                      className="h-5 text-xs bg-red-500"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No feedbacks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FeedbackList;
