import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "./api-services";


export const useGetDashboardData = () => {
  return useQuery({
    queryKey: ["getDashboardData"],
    queryFn: getDashboardData,
  });
};
