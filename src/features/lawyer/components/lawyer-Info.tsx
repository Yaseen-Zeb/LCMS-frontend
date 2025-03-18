import ChangePassword from "@/features/auth/components/change-password";
import UpdateProfile from "./update-lawyer-profile";
import { IUser } from "@/types";
import { useAuthContext } from "@/providers/auth-provider";
import { useParams } from "react-router-dom";

const LawyerInfo = ({ lawyerInfo }: { lawyerInfo: IUser }) => {
  const { user } = useAuthContext();
  const { id } = useParams();

  const isMyProfile = user && user.id === Number(id);
  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-medium">
          {isMyProfile ? "My Profile" : "Lawyer Profile"}
        </h3>
      </div>
      <div className="items-start justify-between grid grid-cols-3 mt-2">
        <div className="flex flex-col gap-3 col-span-2">
          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Name:</p>
            <p className="text-sm font-medium px-1">{lawyerInfo?.name}</p>
          </div>
          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Email:</p>
            <p className="text-sm font-medium px-1">{lawyerInfo?.email}</p>
          </div>
          {isMyProfile && <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Phone no:</p>
            <p className="text-sm font-medium px-1">
              {lawyerInfo?.phone_number}
            </p>
          </div>}
          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">
              Specializations:
            </p>
            <p className="text-sm font-medium px-1 flex flex-wrap gap-1 mt-1">
              {lawyerInfo?.specialization?.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full"
                >
                  {tag}
                </span>
              ))}
            </p>
          </div>
          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Experience:</p>
            <p className="text-sm font-medium px-1">
              {lawyerInfo?.experience + " Years"}
            </p>
          </div>
          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Address:</p>
            <p className="text-sm font-medium px-1">{lawyerInfo?.address}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center col-span-1">
          {isMyProfile && (
            <>
              {" "}
              <UpdateProfile oldDetalil={lawyerInfo} />
              <ChangePassword />
            </>
          )}
        </div>
        <div></div>
      </div>
    </>
  );
};

export default LawyerInfo;
