import { api } from "@/lib/api-client";
import { IApiBaseResponse, IBid, ICase, IUser } from "@/types";

export const getClientProfile = (
  id: number
): Promise<{
  data: IUser & {
    cases: ICase[];
    bids: IBid[];
  };
}> => {
  return api.get(`/client/profile/${id}`);
};

export const getProfileDetail = (): Promise<{

}> => {
  return api.get(`/client/profile`);
};


export const clientUpdateProfile = (
  data: Omit<IUser, "id" | "createdAt" | "updatedAt">
): Promise<IApiBaseResponse> => {
  return api.put(`/client/profile/update`, data);
};

