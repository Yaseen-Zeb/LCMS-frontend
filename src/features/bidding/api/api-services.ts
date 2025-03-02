import { api } from "@/lib/api-client";
import { IApiBaseResponse } from "@/types";
import { IBiddingForm } from "./schema";

export const bid = (
  data: IBiddingForm & {caseId:number}
): Promise<IApiBaseResponse & {data:{ token: string }}> => {
  return api.post("/bid/create", data);
};



