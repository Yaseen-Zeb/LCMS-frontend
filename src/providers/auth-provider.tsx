import AuthDialog from "@/features/auth/components/auth-dialog";
import { IContext, IContextUser } from "@/types";
import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext<IContext | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IContextUser | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // ✅ Load token from localStorage and decode it to set user details
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedUser = jwtDecode<IContextUser>(token); // Decode JWT token
        setUser(decodedUser);
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  const initializeAuth = () => {
    const token = localStorage.getItem("token") || "";
    localStorage.setItem("token", token);
    try {
      const decodedUser = jwtDecode<IContextUser>(token);
      setUser(decodedUser);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  // ✅ Logout: Remove token and reset user state
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    toast.success("Logout successful");
    return <Navigate to={"/sign-in"} />;
  };

  // ✅ Show login modal if authentication is required
  const requireAuth = () => {
    if (!user) {
      setShowLoginModal(true);
    }
  };

  return (
    <AuthContext.Provider value={{ user, initializeAuth, logout, requireAuth }}>
      {children}
      <AuthDialog isOpen={showLoginModal} setIsOpen={setShowLoginModal} />
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook to Use Auth Context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
