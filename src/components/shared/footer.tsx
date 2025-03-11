import { logo } from "@/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-nav text-white">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to={"/"}
            className="flex text-yellow-400 items-center mb-4 sm:mb-0  rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
            LEGSER
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium  sm:mb-0">
            <li>
              <Link to="/about-us" className="hover:underline me-4 md:me-6">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-4" />
        <span className="block text-sm  sm:text-center">
          © 2025 All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
