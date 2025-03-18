import ChangePassword from "@/features/auth/components/change-password";
import { IUser } from "@/types";
import UpdateClientProfile from "./update-client-profile";
import { useAuthContext } from "@/providers/auth-provider";
import { useParams } from "react-router-dom";

const ClientIno = ({ clientInfo }: { clientInfo: IUser }) => {
  const { user } = useAuthContext();
  const { id } = useParams();

  const isMyProfile = user && user.id === Number(id);
  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-medium">
          {isMyProfile ? "My Profile" : "Client Profile"}
        </h3>
      </div>
      <div className="items-start justify-between grid grid-cols-3 mt-2">
        <div className="flex flex-col gap-3 col-span-2">
          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Name:</p>
            <p className="text-sm font-medium px-1">{clientInfo?.name}</p>
          </div>
          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Email:</p>
            <p className="text-sm font-medium px-1">{clientInfo?.email}</p>
          </div>
          {isMyProfile && (
            <div className="px-2">
              <p className="text-sm font-medium text-gray-500">Phone no:</p>
              <p className="text-sm font-medium px-1">
                {clientInfo?.phone_number}
              </p>
            </div>
          )}
          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Address:</p>
            <p className="text-sm font-medium px-1">{clientInfo?.address}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center col-span-1">
          {isMyProfile && (
            <>
              <UpdateClientProfile oldDetalil={clientInfo} />
              <ChangePassword />
            </>
          )}
        </div>

        <div></div>
      </div>
    </>
  );
};

export default ClientIno;
