import { logo } from "@/assets";
import { CircleUserRound, LogIn, LogOut, Smile, UserRound } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuthContext } from "@/providers/auth-provider";
import { Separator } from "../ui/separator";
import { env } from "@/config/env";
import { Button } from "../ui/button";

const NavBar = () => {
  const { user, logout, requireAuth } = useAuthContext();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full bg-nav text-base  text-white">
      <div className="container flex  items-center justify-between mx-auto py-3">
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto "
          id="navbar-sticky"
        >
          <Link
            to={user?.role === "admin" ? "/admin/dashboard" : "/"}
            className="flex items-center space-x-1 mr-12"
          >
            <img src={logo} className="h-[36px]" alt="Flowbite Logo" />

            <span className="self-center text-2xl text-yellow-400  font-bold whitespace-nowrap dark:text-white">
              {user?.role !== "admin" ? "LEGSER" : "ADMIN"}
            </span>
          </Link>
        </div>

        <ul className="flex flex-col p-4 md:p-0 mt-4  md:space-x-2 md:flex-row md:mt-0 md:border-0 ">
          {user?.role !== "admin" && (
            <>
              <NavLink
                to={"/"}
                className="font-medium h-10  hover:bg-primary transition-all duration-150  p-2 py-1 rounded-sm flex items-center self-center   whitespace-nowrap dark:text-white"
              >
                <li>Home</li>
              </NavLink>
              <NavLink
                to={"/case/list"}
                className="font-medium h-10 hover:bg-primary transition-all duration-150  p-2 py-1 rounded-sm flex items-center self-center   whitespace-nowrap dark:text-white"
              >
                <li>Legal Cases</li>
              </NavLink>
              <NavLink
                to={"/lawyer/list"}
                className="font-medium h-10 hover:bg-primary transition-all duration-150  p-2 py-1 rounded-sm flex items-center self-center   whitespace-nowrap dark:text-white"
              >
                <li>Lawyers</li>
              </NavLink>
            </>
          )}

          {user && user.role !== "admin" && (
            <NavLink
              to={"/chat"}
              className="font-medium h-10 hover:bg-primary transition-all duration-150  p-2 py-1 rounded-sm flex items-center self-center   whitespace-nowrap dark:text-white"
            >
              <span>Chat</span>
            </NavLink>
          )}

          {user?.role !== "admin" && (
            <>
              <NavLink
                to={"/about-us"}
                className="font-medium h-10 hover:bg-primary transition-all duration-150  p-2 py-1 rounded-sm flex items-center self-center   whitespace-nowrap dark:text-white"
              >
                <li>About Us</li>
              </NavLink>

              <NavLink
                to={"/contact-us"}
                className="font-medium h-10 hover:bg-primary transition-all duration-150  p-2 py-1 rounded-sm flex items-center self-center   whitespace-nowrap dark:text-white"
              >
                <li>Contact Us</li>
              </NavLink>
            </>
          )}

          {user?.role === "admin" ? (
            <>
              <NavLink
                to={"/admin/dashboard"}
                className="font-medium h-10 hover:bg-primary transition-all duration-150  p-2 py-1 rounded-sm flex items-center self-center   whitespace-nowrap dark:text-white"
              >
                <li>Dashboard</li>
              </NavLink>
              <NavLink
                to={"/admin/lawyers"}
                className="font-medium h-10 hover:bg-primary transition-all duration-150  p-2 py-1 rounded-sm flex items-center self-center   whitespace-nowrap dark:text-white"
              >
                <li>Lawyers</li>
              </NavLink>
              <NavLink
                to={"/admin/clients"}
                className="font-medium h-10 hover:bg-primary transition-all duration-150  p-2 py-1 rounded-sm flex items-center self-center   whitespace-nowrap dark:text-white"
              >
                <li>Clients</li>
              </NavLink>
              <NavLink
                to={"/admin/cases"}
                className="font-medium h-10 hover:bg-primary transition-all duration-150  p-2 py-1 rounded-sm flex items-center self-center   whitespace-nowrap dark:text-white"
              >
                <li>Cases</li>
              </NavLink>
              <NavLink
                to={"/admin/feedback-queries"}
                className="font-medium h-10 hover:bg-primary transition-all duration-150  p-2 py-1 rounded-sm flex items-center self-center   whitespace-nowrap dark:text-white"
              >
                <li>Feedback & Queries</li>
              </NavLink>
            </>
          ) : (
            <></>
          )}
        </ul>

        {user?.role !== "admin" ? (
          <div className="flex md:order-2 space-x-4 md:space-x-5 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-1 cursor-pointer">
                  {user?.profile_picture ? (
                    <div className="w-9 h-9">
                      <img
                        src={`${env.VITE_APP_BASE_URL}/${user.profile_picture}`}
                        alt="Profile Picture"
                        className="w-full h-full rounded-full border"
                      />
                    </div>
                  ) : (
                    <CircleUserRound size={33} />
                  )}

                  {user && (
                    <div className="flex flex-col">
                      <span className="text-xs capitalize">
                        {user?.name
                          ? user.name.substring(0, 5) +
                            (user.name.length > 5 ? "..." : "")
                          : ""}
                      </span>

                      <Separator />
                      <span className="text-xs capitalize">{user?.role}</span>
                    </div>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 absolute top-2 left-[-127px]">
                {user ? (
                  <>
                    <Link to={`/${user.role}/profile/${user.id}`}>
                      <DropdownMenuItem className="cursor-pointer text-primary">
                        <div className="flex gap-1">
                          <UserRound size={18} /> <span>Profile Details</span>
                        </div>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                      className="text-red-500 cursor-pointer"
                    >
                      <LogOut size={18} /> Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <p className="text-primary flex px-2 py-1.5 text-sm [&>svg]:size-4 [&>svg]:shrink-0 gap-1 pl-8 items-center">
                      <Smile /> Welcome!
                    </p>
                    <DropdownMenuItem
                      onClick={() => requireAuth()}
                      className="cursor-pointer text-primary"
                    >
                      <LogIn /> Login / SignUp
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div>
            <Button
              variant={"outline"}
              className="bg-transparent"
              onClick={() => {
                logout();
                navigate("/admin/login");
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
