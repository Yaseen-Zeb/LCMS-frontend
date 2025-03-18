import { useQuery } from "@tanstack/react-query";
import { getCases } from "./api-services";

export const useGetCases = () => {
  return useQuery({
    queryKey: ["getCases"],
    queryFn: getCases,
  });
};

// export const useChangeStatus = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: changeStatus,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["getLawyers"]);
//       toast.success("Status changed successfully");
//     },
//     onError: (error: IApiBaseResponse) => {
//       toast.error(error.message);
//     },
//   });
// };
