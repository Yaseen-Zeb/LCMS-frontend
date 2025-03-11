import { useGetLawyerDetail } from "../api/api-queries";
// import { useAuthContext } from "@/providers/auth-provider";
import Loader from "@/components/ui/loader";
import ApiResponseError from "@/components/shared/api-response-error";
import ChangePassword from "@/features/auth/components/change-password";
import UpdateProfile from "./update-lawyer-profile";
import { useParams } from "react-router-dom";

const LawyerInfo = () => {
  // const { user } = useAuthContext();
  const {id} = useParams()
  const {
    data: lawyerDetail,
    isLoading: isLawyerDetailLoading,
    isError: isLawyerDetailError,
  } = useGetLawyerDetail(Number(id || 0));

  if (isLawyerDetailLoading) {
    return <Loader />;
  }

  if (isLawyerDetailError) {
    return <ApiResponseError />;
  }

  return (
    <div className=" items-start justify-between grid grid-cols-3">
      <div className="flex flex-col gap-3">
        <div className="px-2">
          <p className="text-sm font-medium text-gray-500">Name:</p>
          <p className="text-sm font-medium px-1">{lawyerDetail?.data.name}</p>
        </div>
        <div className="px-2">
          <p className="text-sm font-medium text-gray-500">Email:</p>
          <p className="text-sm font-medium px-1">{lawyerDetail?.data.email}</p>
        </div>
        <div className="px-2">
          <p className="text-sm font-medium text-gray-500">Phone no:</p>
          <p className="text-sm font-medium px-1">
            {lawyerDetail?.data.phone_number}
          </p>
        </div>
        <div className="px-2">
          <p className="text-sm font-medium text-gray-500">Specializations:</p>
          <p className="text-sm font-medium px-1">
            {lawyerDetail?.data.specialization}
          </p>
        </div>
        <div className="px-2">
          <p className="text-sm font-medium text-gray-500">Experience:</p>
          <p className="text-sm font-medium px-1">
            {lawyerDetail?.data.experience + " Years"}
          </p>
        </div>
        <div className="px-2">
          <p className="text-sm font-medium text-gray-500">Address:</p>
          <p className="text-sm font-medium px-1">
            {lawyerDetail?.data.address}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center mt-12">
        <UpdateProfile oldDetalil={lawyerDetail?.data} />
        <ChangePassword />
      </div>
      <div></div>
    </div>
  );
};

export default LawyerInfo;
