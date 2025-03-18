import { useAuthContext } from "@/providers/auth-provider";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface OnlyAdminWrapperProps {
  children: ReactNode;
}

const OnlyAdminWrapper: React.FC<OnlyAdminWrapperProps> = ({ children }) => {
  const { user } = useAuthContext();

  if (user && user?.role != "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default OnlyAdminWrapper;
