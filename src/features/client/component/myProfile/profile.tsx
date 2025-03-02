import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UserProfile from "./user-profile";
import MyCases from "./my-cases";
import Loader from "@/components/ui/loader";
import ApiResponseError from "@/components/shared/api-response-error";
import { useGetProfileDetail } from "../../api/api-queries";

const Profile = () => {
  const {
    data: profileDetail,
    isLoading: isProfileDetailLoading,
    isError: isProfileDetailError,
  } = useGetProfileDetail();
  

  return (
    <div className="border shadow-sm rounded-sm bg-white">
      <Tabs defaultValue="user-profile" className="w-full">
        <TabsList className="flex h-12 border-gray-200 bg-white justify-start px-2">
          <TabsTrigger
            value="user-profile"
            className="text-gray-500 data-[state=active]:text-primary data-[state=active]:shadow-none font-medium border-b-2 border-white rounded-none data-[state=active]:border-blue-600"
          >
            My Profile
          </TabsTrigger>
          <TabsTrigger
            value="company-profile"
            className="text-gray-500 data-[state=active]:text-primary data-[state=active]:shadow-none font-medium border-b-2 border-white rounded-none data-[state=active]:border-blue-600"
          >
            My Cases
          </TabsTrigger>
          <TabsTrigger
            value="bids"
            className="text-gray-500 data-[state=active]:text-primary data-[state=active]:shadow-none font-medium border-b-2 border-white rounded-none data-[state=active]:border-blue-600"
          >
            Bids for my Cases
          </TabsTrigger>
        </TabsList>
        {!isProfileDetailLoading ? (
          <>
            <TabsContent value="user-profile" className="mt-4 p-4 pt-0">
              {profileDetail?.data && (
                <UserProfile profileInfo={profileDetail?.data} />
              )}
            </TabsContent>
            <TabsContent value="company-profile" className="mt-4 p-4 pt-0">
              {profileDetail?.data && (
                <MyCases cases={profileDetail?.data.cases} />
              )}
            </TabsContent>
            <TabsContent value="bids" className="mt-4 p-4 pt-0">
              {profileDetail?.data && (
                <div className="text-lg font-medium text-center">Under development</div>
              )}
            </TabsContent>
          </>
        ) : isProfileDetailError ? (
          <ApiResponseError />
        ) : (
          <Loader />
        )}
      </Tabs>
    </div>
  );
};

export default Profile;
