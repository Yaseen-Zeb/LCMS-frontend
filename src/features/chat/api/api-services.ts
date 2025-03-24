import { api } from "@/lib/api-client";
import { IApiBaseResponse, IMessage, IUser } from "@/types";

export const getPartners = (): Promise<{
  data: (IUser &
    {
      cases: { id: number; title: string,status:string }[];
    })[];
}> => {
  return api.get(`/chat/partners`);
};

export const getMessages = (
  id: number
): Promise<{
  data: IMessage[];
}> => {
  return api.get(`/chat?partnerId=${id}`);
};

export const sendMessage = (data: {
  senderId: number;
  receiverId: number;
  message: string;
}): Promise<IApiBaseResponse> => {
  return api.post(`/chat/send-message`, data);
};

export const deleteForMe = (data: {
  messageId: number;
  userId: number;
}): Promise<IApiBaseResponse> => {
  return api.delete(`/chat/message/delete-for-me`, { data });
};

export const deleteForEveryOne = (data: {
  messageId: number;
}): Promise<IApiBaseResponse> => {
  return api.delete(`/chat/message/delete-for-everyone`, { data });
};

export const submitReview = (data: {
  lawyer_id: number;
  case_id: number;
  message: string;
}): Promise<IApiBaseResponse> => {
  return api.post(`/review/submit`, data);
};
