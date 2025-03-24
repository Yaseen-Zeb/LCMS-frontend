import { useState } from "react";
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
  Sparkles,
  XCircle,
} from "lucide-react";
import { useGetLawyers } from "../api/api-queries";
import Loader from "@/components/ui/loader";
import NoDataFound from "@/components/shared/no-data-found";
import ApiResponseError from "@/components/shared/api-response-error";
import { Link } from "react-router-dom";
import { env } from "@/config/env";
import { EXPERTISE_AREAS } from "@/utils/constant";

const LawyersList = () => {
  const { data, isLoading, isError } = useGetLawyers();

  const [searchQuery, setSearchQuery] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");

  let filteredLawyers = data?.data || [];

  if (searchQuery) {
    filteredLawyers = filteredLawyers.filter((lawyer) =>
      lawyer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (specializationFilter) {
    filteredLawyers = filteredLawyers.filter((lawyer) =>
      lawyer.specialization?.includes(specializationFilter)
    );
  }

  if (experienceFilter === "Low to High") {
    filteredLawyers = [...filteredLawyers].sort(
      (a, b) => (a.experience ?? 0) - (b.experience ?? 0)
    );
  } else if (experienceFilter === "High to Low") {
    filteredLawyers = [...filteredLawyers].sort(
      (a, b) => (b.experience ?? 0) - (a.experience ?? 0)
    );
  }

  const clearFilters = () => {
    setSearchQuery("");
    setSpecializationFilter("");
    setExperienceFilter("");
  };

  return (
    <>
      <h3 className="text-xl font-semibold">Lawyers</h3>
      <div className="flex flex-col md:max-w-lg gap-2  my-3">
        {/* <div className="flex-1 flex flex-col gap-3"> */}
        <Input
          type="text"
          placeholder="Search lawyers"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-gray-300 h-10"
        />

        <div className="flex flex-wrap gap-2 items-center">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="text-gray-700 border-gray-300 flex items-center gap-0"
              >
                {specializationFilter || "Specialization"} <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white overflow-y-scroll max-h-96">
              {EXPERTISE_AREAS.map((spec) => (
                <DropdownMenuItem
                  key={spec.value}
                  onClick={() => setSpecializationFilter(spec.value)}
                >
                  {spec.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem onClick={() => setSpecializationFilter("")}>All Specializations</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="text-gray-700 border-gray-300 flex items-center gap-0"
              >
                {experienceFilter || "Experience"} <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white overflow-y-scroll max-h-96">
              <DropdownMenuItem onClick={() => setExperienceFilter("Low to High")}>Low to High</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setExperienceFilter("High to Low")}>High to Low</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setExperienceFilter("")}>All Levels</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {(specializationFilter || experienceFilter || searchQuery) && (
            <Button
              variant="outline"
              className="text-red-600 border-gray-300 flex items-center gap-1"
              onClick={clearFilters}
            >
              <XCircle size={16} /> Clear Filters
            </Button>
          )}
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : !filteredLawyers.length ? (
        isError ? <ApiResponseError /> : <NoDataFound />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLawyers.map((lawyer, index) => (
            <Card
              key={lawyer.id || index}
              className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-4 w-full rounded-lg font-[sans-serif] overflow-hidden"
            >
              <CardHeader>
                <Link to={`/lawyer/profile/${lawyer.id}`}>
                  <CardTitle className="text-lg font-medium items-center text-primary mb-2 flex gap-2">
                    <div className="relative w-10 h-10">
                      {lawyer?.profile_picture ? (
                        <img
                          src={`${env.VITE_APP_BASE_URL}/${lawyer.profile_picture}`}
                          alt="Profile Picture"
                          className="w-full h-full rounded-full border"
                        />
                      ) : (
                        <CircleUserRound className="text-gray-700 w-full h-full rounded-full border" />
                      )}
                      <span
                        className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                          lawyer?.is_online ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <span>{lawyer.name}</span>
                  </CardTitle>
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                <Separator className="w-full" />

                <div className="text-sm flex gap-1">
                  <span className="flex items-center gap-1 text-gray-500">
                    <Award size={16} /> Specialization:
                  </span>
                  <span className="flex-1 text-gray-500">
                    {lawyer.specialization
                      ? (() => {
                          const specArray = Array.isArray(lawyer.specialization)
                            ? lawyer.specialization
                            : JSON.parse(lawyer.specialization || "[]");
                          const specText = specArray.join(", ");
                          return specText.length > 36 ? (
                            <>{specText.substring(0, 36)}<b> ...</b></>
                          ) : (
                            specText
                          );
                        })()
                      : "No expertise specified"}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <span className="flex items-center gap-1 text-gray-500">
                      <MapPin size={16} /> Address:
                    </span>
                    <span>
                      {lawyer.address.length > 39
                        ? `${lawyer.address.substring(0, 39)}...`
                        : lawyer.address}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col sm:flex-row justify-between text-sm gap-2">
                  <div className="flex items-center gap-1">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Sparkles size={16} /> Experience:
                    </span>
                    <span>{lawyer.experience} years</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Link to={`/lawyer/profile/${lawyer.id}`}>
                      <Button variant={"outline"} className="h-6 flex gap-1 w-full sm:w-auto">
                        <Eye /> View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default LawyersList;