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
    <div className="flex gap-6 p-6 bg-gray-100 min-h-screen">
      <Tabs
        defaultValue="client-profile"
        className="grid grid-cols-7 w-full gap-4"
      >
        {/* Sidebar */}
        <aside className=" bg-white rounded-xl shadow-lg p-4 col-span-2">
          <div className="flex flex-col items-center">
            {profileDetail?.data.profile_picture ? (
              <img
                className="w-20 h-20 rounded-full"
                src={`${env.VITE_APP_BASE_URL}/${profileDetail.data.profile_picture}`}
                alt=""
              />
            ) : (
              <UserCircle size={80} />
            )}
            <h2 className="text-lg font-semibold ">
              {profileDetail?.data.name}
            </h2>
            <p className="text-gray-500 text-sm">{profileDetail?.data.email}</p>
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
                <FileCheck2  size={18} />
                {isMyProfile ? "My Posted Cases" : "Client Posted Cases"}
              </Button>
            </TabsTrigger>

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
          </TabsList>
        </aside>

        {/* Main Content */}
        <main className=" col-span-5 bg-white rounded-xl">
          {/* Tabs Content */}
          {!isProfileDetailLoading ? (
            isProfileDetailError ? (
              <ApiResponseError msg={(error as Error).message} />
            ) : profileDetail?.data ? (
              <>
                <TabsContent value="client-profile" className="mt-4 p-4 pt-0">
                  <ClientIno profileInfo={profileDetail?.data} />
                </TabsContent>
                <TabsContent value="client-cases" className="mt-4 p-4 pt-0">
                  <ClientCases cases={profileDetail?.data.cases} />
                </TabsContent>
                <TabsContent value="bids" className="mt-4 p-4 pt-0">
                  <ClientCaseBids bids={profileDetail?.data.bids} />
                </TabsContent>
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
