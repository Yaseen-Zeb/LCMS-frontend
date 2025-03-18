import { banner } from "@/assets";
import { Button } from "../ui/button";
import { useAuthContext } from "@/providers/auth-provider";
import { Link } from "react-router-dom";
import CaseForm from "@/features/case/components/case-form";

const Header = () => {
  const { user, requireAuth } = useAuthContext();
  return (
    <div
      className="relative w-full h-[280px] bg-cover bg-center flex items-center shadow-lg"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col justify-center max-w-md text-white ml-10 sm:ml-20 lg:ml-44 space-2-4">
        <h1 className="text-3xl font-bold text-yellow-400">Welcome!</h1>
        <p className="text-md">
          We prioritize transparency, delivering excellence and high-quality
          solutions. Our focus on trust and security ensures the confidentiality
          and protection of your sensitive data.
        </p>
        <div className="flex gap-4 mt-2">
          {user ? (
            user.role == "client" ? (
              <CaseForm action="add" />
            ) : (
              <Link to={"/case/list"}>
                <Button>Explore Cases</Button>
              </Link>
            )
          ) : (
            <>
              <Button onClick={() => requireAuth()}>Post Case</Button>
              <Link to={"/case/list"}>
                <Button>Explore Cases</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
