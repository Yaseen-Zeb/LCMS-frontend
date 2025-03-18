import { api } from "@/lib/api-client";
import { IApiBaseResponse } from "@/types";
import { IFeedBackForm } from "./schema";

export const addFeedback = (
  data: IFeedBackForm
): Promise<IApiBaseResponse & { data: { token: string } }> => {
  return api.post("/feedback/create", data);
};
