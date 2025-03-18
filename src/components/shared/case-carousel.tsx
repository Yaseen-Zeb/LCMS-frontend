import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  ArrowRight,
  ArrowUpNarrowWide,
  BadgePercent,
  Blocks,
  DollarSign,
  Eye,
  MapPin,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { ICase } from "@/types";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/providers/auth-provider";

export function CaseCarousel({
  delay,
  data,
  limit,
}: {
  delay: number;
  data?: ICase[];
  limit: number;
}) {
  const { user, handleBidAuthModal } = useAuthContext();
  const autoplayInstance = React.useRef(
    Autoplay({ delay, stopOnInteraction: true })
  );

  // Paginate data into chunks of `limit`
  const paginatedData: ICase[][] = [];
  for (let i = 0; i < data!.length; i += limit) {
    paginatedData.push(data!.slice(i, i + limit));
  }

  return (
    <Carousel
      className="relative w-full overflow-hidden pb-24"
      plugins={[autoplayInstance.current]}
      onMouseEnter={() => autoplayInstance.current.stop()}
      onMouseLeave={() => autoplayInstance.current.play()}
    >
      <CarouselContent>
        {paginatedData.map((caseGroup, pageIndex) => (
          <CarouselItem key={pageIndex}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {caseGroup.map((caseItem, index) => (
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
                  <CardContent className="space-y-3">
                    {/* Description */}
                    <div>
                      <p className="text-sm text-gray-600 h-[39px]">
                        {caseItem.description.length > 80 ? (
                          <>
                            {caseItem.description.substring(0, 80)}
                            <b> ...</b>
                          </>
                        ) : (
                          caseItem.description
                        )}
                      </p>
                    </div>

                    <Separator />

                    {/* Expertise & Case Type */}
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
                        <ArrowUpNarrowWide
                          size={18}
                          className="text-gray-500"
                        />
                        <Badge className="font-medium">
                          {caseItem.urgency}
                        </Badge>
                      </div>
                    </div>

                    <Separator />
                    <div className="text-sm flex">
                      <span className="w-16 whitespace-nowrap">Expertise:</span>
                      <span className="flex-1 text-gray-500">
                        {Array.isArray(caseItem.expertise_required) &&
                        caseItem.expertise_required.length > 0 ? (
                          <>
                            {caseItem.expertise_required.join(", ").length >
                            25 ? (
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
                      {user?.role == "lawyer" && (
                        <Button
                          className="flex gap-1 h-6 w-full"
                          variant={"outline"}
                          onClick={() => handleBidAuthModal(caseItem.id)}
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
                          {user?.role === "client"
                            ? "View Case Details"
                            : "View"}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="absolute left-[50%] bottom-16">
        <CarouselPrevious />
        <CarouselNext />
      </div>

      <Link to={"/case/list"}>
        <Button className="absolute right-4 bottom-[47px]">
          View more
          <ArrowRight />
        </Button>
      </Link>
    </Carousel>
  );
}
