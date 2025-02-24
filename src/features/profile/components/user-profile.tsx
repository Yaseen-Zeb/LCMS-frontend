import { Button } from "@/components/ui/button";
import { Edit, User2 } from "lucide-react";

const UserProfile = () => {
  return (
    <>
      <div className=" items-start justify-between grid grid-cols-3">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center text-white">
            <div className="text-gray-600">
              <User2 size={35} />
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Jese Leos</h4>
            <p className="text-sm">Country Admin</p>
            <p className="text-sm text-gray-500 font-medium">
              jeseleos@example.com
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">Paris, France</p>
          <p className="text-sm text-gray-500 ">
            15 Rue de la Paix, Paris, France, 75002
          </p>
          <p className="text-sm text-gray-500">+33 1 23 45 67 89</p>
        </div>
        <Button className="p-2 ml-auto w-max rounded-full h-auto bg-gray-100 hover:bg-gray-200 self-start">
          <Edit className="h-4 w-4 text-gray-600" />
        </Button>
      </div>
    </>
  );
};

export default UserProfile;
