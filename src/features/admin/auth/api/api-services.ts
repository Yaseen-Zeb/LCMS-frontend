import { api } from "@/lib/api-client";
import { IApiBaseResponse } from "@/types";
import { ILoginForm } from "./schema";

export const signIn = (
  data: ILoginForm
): Promise<IApiBaseResponse & { data: { token: string } }> => {
  return api.post("/auth/login", { ...data, role: "admin" });
};
