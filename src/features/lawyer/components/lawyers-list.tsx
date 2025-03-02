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
  Award,
  ChevronDown,
  CircleUserRound,
  Eye,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import { useGetLawyers } from "../api/api-queries";
import Loader from "@/components/ui/loader";
import NoDataFound from "@/components/shared/no-data-found";
import ApiResponseError from "@/components/shared/api-response-error";
import { Link } from "react-router-dom";

const LawyersList = () => {
  const { data, isLoading, isError } = useGetLawyers();

  return (
    <>
      <h3 className="text-xl font-semibold">Lawyers</h3>
      <div className="flex gap-6 my-3">
        <div className="flex flex-col gap-2">
          <div className="flex max-w-md w-[600px]">
            <Input
              type="text"
              placeholder="Search lawyers"
              className="flex-1 border-gray-300 h-10 border-r-0 rounded-br-none rounded-tr-none focus:outline-none"
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
      ) : data?.data.length ? (
        <div className="grid grid-cols-3 gap-4">
          {data.data.map((lawyer, index) => (
            <Card
              key={lawyer.id || index}
              className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-4 w-full rounded-lg font-[sans-serif] overflow-hidden mt-4"
            >
              <CardHeader>
              <Link to={`/lawyer/profile/${lawyer.id}`}>
                <CardTitle className="text-lg font-medium items-center text-primary mb-2 flex gap-2">
                  <CircleUserRound size={35} className="text-gray-500" />
                  <span>{lawyer.name}</span>
                </CardTitle>
                </Link>
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
                      {lawyer.specialization
                        ? (() => {
                            const specArray = Array.isArray(
                              lawyer.specialization
                            )
                              ? lawyer.specialization
                              : JSON.parse(lawyer.specialization || "[]"); // Parse if it's a string

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
                      <MapPin size={16} className="text-gray-500" /> Address:
                    </span>
                    <span>
                      {lawyer.address.length > 39 ? (
                        <>
                          {lawyer.address.substring(0, 39)}
                          <b>...</b>
                        </>
                      ) : (
                        lawyer.address
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
                    <span>{lawyer.experience} years</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Link to={`/lawyer/profile/${lawyer.id}`}>
                      <Button variant={"outline"} className="h-6 flex gap-1">
                        <Eye />
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : isError ? (
        <ApiResponseError />
      ) : (
        <NoDataFound />
      )}
    </>
  );
};

export default LawyersList;
