import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useAuthContext } from "@/providers/auth-provider";
import { Separator } from "@/components/ui/separator";
import { UserCircle, FileCheck2, Tickets } from "lucide-react";
import ApiResponseError from "@/components/shared/api-response-error";

import Loader from "@/components/ui/loader";
import { env } from "@/config/env";
import { useGetLawyerProfile } from "../api/api-queries";
import LawyerInfo from "./lawyer-Info";
import WorkHistory from "./work-history";
import LawyerBids from "./lawyer-bids";
import UpdateProfilePicture from "./update-profile-picture";

const ClientProfile = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const {
    data: profileDetail,
    isLoading: isProfileDetailLoading,
    isError: isProfileDetailError,
    error,
  } = useGetLawyerProfile(Number(id));
  const isMyProfile = user && user.id === Number(id);



  return (
    <div className="flex gap-6 p-6 bg-gray-100 min-h-screen">
      <Tabs
        defaultValue="lawyer-profile"
        className="grid grid-cols-7 w-full gap-4"
      >
        {/* Sidebar */}
        <aside className=" bg-white rounded-xl shadow-lg p-4 col-span-2 max-h-96">
          <div className="flex flex-col items-center relative">
            <div className="relative">
              {profileDetail?.data.lawyerInfo.profile_picture ? (
                <img
                  className="w-20 h-20 rounded-full"
                  src={`${env.VITE_APP_BASE_URL}/${profileDetail.data.lawyerInfo.profile_picture}`}
                  alt="Profile"
                />
              ) : (
                <UserCircle size={80} />
              )}

              {/* Open Dialog on Edit Click */}
              {isMyProfile && <UpdateProfilePicture old_image={profileDetail?.data.lawyerInfo.profile_picture} />}
            </div>

            <h2 className="text-lg font-semibold">
              {profileDetail?.data.lawyerInfo.name}
            </h2>
            <p className="text-gray-500 text-sm">
              {profileDetail?.data.lawyerInfo.email}
            </p>
          </div>
          <Separator className="mt-5 mb-16" />

          {/* Tabs Navigation */}
          <TabsList className="flex flex-col w-full bg-transparent">
            <TabsTrigger
              value="lawyer-profile"
              className="w-full text-left data-[state=active]:bg-blue-100 data-[state=active]:text-blue-500 data-[state=active]:shadow-none"
            >
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start gap-1.5 hover:bg-transparent"
              >
                <UserCircle size={18} />{" "}
                {isMyProfile ? "My Profile" : "Lawyer Profile"}
              </Button>
            </TabsTrigger>

            <TabsTrigger
              value="work-history"
              className="w-full text-left data-[state=active]:bg-blue-100 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-none"
            >
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start gap-1.5 hover:bg-transparent"
              >
                <FileCheck2 size={18} />
                {isMyProfile ? "My Work History" : "Lawyer Work History"}
              </Button>
            </TabsTrigger>

            <TabsTrigger
              value="bids"
              className="w-full text-left data-[state=active]:bg-blue-100 data-[state=active]:text-blue-500 data-[state=active]:shadow-none"
            >
              {isMyProfile && (
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-start gap-1.5 hover:bg-transparent"
                >
                  <Tickets size={18} />
                  My Submitted Bids
                </Button>
              )}
            </TabsTrigger>
          </TabsList>
        </aside>

        {/* Main Content */}
        <main className=" col-span-5">
          {/* Tabs Content */}
          {!isProfileDetailLoading ? (
            isProfileDetailError ? (
              <ApiResponseError msg={(error as Error).message} />
            ) : profileDetail?.data ? (
              <>
                <main className="bg-white rounded-xl">
                  <TabsContent value="lawyer-profile" className="p-4 mt-0">
                    <LawyerInfo lawyerInfo={profileDetail?.data.lawyerInfo} />
                  </TabsContent>
                </main>
                <main className=" rounded-xl">
                  <TabsContent value="work-history" className="p-4 pt-0 mt-0 ">
                    <WorkHistory cases={profileDetail.data.cases} />
                  </TabsContent>
                </main>
                <main className="bg-white rounded-xl">
                  <TabsContent value="bids" className="p-4 mt-0">
                    <LawyerBids bids={profileDetail?.data.bids} />
                  </TabsContent>
                </main>
              </>
            ) : (
              <ApiResponseError msg="No profile data available" />
            )
          ) : (
            <Loader />
          )}
        </main>
      </Tabs>
    </div>
  );
};

export default ClientProfile;
