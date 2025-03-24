import ChangePassword from "@/features/auth/components/change-password";
import UpdateProfile from "./update-lawyer-profile";
import { IUser } from "@/types";
import { useAuthContext } from "@/providers/auth-provider";
import { useParams } from "react-router-dom";

const LawyerInfo = ({ lawyerInfo }: { lawyerInfo: IUser }) => {
  const { user } = useAuthContext();
  const { id } = useParams();

  const isMyProfile = user && user.id === Number(id);

  const getValue = (val?: string | number | null) => (val ? val : "N/A");

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-medium">
          {isMyProfile ? "My Profile" : "Lawyer Profile"}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="flex flex-col gap-3 col-span-2">
          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Name:</p>
            <p className="text-sm font-medium px-1">
              {getValue(lawyerInfo?.name)}
            </p>
          </div>

          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Email:</p>
            <p className="text-sm font-medium px-1">
              {getValue(lawyerInfo?.email)}
            </p>
          </div>

          {isMyProfile && (
            <div className="px-2">
              <p className="text-sm font-medium text-gray-500">Phone no:</p>
              <p className="text-sm font-medium px-1">
                {getValue(lawyerInfo?.phone_number)}
              </p>
            </div>
          )}

          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">CNIC:</p>
            <p className="text-sm font-medium px-1">
              {getValue(lawyerInfo?.cnic)}
            </p>
          </div>

          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Gender:</p>
            <p className="text-sm font-medium px-1">
              {getValue(lawyerInfo?.gender)}
            </p>
          </div>

          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">
              Languages Spoken:
            </p>
            <p className="text-sm font-medium px-1">
              {getValue(lawyerInfo?.languages_spoken)}
            </p>
          </div>

          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">
              Specializations:
            </p>
            <div className="flex flex-wrap gap-1 mt-1">
              {lawyerInfo?.specialization &&
              lawyerInfo?.specialization?.length > 0 ? (
                lawyerInfo.specialization.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span>N/A</span>
              )}
            </div>
          </div>

          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Experience:</p>
            <p className="text-sm font-medium px-1">
              {lawyerInfo?.experience
                ? `${lawyerInfo.experience} Years`
                : "N/A"}
            </p>
          </div>

          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">
              Website / Social Media:
            </p>
            <p className="text-sm font-medium px-1">
              {lawyerInfo?.website_or_social ? (
                <a
                  href={lawyerInfo.website_or_social}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {lawyerInfo.website_or_social}
                </a>
              ) : (
                "N/A"
              )}
            </p>
          </div>

          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Bio:</p>
            <p className="text-sm font-medium px-1 whitespace-pre-line">
              {getValue(lawyerInfo?.bio)}
            </p>
          </div>

          <div className="px-2">
            <p className="text-sm font-medium text-gray-500">Address:</p>
            <p className="text-sm font-medium px-1">
              {getValue(lawyerInfo?.address)}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:items-center md:col-span-1 w-full">
          {isMyProfile && (
            <>
              <div className="w-full md:w-auto">
                <UpdateProfile oldDetalil={lawyerInfo} />
              </div>
              <div className="w-full md:w-auto">
                <ChangePassword />
              </div>
            </>
          )}
        </div>

        <div></div>
      </div>
    </>
  );
};

export default LawyerInfo;
