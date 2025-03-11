import AuthDialog from "@/features/auth/components/auth-dialog";
import { IContext, IContextUser } from "@/types";
import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import BiddingForm from "@/features/bidding/components/bidding-form";

const AuthContext = createContext<IContext | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IContextUser | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidCaseId, setBidCaseId] = useState<number | null>(null);


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

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    toast.success("Logout successful");
  };


  const requireAuth = () => {
    if (!user) {
      setShowLoginModal(true);
    }
  };
  const handleBidAuthModal = (id: number) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
  
    setBidCaseId(id);
    setShowBidModal(true);
  };
  

  return (
    <AuthContext.Provider value={{ user, initializeAuth, logout, requireAuth, handleBidAuthModal,bidCaseId }}>
      {children}
      <AuthDialog
        isAuthDialogOpen={showLoginModal}
        setIsAuthDialogOpen={setShowLoginModal}
      />
      <BiddingForm
        isBidFormOpen={showBidModal}
        setIsBidFormOpen={setShowBidModal}
      />
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
