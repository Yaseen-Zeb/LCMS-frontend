import { useState } from "react";
import { logo } from "@/assets";
import {
  CircleUserRound,
  LogIn,
  LogOut,
  Menu,
  Smile,
  UserRound,
  X,
} from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdmin = user?.role === "admin";

  const navLinks = !isAdmin
    ? [
        { to: "/", label: "Home" },
        { to: "/case/list", label: "Legal Cases" },
        { to: "/lawyer/list", label: "Lawyers" },
        { to: "/chat", label: "Chat", show: !!user },
        { to: "/about-us", label: "About Us" },
        { to: "/contact-us", label: "Contact Us" },
      ]
    : [
        { to: "/admin/dashboard", label: "Dashboard" },
        { to: "/admin/lawyers", label: "Lawyers" },
        { to: "/admin/clients", label: "Clients" },
        { to: "/admin/cases", label: "Cases" },
        { to: "/admin/feedback-queries", label: "Feedback & Queries" },
      ];

  return (
    <nav className="sticky top-0 z-30 w-full bg-nav text-white text-base">
      <div className="container mx-auto py-3 px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to={isAdmin ? "/admin/dashboard" : "/"}
          className="flex items-center space-x-2"
        >
          <img src={logo} className="h-9" alt="Logo" />
          <span className="text-2xl font-bold text-yellow-400">
            {isAdmin ? "ADMIN" : "LEGSER"}
          </span>
        </Link>

        {/* Hamburger (Mobile Only) */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`${
            menuOpen ? "flex" : "hidden"
          } flex-col md:flex md:flex-row md:items-center md:space-x-3 gap-2 md:gap-0 absolute md:static top-[64px] left-0 w-full md:w-auto bg-nav md:bg-transparent px-6 py-4 md:p-0 transition-all`}
        >
          {navLinks
            .filter((link) => link.show === undefined || link.show)
            .map((link, idx) => (
              <NavLink
                key={idx}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="font-medium h-10 hover:bg-primary transition-all duration-150 px-3 py-1 rounded-sm flex items-center whitespace-nowrap"
              >
                <li>{link.label}</li>
              </NavLink>
            ))}
        </ul>

        {/* Profile or Auth Actions */}
        {!isAdmin ? (
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  {user?.profile_picture ? (
                    <div className="w-9 h-9">
                      <img
                        src={`${env.VITE_APP_BASE_URL}/${user.profile_picture}`}
                        alt="Profile"
                        className="w-full h-full rounded-full border"
                      />
                    </div>
                  ) : (
                    <CircleUserRound size={33} />
                  )}

                  {user && (
                    <div className="flex flex-col">
                      <span className="text-xs capitalize">
                        {user?.name?.substring(0, 5)}
                        {user?.name?.length > 5 ? "..." : ""}
                      </span>
                      <Separator />
                      <span className="text-xs capitalize">{user?.role}</span>
                    </div>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 mt-2">
                {user ? (
                  <>
                    <Link to={`/${user.role}/profile/${user.id}`}>
                      <DropdownMenuItem className="text-primary cursor-pointer">
                        <UserRound size={18} /> Profile Details
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
                    <p className="text-primary px-4 py-1 text-sm flex gap-2 items-center">
                      <Smile /> Welcome!
                    </p>
                    <DropdownMenuItem
                      onClick={requireAuth}
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
          <Button
            variant="outline"
            className="hidden md:block bg-transparent"
            onClick={() => {
              logout();
              navigate("/admin/login");
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
