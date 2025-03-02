import NavBar from "../shared/nav-bar";
import { banner } from "@/assets";
import Footer from "../shared/footer";
import { useGetCases } from "@/features/case/api/api-queries";
import NoDataFound from "../shared/no-data-found";
import Loader from "../ui/loader";
import { useGetLawyers } from "@/features/lawyer/api/api-queries";
import { CaseCarousel } from "../shared/case-carousel";
import { LawyerCarousel } from "../shared/lawyer-carousel";
import { Card, CardTitle } from "../ui/card";
import ApiResponseError from "../shared/api-response-error";

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
      <div
        className="relative w-full h-[280px] bg-cover bg-center flex items-center shadow-lg"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col justify-center max-w-md text-white ml-10 sm:ml-20 lg:ml-44 space-2-4">
          <h1 className="text-3xl font-bold text-yellow-400">Welcome!</h1>
          <p className="text-md">
            We prioritize transparency, delivering excellence and high-quality
            solutions. Our focus on trust and security ensures the
            confidentiality and protection of your sensitive data.
          </p>
        </div>
      </div>
      <div className="container m-auto pt-14">
        <h3 className="text-center text-3xl font-medium ">Most Recent Cases</h3>
        {isCasesLoading ? (
          <Loader />
        ) : cases?.data.length ? (
          <CaseCarousel data={cases?.data} limit={3} delay={5000} />
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
          <LawyerCarousel data={lawyers?.data} limit={3} delay={5000} />
        ) : (
          <Card className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-4 w-full rounded-lg font-[sans-serif] overflow-hidden mt-4 mb-8">
            <CardTitle className="text-lg font-medium  text-primary gap-2 flex items-center justify-center">
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
