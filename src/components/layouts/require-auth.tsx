import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/providers/auth-provider";
import { IROLE } from "@/types";
import { useEffect, useState } from "react";

type RequireAuthProps = {
  permittedRoles: IROLE[];
  children: React.ReactNode;
};

const RequireAuth = ({ permittedRoles, children }: RequireAuthProps) => {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!permittedRoles.includes(user.role as IROLE)) {
    return <Navigate to="/page-not-found" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
