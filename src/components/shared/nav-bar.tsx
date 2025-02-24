import { logo } from "@/assets";
import {
  Bell,
  CircleUserRound,
  LogIn,
  LogOut,
  Smile,
  UserRound,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuthContext } from "@/providers/auth-provider";

const NavBar = () => {
  const { user, logout, requireAuth } = useAuthContext();

  console.log(user);

  return (
    <nav className="sticky top-0 z-50 w-full bg-nav text-base  text-white">
      <div className="container flex  items-center justify-between mx-auto py-3">
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto "
          id="navbar-sticky"
        >
          <Link to={"/"} className="flex items-center space-x-1 mr-12">
            <img src={logo} className="h-[36px]" alt="Flowbite Logo" />
            <span className="self-center text-2xl text-yellow-400  font-bold whitespace-nowrap dark:text-white">
              LCMS
            </span>
          </Link>
        </div>

        <ul className="flex flex-col p-4 md:p-0 mt-4  md:space-x-2 md:flex-row md:mt-0 md:border-0 ">
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
          <NavLink
            to={"./funding-programs"}
            className="font-medium h-10 hover:bg-primary transition-all duration-150  p-2 py-1 rounded-sm flex items-center self-center   whitespace-nowrap dark:text-white"
          >
            <li>About Us</li>
          </NavLink>
          <NavLink
            to={"./faq"}
            className="font-medium h-10 hover:bg-primary transition-all duration-150  p-2 py-1 rounded-sm flex items-center self-center   whitespace-nowrap dark:text-white"
          >
            <li>Contact Us</li>
          </NavLink>
          <NavLink
            to={"./faq"}
            className="font-medium h-10 hover:bg-primary transition-all duration-150  p-2 py-1 rounded-sm flex items-center self-center   whitespace-nowrap dark:text-white"
          >
            <li>FAQ</li>
          </NavLink>
        </ul>

        <div className="flex md:order-2 space-x-4 md:space-x-5 items-center">
          <Bell className="cursor-pointer" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-1 cursor-pointer">
                <CircleUserRound size={33} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 absolute top-2 left-[-127px]">
              {user ? (
                <>
                  <Link to={"/profile"}>
                    <DropdownMenuItem className="cursor-pointer text-primary">
                      <UserRound /> Profile Details
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    onClick={() => logout()}
                    className="text-red-500 cursor-pointer"
                  >
                    <LogOut className="rotate-180" /> Logout
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
      </div>
    </nav>
  );
};

export default NavBar;
