import { env } from "@/config/env";
import Axios, { InternalAxiosRequestConfig } from "axios";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = localStorage.getItem("token");
  if (config.headers) {
    config.headers.Accept = "application/json";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}

export const api = Axios.create({
  baseURL: `${env.VITE_APP_BASE_URL}/api`,
});

api.interceptors.request.use(authRequestInterceptor);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    return Promise.reject({
      message,
    });
  }
);
