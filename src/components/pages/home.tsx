import NavBar from "../shared/nav-bar";
import Footer from "../shared/footer";
import { useGetCases } from "@/features/case/api/api-queries";
import NoDataFound from "../shared/no-data-found";
import Loader from "../ui/loader";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ApiResponseError from "../shared/api-response-error";
import formatDate from "@/utils/formatDate";
import {
  Award,
  Briefcase,
  CircleUserRound,
  Eye,
  MapPin,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Header from "../shared/header";
import { Link } from "react-router-dom";
import { useGetLawyers } from "@/features/lawyer/api/api-queries";
import { env } from "@/config/env";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const Home = () => {
  const {
    data: cases,
    isLoading: isCasesLoading,
    isError: isCasesError,
  } = useGetCases();
  const {
    data: lawyers,
    isLoading: isLawyersLoading,
    isError: isLawyersError,
  } = useGetLawyers();

  return (
    <div className="text-gray-800 flex flex-col justify-center">
      <NavBar />
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-14">
      <h3 className="text-center text-2xl sm:text-3xl font-medium mb-4">
          Cases You May Find Interesting
        </h3>
        {isCasesLoading ? (
          <Loader />
        ) : cases?.data.length ? (
<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 my-4 mb-10">
{cases.data.map((caseItem, i) => (
              <Link
                key={i}
                to={`/case/detail/${caseItem.id}`}
                className="w-full"
              >
                <div
                  key={caseItem.id}
                  className="p-4 bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] rounded-lg border border-gray-200 cursor-pointer hover:border-primary group"
                >
                  <h2 className="text-lg font-semibold text-gray-800 group-hover:text-primary">
                    {caseItem.title.length < 57
                      ? caseItem.title
                      : caseItem.title.substring(0, 57) + " ..."}
                  </h2>

                  <div className="flex items-center text-gray-600 text-sm mt-2">
                    <span className="flex items-center gap-2">
                      <Briefcase size={16} />
                      Budget: {caseItem.budget_amount}$ <b>·</b>{" "}
                      {caseItem.budget_type}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mt-2">
                    <span className="flex items-center gap-2">
                      <TrendingUp size={16} />
                      Submitted Bids: {caseItem.total_bids || 0}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mt-2">
                    <span className="flex items-start gap-2">
                      <span>
                        <MapPin size={16} className="mt-0.5" />
                      </span>
                      Location:{" "}
                      {caseItem.location.length < 60
                        ? caseItem.location
                        : caseItem.location.substring(0, 60) + " ..."}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {caseItem.expertise_required.slice(0, 4).map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-500 text-sm mt-3">
                    Posted Date: {formatDate(caseItem.createdAt)} <b>·</b>{" "}
                    {caseItem.urgency}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-4 w-full rounded-lg font-[sans-serif] overflow-hidden mt-4 mb-8">
            <CardTitle className="text-lg font-medium  text-primary gap-2 flex items-center justify-center">
              {isCasesError ? <ApiResponseError /> : <NoDataFound />}
            </CardTitle>
          </Card>
        )}

        <h3 className="text-center text-3xl font-medium ">Popular Lawyers</h3>
        {isLawyersLoading ? (
          <Loader />
        ) : lawyers?.data.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {lawyers.data.map((lawyer, index) => (
            <Card
              key={lawyer.id || index}
              className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-4 w-full rounded-lg font-[sans-serif] overflow-hidden mt-4"
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
    <CircleUserRound className="text-gray-700 w-full h-full rounded-full border p-1" />
  )}

  {/* Online/Offline Status Dot */}
  <span
    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
      lawyer?.is_online ? "bg-green-500" : "bg-gray-400"
    }`}
  />
</div>

                    <span>{lawyer.name}</span>
                  </CardTitle>
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
              <Separator className="max-w-full m-auto" />

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
        ) : (
          <Card className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-4 w-full rounded-lg font-[sans-serif] overflow-hidden mt-4 mb-8">
            <CardTitle className="text-lg font-medium text-primary gap-2 flex items-center justify-center">
              {isLawyersError ? <ApiResponseError /> : <NoDataFound />}
            </CardTitle>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
