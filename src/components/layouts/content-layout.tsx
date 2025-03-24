import { Outlet } from "react-router-dom";
import NavBar from "../shared/nav-bar";

const ContentLayout = () => {
  return (
    <div className="flex min-h-screen flex-col text-gray-800">
      <NavBar />
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ContentLayout;
