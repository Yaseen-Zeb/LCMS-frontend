import { Badge } from "../ui/badge";

const Status = ({ status }: { status: string }) => {
  console.log(status);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-green-200 text-green-600";
      case "closed":
        return "bg-red-200 text-red-600";
      case "hourly":
        return "bg-orange-200 text-orange-600";
      case "fixed":
        return "bg-yellow-200 text-yellow-600";
      case "standard":
        return "bg-blue-200 text-blue-600";
      case "priority":
        return "bg-orange-200 text-orange-600";
      case "inactive":
        return "bg-red-200 text-red-600";
      case "urgent":
        return "bg-red-200 text-red-600";
      case "active":
        return "bg-green-200 text-green-600";
      case "not_seen":
        return "bg-orange-200 text-orange-600";
      case "seen":
        return "bg-blue-200 text-blue-600";
      case "ongoing":
        return "bg-green-200 text-green-600";
      case "accepted":
        return "bg-green-200 text-green-600";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  return (
    <Badge
      className={`${getStatusColor(
        status
      )} font-medium min-w-[76px] capitalize justify-center`}
    >
      {status.split("_").join(" ")}
    </Badge>
  );
};

export default Status;
