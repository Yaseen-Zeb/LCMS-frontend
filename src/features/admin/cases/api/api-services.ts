import { api } from "@/lib/api-client";
import { ICase } from "@/types";

export const getCases = (): Promise<{
  data: ICase[];
}> => {
  return api.get(`/case/list`);
};
