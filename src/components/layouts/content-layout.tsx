import { Outlet } from "react-router-dom";
import NavBar from "../shared/nav-bar";

const ContentLayout = () => {
  return (
    <>
      <div className="text-gray-800 flex flex-col justify-center">
        <NavBar />
        <div className="container m-auto py-8">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ContentLayout;
