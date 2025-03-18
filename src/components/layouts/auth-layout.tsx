import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex justify-center items-center h-lvh">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
