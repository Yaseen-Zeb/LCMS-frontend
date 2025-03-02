import ChangePassword from "@/features/auth/components/change-password";
import { IUser } from "@/types";
import UpdateProfile from "./update-profile";

const UserProfile = ({ profileInfo }: { profileInfo: IUser }) => {
  return (
    <>
      <div className=" items-start justify-between grid grid-cols-3">
        <div className="flex flex-col gap-3">
          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Name:</p>
            <p className="text-sm font-medium px-1">{profileInfo.name}</p>
          </div>
          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Email:</p>
            <p className="text-sm font-medium px-1">{profileInfo.email}</p>
          </div>
          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Phone no:</p>
            <p className="text-sm font-medium px-1">
              {profileInfo.phone_number}
            </p>
          </div>
          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Address:</p>
            <p className="text-sm font-medium px-1">{profileInfo.address}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center mt-12">
          <UpdateProfile oldDetalil={profileInfo}/>
         <ChangePassword/>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default UserProfile;
