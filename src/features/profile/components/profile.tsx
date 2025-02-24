import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UserProfile from "./user-profile";
import MyCases from "./my-cases";

const Profile = () => {
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
        </TabsList>
        <TabsContent value="user-profile" className="mt-4 p-4 pt-0">
          <UserProfile />
        </TabsContent>
        <TabsContent value="company-profile" className="mt-4 p-4 pt-0">
          < MyCases/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
