import { api } from "@/lib/api-client";
import { IUser } from "@/types";


export const getLawyers = (): Promise<{
  data: {lawyers:IUser[]};
}> => {
  return api.get(`/lawyer/list`);
};

