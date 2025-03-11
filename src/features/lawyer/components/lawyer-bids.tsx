import NoDataFound from "@/components/shared/no-data-found";
import Loader from "@/components/ui/loader";
import ApiResponseError from "@/components/shared/api-response-error";
import { useGetMyBids } from "../api/api-queries";
import formatDate from "@/utils/formatDate";
import Status from "@/components/shared/status";
import { Link } from "react-router-dom";

const MyBids = () => {
  const {
    data: getMyBids,
    isLoading: isgetMyBidsLoading,
    isError: isgetMyBidsError,
  } = useGetMyBids();

  if (isgetMyBidsLoading) {
    return <Loader />;
  }

  if (isgetMyBidsError) {
    return <ApiResponseError />;
  }
  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold">My Submitted Bids</h3>
      </div>

      {getMyBids.data.length ? (
        <div className="relative overflow-x-auto border rounded-sm">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-gray-600 font-semibold bg-gray-100">
              <tr>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Bid Description
                </td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Case title
                </td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Status
                </td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Submittd On
                </td>
              </tr>
            </thead>
            <tbody>
              {getMyBids.data.map((bid, index) => (
                <tr key={bid.description || index}>
                  <td className="px-6 py-4">{bid.description}</td>

                  <td className="px-6 py-4">
                    <Link
                      className="underline text-blue-500"
                      to={`/case/detail/${bid.case.id}`}
                    >
                      {bid.case.title}
                    </Link>
                  </td>

                  <td className="px-6 py-4">
                    <Status status={bid.bid_status} />
                  </td>
                  <td className="px-6 py-4">{formatDate(bid.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoDataFound />
      )}
    </>
  );
};

export default MyBids;
