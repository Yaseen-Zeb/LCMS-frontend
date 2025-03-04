import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import {
  ArrowUpNarrowWide,
  BadgePercent,
  Blocks,
  ChevronDown,
  DollarSign,
  Eye,
  MapPin,
  Search,
} from "lucide-react";
import Loader from "@/components/ui/loader";
import { useGetCases } from "../api/api-queries";
import NoDataFound from "@/components/shared/no-data-found";
import { Link } from "react-router-dom";
import ApiResponseError from "@/components/shared/api-response-error";
import { useAuthContext } from "@/providers/auth-provider";

const CasesList = () => {
  const { user, handleBidAuthModal } = useAuthContext();
  const { data, isLoading, isError } = useGetCases();
  return (
    <>
      <h3 className="text-xl font-semibold">Legal Cases</h3>
      <div className="flex gap-6 my-3">
        <div className="flex flex-col  gap-2">
          <div className="flex max-w-md w-[600px]">
            <Input
              type="text"
              placeholder="Search lagal cases"
              className="flex-1 border-gray-300  h-10 border-r-0 rounded-br-none rounded-tr-none focus:outline-none"
            />
            <Button
              variant="default"
              className="bg-primary rounded-bl-none rounded-tl-none text-white h-10"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 w-full">
            {["Region", "Sector", "Status"].map((filter) => (
              <DropdownMenu key={filter}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-gray-700 border-gray-300 flex items-center gap-0"
                  >
                    {filter} <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem>Option 1</DropdownMenuItem>
                  <DropdownMenuItem>Option 2</DropdownMenuItem>
                  <DropdownMenuItem>Option 3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : !data?.data.length ? (
        isError ? (
          <ApiResponseError />
        ) : (
          <NoDataFound />
        )
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {data?.data?.map((caseItem, index) => (
            <Card
              key={index}
              className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-4 w-full rounded-lg font-[sans-serif] overflow-hidden mt-4"
            >
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
              <CardContent className="space-y-2">
                {/* Description */}
                <p className="text-sm text-gray-600 min-h-[39px] leading-[1.5]">
                  {caseItem.description.length > 80 ? (
                    <>
                      {caseItem.description.substring(0, 80)}
                      <b> ...</b>
                    </>
                  ) : (
                    caseItem.description
                  )}
                </p>

                <Separator />
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign size={16} className="text-gray-500" />
                    <span>
                      ${caseItem.budget_amount} {caseItem.budget_type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Blocks size={16} className="text-gray-500" />
                    <span>{caseItem.case_category}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} className="text-gray-500" />
                    <span>
                      {caseItem.location.length > 25 ? (
                        <>
                          {caseItem.location.substring(0, 25)}
                          <b> ...</b>
                        </>
                      ) : (
                        caseItem.location
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowUpNarrowWide size={18} className="text-gray-500" />
                    <Badge className="font-medium">{caseItem.urgency}</Badge>
                  </div>
                </div>

                <Separator />
                <div className="text-sm flex">
                  <span className="w-16 whitespace-nowrap">Expertise:</span>
                  <span className="flex-1 text-gray-500">
                    {Array.isArray(caseItem.expertise_required) &&
                    caseItem.expertise_required.length > 0 ? (
                      <>
                        {caseItem.expertise_required.join(", ").length > 25 ? (
                          <>
                            {caseItem.expertise_required
                              .join(", ")
                              .substring(0, 25)}
                            <b> ...</b>
                          </>
                        ) : (
                          caseItem.expertise_required.join(", ")
                        )}
                      </>
                    ) : (
                      "No expertise specified"
                    )}
                  </span>
                </div>

                <Separator />
                <div
                  className={`grid  justify-between text-sm gap-3 ${
                    user?.role == "client" ? "grid-cols-1" : "grid-cols-2"
                  }`}
                >
                  {user?.role != "client" && (
                    <Button
                      className="flex gap-1 h-6 w-full"
                      variant={"outline"}
                      onClick={() => handleBidAuthModal(caseItem.id)}
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
                      {user?.role === "client" ? "View Case Details" : "View"}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default CasesList;
