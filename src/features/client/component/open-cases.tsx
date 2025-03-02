import NoDataFound from "@/components/shared/no-data-found";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/providers/auth-provider";
import { ICase } from "@/types";
import {
  ArrowUpNarrowWide,
  BadgePercent,
  Blocks,
  DollarSign,
  Eye,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const OpenCases = ({ openCases }: { openCases: ICase[] }) => {
  const  {user} = useAuthContext()
  return (
    <>
      {openCases.length ? (
        <div className="grid grid-cols-2 gap-4">
          {openCases?.map((caseItem, index) => (
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
                <div className={`grid  justify-between text-sm gap-3 ${user?.role == "client" ? "grid-cols-1" : "grid-cols-2"  }`}>
                                     {user?.role != "client" && (
                                       <Button
                                         className="flex gap-1 h-6 w-full"
                                         variant={"outline"}
                                       >
                                         <BadgePercent />
                                         Bid
                                       </Button>
                                     )}
                                     <Link
                                       to={`/case/detail/${caseItem.id}`}
                                       className="w-full"
                                     >
                                       <Button
                                         className="flex gap-1 h-6 w-full"
                                         variant={"outline"}
                                       >
                                         <Eye />
                                         {user?.role === "client" ?"View Case Details" :"View"}
                                       </Button>
                                     </Link>
                                   </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <NoDataFound
          className="mt-4"
          text="No cases have been submitted by this client yet."
        />
      )}
    </>
  );
};

export default OpenCases;
