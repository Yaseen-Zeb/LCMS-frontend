import { api } from "@/lib/api-client";
import { IApiBaseResponse, IBid, ICase, IUser } from "@/types";

export const getClientProfile = (
  id: number
): Promise<{
  data: { clientInfo: IUser; cases: ICase[]; bids: IBid[] };
}> => {
  return api.get(`/user/client/profile/${id}`);
};

export const getProfileDetail = (): Promise<{}> => {
  return api.get(`/user/client/profile`);
};

export const clientUpdateProfile = (
  data: Omit<IUser, "id" | "createdAt" | "updatedAt" |"status">
): Promise<IApiBaseResponse> => {
  return api.put(`/user/client/profile/update`, data);
};
