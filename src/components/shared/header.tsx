import { banner } from "@/assets";
import { Button } from "../ui/button";
import { useAuthContext } from "@/providers/auth-provider";
import { Link } from "react-router-dom";
import CaseForm from "@/features/case/components/case-form";

const Header = () => {
  const { user, requireAuth } = useAuthContext();

  return (
    <div
      className="relative w-full h-[280px] sm:h-[320px] md:h-[360px] bg-cover bg-center shadow-lg flex items-center"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="px-4 sm:px-10 lg:px-24 max-w-2xl text-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
          Welcome!
        </h1>
        <p className="text-sm sm:text-base leading-relaxed">
          We prioritize transparency, delivering excellence and high-quality
          solutions. Our focus on trust and security ensures the confidentiality
          and protection of your sensitive data.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          {user ? (
            user.role === "client" ? (
              <CaseForm action="add" />
            ) : (
              <Link to="/case/list">
                <Button className="!w-fit">Explore Cases</Button>
              </Link>
            )
          ) : (
            <>
              <Button className="w-fit" onClick={() => requireAuth()}>
                Post Case
              </Button>
              <Link to="/case/list">
                <Button variant="outline" className=" w-fit">
                  Explore Cases
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
