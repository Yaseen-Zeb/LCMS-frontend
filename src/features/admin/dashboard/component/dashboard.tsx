import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Legend } from "recharts";
import { useGetDashboardData } from "../api/api-queries";
import Loader from "@/components/ui/loader";
import ApiResponseError from "@/components/shared/api-response-error";

const Dashboard = () => {
  const { data, isLoading, isError, error } = useGetDashboardData();
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ApiResponseError msg={(error as Error).message} />;
  }

  const lawyerData = [
    {
      name: "Verified",
      value: data?.data.verifiedLawyers,
      fill: "#4CAF50",
    },
    {
      name: "Unverified",
      value: data?.data.unVerifiedLawyers,
      fill: "#f2b141",
    },
  ];

  const caseData = [
    { name: "Open", value: data?.data.openCases, fill: "#4CAF50" },
    { name: "Pending", value: data?.data.ongoingCases, fill: "orange" },
    { name: "Closed", value: data?.data.closedCases, fill: "#9C27B0" },
  ];

  return (
    <>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="shadow-sm bg-white rounded-md ">
          <CardContent className="p-4 py-8 text-center">
            <p className="text-2xl font-semibold">
              {(data?.data.unVerifiedLawyers || 0) +
                (data?.data.verifiedLawyers || 0)}
            </p>
            <p className="text-gray-500">Total Lawyers</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm bg-white rounded-md ">
          <CardContent className="p-4 py-8 text-center">
            <p className="text-2xl font-semibold">{data?.data.totalClients}</p>
            <p className="text-gray-500">Total Clients</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm bg-white rounded-md ">
          <CardContent className="p-4 py-8 text-center">
            <p className="text-2xl font-semibold">
              {(data?.data.openCases || 0) + (data?.data.closedCases || 0)}
            </p>
            <p className="text-gray-500">Total Cases</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="shadow-sm bg-white rounded-md">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Verified and Unverified Lawyers
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={lawyerData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                />
                <Tooltip />
                <Legend/>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Open vs Closed Cases Pie Chart */}
        <Card className="shadow-sm bg-white rounded-md">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Open and Closed Cases
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={caseData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
