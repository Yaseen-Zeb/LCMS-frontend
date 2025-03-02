import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUpNarrowWide,
  BadgePercent,
  Blocks,
  DollarSign,
  Eye,
  MapPin,
  UserCircle,
} from "lucide-react";
import { useGetCaseDetail, useGetCases } from "../api/api-queries";
import { Link, useParams } from "react-router-dom";
import Loader from "@/components/ui/loader";
import NoDataFound from "@/components/shared/no-data-found";
import Status from "@/components/shared/status";
import { useEffect } from "react";
import ApiResponseError from "@/components/shared/api-response-error";
import { useAuthContext } from "@/providers/auth-provider";

const CaseDetail = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const {
    data: cases,
    isLoading: isCasesLoading,
    isError: isCasesError,
  } = useGetCases();
  const { handleBidAuthModal } = useAuthContext();
  const {
    data: caseDetail,
    isLoading: isCaseDetailLoading,
    isFetching: isCaseDetailFetching,
    refetch: refetchCaseDetail,
    isError: isCaseDetailError,
  } = useGetCaseDetail(Number(id || 0));

  useEffect(() => {
    if (id) {
      refetchCaseDetail();
    }
  }, [id, refetchCaseDetail]);

  return (
    <div className="grid grid-cols-8">
      <div className="col-span-5">
        <h2 className="text-xl font-medium mb-3 px-1">Case Details</h2>
        {isCaseDetailLoading || isCaseDetailFetching ? (
          <Loader />
        ) : caseDetail?.data ? (
          <Card className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-5 w-full rounded-lg font-sans overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-primary mb-2">
                <span>{caseDetail?.data.title}</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Description */}
              <p className="text-sm text-gray-600">
                {caseDetail?.data.description}
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-1 gap-3">
                {/* Budget */}
                <div className="flex items-start gap-2 text-sm">
                  <span className="flex items-center gap-1 text-gray-500">
                    <DollarSign size={16} />
                    Budget:
                  </span>
                  <span>
                    {caseDetail?.data.budget_amount}{" "}
                    <span> {caseDetail?.data.budget_type}</span>
                  </span>
                </div>

                {/* Category */}
                <div className="flex items-start gap-2 text-sm">
                  <span className="flex items-center gap-1 text-gray-500">
                    <Blocks size={16} />
                    Category:
                  </span>
                  <span>{caseDetail?.data.case_category}</span>
                </div>

                {/* Location */}
                <div className="flex items-start gap-2 text-sm">
                  <span className="flex items-center gap-1 text-gray-500">
                    <MapPin size={16} />
                    Location:
                  </span>
                  <span>{caseDetail?.data.location}</span>
                </div>

                {/* Expertise */}
                <div className="flex items-start gap-2 text-sm col-span-1">
                  <span className="text-gray-500">Required Expertise:</span>
                  <span>{caseDetail?.data.expertise_required.join(", ")}</span>
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <span className="flex items-center gap-1 text-gray-500">
                    <ArrowUpNarrowWide size={16} />
                    Urgency:
                  </span>

                  <Status status={caseDetail!.data.urgency} />
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="flex items-center gap-1 text-gray-500">
                    <ArrowUpNarrowWide size={16} />
                    Case Status:
                  </span>
                  <Status status={caseDetail!.data.status} />
                </div>
              </div>

              {/* Footer Section */}
              <div className="grid grid-cols-2">
                <Link
                  to={`/client/profile/${caseDetail?.data?.client?.id}`}
                  className="text-lg font-medium flex items-center gap-1 text-gray-500"
                >
                  <span className="flex items-center gap-1">
                    <UserCircle size={20} />
                    Posted By:
                  </span>
                  <span className="text-primary">
                    {caseDetail?.data?.client?.name}
                  </span>
                </Link>
                <span className="flex justify-end">
                  {user?.role != "client" && (
                    <Button
                      className="flex items-center gap-2 h-8 text-sm"
                      onClick={() => handleBidAuthModal(caseDetail.data.id)}
                    >
                      <BadgePercent />
                      Bid for Case
                    </Button>
                  )}
                </span>
              </div>
            </CardContent>
          </Card>
        ) : isCaseDetailError ? (
          <ApiResponseError />
        ) : (
          <NoDataFound />
        )}
      </div>
      <div className="col-span-3 pl-10">
        <h2 className="text-xl font-medium mb-3 px-1">Most Popular Cases</h2>
        {isCasesLoading ? (
          <Loader />
        ) : cases?.data.length ? (
          <div className="space-y-2">
            {cases.data.slice(0, 4).map((caseItem) => (
              <Card className="bg-white col-span-4 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-4 w-full rounded-lg font-[sans-serif] overflow-hidden">
                <CardHeader>
                  <Link to={`/case/detail/${caseItem.id}`}>
                    <CardTitle className="text-lg font-medium text-primary mb-2">
                      <span>
                        {caseItem.title.length > 30 ? (
                          <>
                            {caseItem.title.substring(0, 30)}
                            <b> ...</b>
                          </>
                        ) : (
                          caseItem.title
                        )}
                      </span>
                    </CardTitle>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Separator />
                  <div className="flex justify-between text-sm gap-3">
                    <div className="flex gap-1 h-6 w-1/2 items-center">
                      <DollarSign size={16} className="text-gray-500" />
                      <span>
                        {caseItem.budget_amount} {caseItem.budget_type}
                      </span>
                    </div>
                    <Link to={`/case/detail/${caseItem.id}`}>
                      <Button className="flex gap-1 h-6" variant={"outline"}>
                        <Eye />
                        View
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="text-end">
              <Link to={"/case/list"}>
                <Button className="h-8">See more ...</Button>
              </Link>
            </div>
          </div>
        ) : isCasesError ? (
          <ApiResponseError />
        ) : (
          <NoDataFound />
        )}
      </div>
    </div>
  );
};

export default CaseDetail;
