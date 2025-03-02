import { api } from "@/lib/api-client";
import { IApiBaseResponse, IBid, IUser } from "@/types";

export const getLawyers = (): Promise<{
  data: IUser[];
}> => {
  return api.get(`/lawyer/list`);
};

export const getLawyerDetail = (
  id: number
): Promise<{
  data: IUser;
}> => {
  return api.get(`/lawyer/profile/${id}`);
};

export const getMyBids = (): Promise<{
  data: (IBid & { case: { id: number; title: string } })[];
}> => {
  return api.get(`/bid/my-bids`);
};

export const lawyerUpdateProfile = (
  data: Omit<IUser, "id" | "createdAt" | "updatedAt">
): Promise<IApiBaseResponse> => {
  return api.put(`/lawyer/profile/update`, data);
};
