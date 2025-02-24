import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <Button variant="outline" className="h-8" onClick={() => navigate(-1)}>
      <ArrowLeft/> Go Back
    </Button>
  );
};

export default GoBackButton;
