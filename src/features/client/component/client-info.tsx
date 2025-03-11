import ChangePassword from "@/features/auth/components/change-password";
import { IUser } from "@/types";
import UpdateClientProfile from "./update-client-profile";
import { useAuthContext } from "@/providers/auth-provider";
import { useParams } from "react-router-dom";

const ClientIno = ({ profileInfo }: { profileInfo: IUser }) => {
  const { user } = useAuthContext();
  const { id } = useParams();

  const isMyProfile = user && user.id === Number(id);
  return (
    <>
      {" "}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-medium">
          {isMyProfile ? "My Profile" : "Client Profile"}
        </h3>
      </div>
      <div className=" items-start justify-between grid grid-cols-2 mt-2">
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
        {user && profileInfo.id === user.id && (
          <div className="flex flex-col gap-2 items-center ">
            <UpdateClientProfile oldDetalil={profileInfo} />
            <ChangePassword />
          </div>
        )}
        <div></div>
      </div>
    </>
  );
};

export default ClientIno;
