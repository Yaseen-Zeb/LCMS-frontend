const ApiResponseError = ({ msg }: { msg?: string }) => {
  return (
    <div className="text-center mb-8">{msg || "Some thing went wrong"}</div>
  );
};

export default ApiResponseError;
