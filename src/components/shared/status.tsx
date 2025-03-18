import { Badge } from "../ui/badge";

const Status = ({ status }: { status: string }) => {
  console.log(status);
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-green-400";
      case "closed":
        return "bg-red-400";
      case "hourly":
        return "bg-orange-400";
      case "fixed":
        return "bg-yellow-400";
      case "standard":
        return "bg-blue-400";
      case "priority":
        return "bg-orange-400";
      case "inactive":
        return "bg-red-400";
      case "urgent":
        return "bg-red-400";
      case "active":
        return "bg-green-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <Badge
      className={`${getStatusColor(
        status
      )} font-medium min-w-[76px] capitalize justify-center`}
    >
      {status}
    </Badge>
  );
};

export default Status;
