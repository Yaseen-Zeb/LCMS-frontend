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
  Award,
  CircleUserRound,
  Eye,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { IUser } from "@/types";
import { Link } from "react-router-dom";

export function LawyerCarousel({
  delay,
  data,
  limit,
}: {
  delay: number;
  data?: IUser[];
  limit: number;
}) {
  const autoplayInstance = React.useRef(
    Autoplay({ delay, stopOnInteraction: true })
  );

  // Paginate data into chunks of `limit`
  const paginatedData: IUser[][] = [];
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
              {caseGroup.map((lawyerItem, index) => (
                <Card
                  key={lawyerItem.id || index}
                  className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-4 w-full rounded-lg font-[sans-serif] overflow-hidden mt-4"
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-medium items-center text-primary mb-2 flex gap-2">
                      <CircleUserRound size={35} className="text-gray-500" />
                      <span>{lawyerItem.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Separator className="w-[300px] m-auto" />

                    {/* Specialization */}
                    <div className="text-sm flex gap-1">
                      <span className="flex items-center gap-1 text-gray-500">
                        <Award size={16} /> Specialization:
                      </span>
                      <span className="flex-1">
                        <span className="flex-1 text-gray-500">
                          {lawyerItem.specialization
                            ? (() => {
                                const specArray = Array.isArray(
                                  lawyerItem.specialization
                                )
                                  ? lawyerItem.specialization
                                  : JSON.parse(
                                      lawyerItem.specialization || "[]"
                                    ); // Parse if it's a string

                                const specText = specArray.join(", ");
                                return specText.length > 36 ? (
                                  <>
                                    {specText.substring(0, 36)}
                                    <b> ...</b>
                                  </>
                                ) : (
                                  specText
                                );
                              })()
                            : "No expertise specified"}
                        </span>
                      </span>
                    </div>

                    <Separator />

                    {/* Address */}
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <span className="flex items-center gap-1 text-gray-500">
                          <MapPin size={16} className="text-gray-500" />{" "}
                          Address:
                        </span>
                        <span>
                          {lawyerItem.address.length > 39 ? (
                            <>
                              {lawyerItem.address.substring(0, 39)}
                              <b>...</b>
                            </>
                          ) : (
                            lawyerItem.address
                          )}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    {/* Experience & View Button */}
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <span className="flex items-center gap-1 text-gray-500">
                          <Sparkles size={16} /> Experience:
                        </span>
                        <span>{lawyerItem.experience} years</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant={"outline"} className="h-6 flex gap-1">
                          <Eye />
                          View Profile
                        </Button>
                      </div>
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

      <Link to={"/lawyer/list"}>
        <Button className="absolute right-4 bottom-[47px]">
          View more
          <ArrowRight />
        </Button>
      </Link>
    </Carousel>
  );
}
