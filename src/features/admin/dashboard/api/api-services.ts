import { api } from "@/lib/api-client";

export const getDashboardData = (): Promise<{
  data: {
    verifiedLawyers: number;
    unVerifiedLawyers: number;
    totalClients: number;
    openCases: number;
    ongoingCases: number;
    closedCases: number;
  };
}> => {
  return api.get(`/user/get-dashboard-data`);
};
