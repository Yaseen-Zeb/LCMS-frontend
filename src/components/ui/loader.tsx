import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center my-10">
      <HashLoader color="#007bff" size={30} speedMultiplier={1.5} />
    </div>
  );
};

export default Loader;
