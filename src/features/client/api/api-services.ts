import { api } from "@/lib/api-client";
import { IApiBaseResponse, ICase, IUser } from "@/types";

export const getClientDetail = (
  id: number
): Promise<{
  data: IUser & {
    postedCases: number;
    closedCases: ICase[];
    openCases: ICase[];
  };
}> => {
  return api.get(`/client/profile/${id}`);
};

export const getProfileDetail = (): Promise<{
  data: IUser & {
    cases: ICase[];
  };
}> => {
  return api.get(`/client/profile`);
};


export const clientUpdateProfile = (
  data: Omit<IUser, "id" | "createdAt" | "updatedAt">
): Promise<IApiBaseResponse> => {
  return api.put(`/client/profile/update`, data);
};

