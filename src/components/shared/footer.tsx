import { logo } from "@/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-nav text-white">
      <div className="w-full max-w-screen-xl mx-auto px-4 py-6 sm:px-6 md:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Logo + Title */}
          <Link to="/" className="flex items-center text-yellow-400 gap-2">
            <img src={logo} className="h-8" alt="Logo" />
            <span className="text-2xl font-semibold whitespace-nowrap">
              LEGSER
            </span>
          </Link>

          {/* Footer Links */}
          <ul className="flex flex-wrap justify-center sm:justify-end items-center gap-4 text-sm font-medium">
            <li>
              <Link to="/about-us" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:underline">
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

        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        <span className="block text-sm text-center">
          © 2025 All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
