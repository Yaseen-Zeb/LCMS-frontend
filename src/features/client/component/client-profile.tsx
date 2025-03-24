import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useGetClientProfile } from "../api/api-queries";
import { useAuthContext } from "@/providers/auth-provider";
import { Separator } from "@/components/ui/separator";
import { UserCircle, FileCheck2, Tickets } from "lucide-react";
import ApiResponseError from "@/components/shared/api-response-error";
import ClientCases from "./client-cases";
import ClientCaseBids from "./client-case-bids";
import ClientIno from "./client-info";
import Loader from "@/components/ui/loader";
import { env } from "@/config/env";
import UpdateProfilePicture from "./update-profile-picture";

const ClientProfile = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const {
    data: profileDetail,
    isLoading: isProfileDetailLoading,
    isError: isProfileDetailError,
    error,
  } = useGetClientProfile(Number(id));
  const isMyProfile = user && user.id === Number(id);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <Tabs
        defaultValue="client-profile"
        className="grid grid-cols-7 w-full gap-4"
      >
        {/* Sidebar */}
        <aside className="bg-white rounded-xl shadow-lg p-4 w-full h-96  col-span-full lg:col-span-2">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="relative w-20 h-20">
                <div className="relative w-20 h-20">
                  {profileDetail?.data.clientInfo.profile_picture ? (
                    <img
                      className="w-20 h-20 rounded-full border"
                      src={`${env.VITE_APP_BASE_URL}/${profileDetail.data.clientInfo.profile_picture}`}
                      alt="Profile"
                    />
                  ) : (
                    <UserCircle size={80} className="text-gray-400" />
                  )}

                  {/* Status Dot */}
                  {!isMyProfile && (
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        profileDetail?.data.clientInfo.is_online
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    />
                  )}
                </div>
              </div>

              {/* Open Dialog on Edit Click */}
              {isMyProfile && (
                <UpdateProfilePicture
                  old_image={profileDetail?.data.clientInfo.profile_picture}
                />
              )}
            </div>
            <h2 className="text-lg font-semibold ">
              {profileDetail?.data?.clientInfo?.name}
            </h2>
            <p className="text-gray-500 text-sm">
              {profileDetail?.data?.clientInfo?.email}
            </p>
          </div>
          <Separator className="mt-5 mb-16" />

          {/* Tabs Navigation */}
          <TabsList className="flex flex-col w-full bg-transparent">
            <TabsTrigger
              value="client-profile"
              className="w-full text-left data-[state=active]:bg-blue-100 data-[state=active]:text-blue-500 data-[state=active]:shadow-none"
            >
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start gap-1.5 hover:bg-transparent"
              >
                <UserCircle size={18} />{" "}
                {isMyProfile ? "My Profile" : "Client Profile"}
              </Button>
            </TabsTrigger>

            <TabsTrigger
              value="client-cases"
              className="w-full text-left data-[state=active]:bg-blue-100 data-[state=active]:text-blue-500 data-[state=active]:shadow-none bg-none"
            >
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start gap-1.5 hover:bg-transparent"
              >
                <FileCheck2 size={18} />
                {isMyProfile ? "My Posted Cases" : "Client Posted Cases"}
              </Button>
            </TabsTrigger>

            {isMyProfile && (
              <TabsTrigger
                value="bids"
                className="w-full text-left data-[state=active]:bg-blue-100 data-[state=active]:text-blue-500 data-[state=active]:shadow-none"
              >
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-start gap-1.5 hover:bg-transparent"
                >
                  <Tickets size={18} />
                  Bids for my Cases
                </Button>
              </TabsTrigger>
            )}
          </TabsList>
        </aside>

        {/* Main Content */}
        <main className="col-span-full lg:col-span-5">
          {/* Tabs Content */}
          {!isProfileDetailLoading ? (
            isProfileDetailError ? (
              <ApiResponseError msg={(error as Error).message} />
            ) : profileDetail?.data ? (
              <>
                <div className="bg-white rounded-xl  shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)]">
                  <TabsContent
                    value="client-profile"
                    className=" p-4 mt-0 min-h-96"
                  >
                    <ClientIno clientInfo={profileDetail?.data?.clientInfo} />
                  </TabsContent>
                </div>
                <TabsContent
                  value="client-cases"
                  className=" p-4 pt-0 mt-0 min-h-96 rounded-xl"
                >
                  <ClientCases cases={profileDetail?.data.cases} />
                </TabsContent>
                <div className="bg-white rounded-xl shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)]">
                  <TabsContent value="bids" className=" p-4 mt-0 min-h-96">
                    <ClientCaseBids cases={profileDetail?.data.bids} />
                  </TabsContent>
                </div>
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
