import { api } from "@/lib/api-client";
import { IApiBaseResponse } from "@/types";

export const updateProfileImage = (data: FormData): Promise<IApiBaseResponse> => {
    return api.put(`/user/update-profile-image`, data);
  };