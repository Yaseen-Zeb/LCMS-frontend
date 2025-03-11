import NavBar from "../shared/nav-bar";
import Footer from "../shared/footer";
import { useGetCases } from "@/features/case/api/api-queries";
import NoDataFound from "../shared/no-data-found";
import Loader from "../ui/loader";
import { Card, CardTitle } from "../ui/card";
import ApiResponseError from "../shared/api-response-error";
import formatDate from "@/utils/formatDate";
import { Briefcase, MapPin, TrendingUp } from "lucide-react";
import Header from "../shared/header";
import { Link } from "react-router-dom";

const Home = () => {
  const {
    data: cases,
    isLoading: isCasesLoading,
    isError: isCasesError,
  } = useGetCases();
  // const {
  //   data: lawyers,
  //   isLoading: isLawyersLoading,
  //   isError: isLawyersError,
  // } = useGetLawyers();

  return (
    <div className="text-gray-800 flex flex-col justify-center">
      <NavBar />
      <Header />
      <div className="container m-auto pt-14">
        <h3 className="text-center text-3xl font-medium mb-4">
          Cases You May Find Interesting
        </h3>
        {isCasesLoading ? (
          <Loader />
        ) : cases?.data.length ? (
          <div className="grid gap-4 grid-cols-2 my-4 mb-10">
            {cases.data.map((caseItem) => (
               <Link to={`/case/detail/${caseItem.id}`} className="w-full">
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
        {/* <h3 className="text-center text-3xl font-medium ">Popular Lawyers</h3>
        {isLawyersLoading ? (
          <Loader />
        ) : lawyers?.data.length ? (
          <LawyerCarousel data={lawyers?.data} limit={3} delay={5000} />
        ) : (
          <Card className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-4 w-full rounded-lg font-[sans-serif] overflow-hidden mt-4 mb-8">
            <CardTitle className="text-lg font-medium  text-primary gap-2 flex items-center justify-center">
              {isLawyersError ? <ApiResponseError /> : <NoDataFound />}
            </CardTitle>
          </Card>
        )} */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
