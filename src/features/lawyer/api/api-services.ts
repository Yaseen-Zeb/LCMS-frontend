import { api } from "@/lib/api-client";
import { IApiBaseResponse, IBid, ICase, IUser } from "@/types";
import { ILawyerUpdateProfileForm } from "./schema";

export const getLawyers = (): Promise<{
  data: IUser[];
}> => {
  return api.get(`/user/lawyer/list`);
};

export const getLawyerProfile = (
  id: number
): Promise<{
  data: {
    lawyerInfo: IUser;
    cases: { completedCases: ICase[]; pendingCases: ICase[] };
    bids: IBid[];
  };
}> => {
  return api.get(`/user/lawyer/profile/${id}`);
};

export const lawyerUpdateProfile = (
  data: ILawyerUpdateProfileForm
): Promise<IApiBaseResponse & {data:{token:string}}> => {
  return api.put(`/user/lawyer/profile/update`, data);
};
