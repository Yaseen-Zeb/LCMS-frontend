import { api } from "@/lib/api-client";
import { IApiBaseResponse, IUser } from "@/types";

export const getClients = (): Promise<{
  data: IUser[];
}> => {
  return api.get(`/user/client/list`);
};

export const changeStatus = (data: {
  status: boolean;
  userId: number;
}): Promise<{
  data: IApiBaseResponse
}> => {
  return api.put(`/user/change-status`, data);
};
