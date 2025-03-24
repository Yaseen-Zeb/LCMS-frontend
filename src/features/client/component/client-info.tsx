import ChangePassword from "@/features/auth/components/change-password";
import { IUser } from "@/types";
import UpdateClientProfile from "./update-client-profile";
import { useAuthContext } from "@/providers/auth-provider";
import { useParams } from "react-router-dom";

const ClientIno = ({ clientInfo }: { clientInfo: IUser }) => {
  const { user } = useAuthContext();
  const { id } = useParams();

  const isMyProfile = user && user.id === Number(id);

  const getValue = (value?: string | number | null) => (value ? value : "N/A");

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-medium">
          {isMyProfile ? "My Profile" : "Client Profile"}
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="flex flex-col gap-3 md:col-span-2">
          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Name:</p>
            <p className="text-sm font-medium px-1">
              {getValue(clientInfo?.name)}
            </p>
          </div>
          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Email:</p>
            <p className="text-sm font-medium px-1">
              {getValue(clientInfo?.email)}
            </p>
          </div>
          {isMyProfile && (
            <div className="px-2">
              <p className="text-sm font-medium text-gray-500">Phone no:</p>
              <p className="text-sm font-medium px-1">
                {getValue(clientInfo?.phone_number)}
              </p>
            </div>
          )}
          {isMyProfile && (
            <div className="px-2">
              <p className="text-sm font-medium text-gray-500">CNIC:</p>
              <p className="text-sm font-medium px-1">
                {getValue(clientInfo?.cnic)}
              </p>
            </div>
          )}
          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Gender:</p>
            <p className="text-sm font-medium px-1">
              {getValue(clientInfo?.gender)}
            </p>
          </div>

          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">
              Languages Spoken:
            </p>
            <p className="text-sm font-medium px-1">
              {getValue(clientInfo?.languages_spoken)}
            </p>
          </div>
          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Profession:</p>
            <p className="text-sm font-medium px-1">
              {getValue(clientInfo?.profession)}
            </p>
          </div>
          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">City:</p>
            <p className="text-sm font-medium px-1">
              {getValue(clientInfo?.city)}
            </p>
          </div>
          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Address:</p>
            <p className="text-sm font-medium px-1">
              {getValue(clientInfo?.address)}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center col-span-1">
          {isMyProfile && (
            <>
              <div className="w-full md:w-auto">
                <UpdateClientProfile oldDetalil={clientInfo} />
              </div>
              <div className="w-full md:w-auto">
                <ChangePassword />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ClientIno;
