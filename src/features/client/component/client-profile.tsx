import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpToLine,
  CalendarDays,
  CircleUserRound,
  DollarSign,
  Eye,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import OpenCases from "./open-cases";
import ClosedCases from "./closed-cases";
import { Link, useParams } from "react-router-dom";
import { useGetCases } from "@/features/case/api/api-queries";
import Loader from "@/components/ui/loader";
import ApiResponseError from "@/components/shared/api-response-error";
import NoDataFound from "@/components/shared/no-data-found";
import { useGetClientDetail } from "../api/api-queries";
import formatDate from "@/utils/formatDate";

const ClientProfile = () => {
  const { id } = useParams();
  const {
    data: cases,
    isLoading: isCasesLoading,
    isError: isCasesError,
  } = useGetCases();
  const {
    data: clientDetail,
    isLoading: isClientDetailLoading,
    isError: isClientDetailError,
  } = useGetClientDetail(Number(id || 0));

  return (
    <div className="grid grid-cols-8">
      <div className="col-span-5">
        <h2 className="text-xl font-medium mb-3 px-1">Client Profile</h2>

        {isClientDetailLoading ? (
          <Loader />
        ) : clientDetail?.data ? (
          <>
            <Card className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] border-none  p-5 w-full rounded-lg rounded-bl-none font-sans overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-primary mb-2 flex gap-1 items-center">
                  <CircleUserRound size={30} />
                  <span>{clientDetail?.data.name}</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 mt-3">
                {/* Info Grid */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-start gap-2 text-sm">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Mail size={16} />
                      Contact email:
                    </span>
                    <span>{clientDetail?.data.email}</span>
                  </div>

                  <div className="flex items-start gap-2 text-sm">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Phone size={16} />
                      Phone number:
                    </span>
                    <span>{clientDetail?.data.phone_number}</span>
                  </div>

                  <div className="flex items-start gap-2 text-sm">
                    <span className="flex items-center gap-1 text-gray-500">
                      <CalendarDays size={16} />
                      Joined since:
                    </span>
                    <span>{formatDate(clientDetail?.data.createdAt)}</span>
                  </div>

                  <div className="flex items-start gap-2 text-sm">
                    <span className="flex items-center gap-1 text-gray-500">
                      <ArrowUpToLine size={16} />
                      Total posted cases:
                    </span>
                    <span>{clientDetail.data.postedCases}</span>
                  </div>

                  <div className="flex items-start gap-2 text-sm">
                    <span className="flex items-center gap-1 text-gray-500">
                      <MapPin size={16} />
                      Address:
                    </span>
                    <span>{clientDetail?.data.address}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Tabs defaultValue="open-cases">
              <TabsList className="h-12 bg-white border-t-0 shadow-md rounded-lg rounded-t-none font-sans overflow-hidden px-2 justify-start">
                <TabsTrigger
                  value="open-cases"
                  className="text-gray-500 data-[state=active]:text-primary data-[state=active]:shadow-none font-medium border-b-2 border-white rounded-none data-[state=active]:border-blue-600"
                >
                  Open Cases
                </TabsTrigger>
                <TabsTrigger
                  value="closed-cases"
                  className="text-gray-500 data-[state=active]:text-primary data-[state=active]:shadow-none font-medium border-b-2 border-white rounded-none data-[state=active]:border-blue-600"
                >
                  Closed Cases
                </TabsTrigger>
              </TabsList>

              <TabsContent value="open-cases" className="mt-[4px]">
                {clientDetail?.data && (
                  <OpenCases openCases={clientDetail?.data.openCases} />
                )}
              </TabsContent>
              <TabsContent value="closed-cases" className="mt-[4px]">
                {clientDetail?.data && (
                  <ClosedCases closedCases={clientDetail?.data.closedCases} />
                )}
              </TabsContent>
            </Tabs>
          </>
        ) : isClientDetailError ? (
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

export default ClientProfile;
