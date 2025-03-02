import { api } from "@/lib/api-client";
import { IApiBaseResponse, IROLE } from "@/types";
import {
  IChangePasswordForm,
  IClientRegisterForm,
  ILawyerRegisterForm,
  ILoginForm,
} from "./schema";

export const signIn = (
  data: ILoginForm
): Promise<IApiBaseResponse & { data: { token: string } }> => {
  return api.post("/auth/login", data);
};

export const clientSignUp = (
  data: IClientRegisterForm & { role: IROLE }
): Promise<IApiBaseResponse & { data: { token: string } }> => {
  return api.post("/auth/register", data);
};

export const lawyerSignUp = (
  data: ILawyerRegisterForm & { role: IROLE }
): Promise<IApiBaseResponse & { data: { token: string } }> => {
  return api.post("/auth/register", data);
};

export const changePassword = (
  data: IChangePasswordForm
): Promise<IApiBaseResponse> => {
  return api.post("/auth/change-password", data);
};
