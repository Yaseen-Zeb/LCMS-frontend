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
  data: ICase & {
    client: { id: number; name: string; address: string; createdAt: string };
  };
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

export const updateCase = (
  data: ICaseForm & { client_id: number; case_id: number }
): Promise<IApiBaseResponse> => {
  const { case_id, ...payload } = data;
  return api.put(`/case/update/${case_id}`, payload);
};

export const deleteCase = (id: number): Promise<IApiBaseResponse> => {
  return api.delete(`/case/delete/${id}`);
};
