import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MyBids from "./lawyer-bids";
import { useAuthContext } from "@/providers/auth-provider";
import { useParams } from "react-router-dom";
import LawyerInfo from "./lawyer-Info";

const LawyerProfile = () => {
  const {user} = useAuthContext();
  const { id } = useParams();

  const isMyProfile = user?.id === id;
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
            value="bids"
            className="text-gray-500 data-[state=active]:text-primary data-[state=active]:shadow-none font-medium border-b-2 border-white rounded-none data-[state=active]:border-blue-600"
          >
            Work Histoy
          </TabsTrigger>

          {isMyProfile && (
            <TabsTrigger
              value="in_progress"
              className="text-gray-500 data-[state=active]:text-primary data-[state=active]:shadow-none font-medium border-b-2 border-white rounded-none data-[state=active]:border-blue-600"
            >
              My Bids
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="user-profile" className="mt-4 p-4 pt-0">
          <LawyerInfo />
        </TabsContent>
        <TabsContent value="bids" className="mt-4 p-4 pt-0">
          <MyBids />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LawyerProfile;
