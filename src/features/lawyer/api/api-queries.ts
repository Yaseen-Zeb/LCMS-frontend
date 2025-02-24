import { useQuery } from "@tanstack/react-query";
import { getLawyers } from "./api-services";


export const useGetLawyers = () => {
  return useQuery({
    queryKey: ["getLawyers"],
    queryFn: getLawyers,
    
  });
};
