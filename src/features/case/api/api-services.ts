import { api } from "@/lib/api-client";
import { IApiBaseResponse, ICase } from "@/types";
import { ICaseForm } from "./schema";


export const getCases = (): Promise<{
  data: {cases:ICase[]};
}> => {
  return api.get(`/case/list`);
};

export const getMyCases = (): Promise<{
  data: {cases:ICase[]};
}> => {
  return api.get(`/case/my-cases`);
};


export const addCase = (
  data: ICaseForm & { client_id: number }
): Promise<IApiBaseResponse> => {
  return api.post("/case/create", data);
};
