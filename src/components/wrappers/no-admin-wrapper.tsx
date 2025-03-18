import { useAuthContext } from "@/providers/auth-provider";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface NoAdminWrapperProps {
  children: ReactNode;
}

const NoAdminWrapper: React.FC<NoAdminWrapperProps> = ({ children }) => {
  const { user } = useAuthContext();

  if (user && user?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default NoAdminWrapper;
