import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Blocks,
  CalendarClock,
  CircleUserRound,
  DollarSign,
  Eye,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useGetCases } from "@/features/case/api/api-queries";
import Loader from "@/components/ui/loader";
import NoDataFound from "@/components/shared/no-data-found";
import { useGetLawyerDetail } from "../api/api-queries";
import ApiResponseError from "@/components/shared/api-response-error";

const LawyerProfile = () => {
  const { id } = useParams();
  const {
    data: cases,
    isLoading: isCasesLoading,
    isError: isCasesError,
  } = useGetCases();
  const {
    data: lawyerDetail,
    isLoading: isLawyerDetailLoading,
    isError: isLawyerDetailError,
  } = useGetLawyerDetail(Number(id || 0));

  return (
    <div className="grid grid-cols-8">
      <div className="col-span-5">
        <h2 className="text-xl font-medium mb-3 px-1">Case Details</h2>
        {isLawyerDetailLoading ? (
          <Loader />
        ) : lawyerDetail?.data ? (
          <Card className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-5 w-full rounded-lg font-sans overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-primary mb-2 flex gap-1 items-center">
                <CircleUserRound size={30} />
                <span>{lawyerDetail?.data.name}</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 mt-3">
              {/* Info Grid */}
              <div className="grid grid-cols-1 gap-3">
                {/* Category */}
                <div className="flex items-start gap-2 text-sm">
                  <span className="flex items-center gap-1 text-gray-500">
                    <Blocks size={16} />
                    Specialization:
                  </span>
                  <span>
                    {lawyerDetail?.data?.specialization?.join(", ") ||
                      "No specialization available"}
                  </span>
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <span className="flex items-center gap-1 text-gray-500">
                    <Mail size={16} />
                    Contact Email:
                  </span>
                  <span>{lawyerDetail?.data.email}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="flex items-center gap-1 text-gray-500">
                    <Phone size={16} />
                    Phone Number:
                  </span>
                  <span>{lawyerDetail?.data.phone_number}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="flex items-center gap-1 text-gray-500">
                    <CalendarClock size={16} />
                    Experience:
                  </span>
                  <span className="flex gap-1">
                    <span>{lawyerDetail?.data.experience}</span>
                    <span>Years</span>
                  </span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="flex items-center gap-1 text-gray-500">
                    <MapPin size={16} />
                    Address:
                  </span>
                  <span>{lawyerDetail?.data.address}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : isLawyerDetailError ? (
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

export default LawyerProfile;
