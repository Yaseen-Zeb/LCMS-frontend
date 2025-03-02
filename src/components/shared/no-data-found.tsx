const NoDataFound = ({
  text,
  className,
}: {
  className?: string;
  text?: string;
}) => {
  return (
    <div className={`text-center ${className}`}>{text || "No data found"}</div>
  );
};

export default NoDataFound;
