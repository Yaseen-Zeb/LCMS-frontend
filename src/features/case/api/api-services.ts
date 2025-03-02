import { api } from "@/lib/api-client";
import { IApiBaseResponse, ICase } from "@/types";
import { ICaseForm } from "./schema";

export const getCases = (): Promise<{
  data: ICase[];
}> => {
  return api.get(`/case/list`);
};

export const getCaseDetail = (
  id: number
): Promise<{
  data: ICase & { client: { id: number; name: string } };
}> => {
  return api.get(`/case/detail/${id}`);
};

export const getMyCases = (): Promise<{
  data: ICase[];
}> => {
  return api.get(`/case/my-cases`);
};

export const addCase = (
  data: ICaseForm & { client_id: number }
): Promise<IApiBaseResponse> => {
  return api.post("/case/create", data);
};
