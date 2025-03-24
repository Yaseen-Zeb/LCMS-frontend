import { api } from "@/lib/api-client";
import { IApiBaseResponse, IBid, ICase, IUser } from "@/types";
import { IClientUpdateProfileForm } from "./schema";

export const getClientProfile = (
  id: number
): Promise<{
  data: {
    clientInfo: IUser;
    cases: ICase[];
    bids: (ICase & { bids: IBid[] })[];
  };
}> => {
  return api.get(`/user/client/profile/${id}`);
};

export const clientUpdateProfile = (
  data: IClientUpdateProfileForm
): Promise<IApiBaseResponse> => {
  return api.put(`/user/client/profile/update`, data);
};

export const updateBidStatus = (id: number): Promise<IApiBaseResponse> => {
  return api.put(`/bid/update-status/${id}`);
};

export const acceptBid = (data: {
  senderId: number;
  receiverId: number;
  message: string;
  caseId: number;
  bidId: number;
}): Promise<IApiBaseResponse> => {
  return api.put(`/bid/accept-bid`, data);
};
