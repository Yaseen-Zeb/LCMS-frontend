import { api } from "@/lib/api-client";
import { IApiBaseResponse, IUser } from "@/types";

export const getLawyers = (): Promise<{
  data: IUser[];
}> => {
  return api.get(`/user/admin/lawyer/list`);
};

export const changeStatus = (data: {
  status: boolean;
  userId: number;
}): Promise<{
  data: IApiBaseResponse;
}> => {
  return api.put(`/user/change-status`, data);
};
