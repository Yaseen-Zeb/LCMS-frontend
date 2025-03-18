import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, MoreHorizontal, X } from "lucide-react";
import ViewLawyer from "./view-lawyer";
import { IUser } from "@/types";
import { useChangeStatus } from "../api/api-queries";

const LawyerActions = ({ lawyer }: { lawyer: IUser }) => {
  const changeStatusMutation = useChangeStatus();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full h-8 w-8 flex items-center justify-center"
        >
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuItem
          className="text-primary w-full"
          onSelect={(e) => e.preventDefault()}
        >
          {<ViewLawyer lawyer={lawyer} />}
        </DropdownMenuItem>
        {lawyer.status ? (
          <DropdownMenuItem
            disabled={changeStatusMutation.isLoading}
            onClick={() =>
              changeStatusMutation.mutate({ status: false, userId: lawyer.id })
            }
            className=" text-red-500 gap-1.5"
            onSelect={(e) => e.preventDefault()}
          >
            <X size={15} /> Inactive
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            disabled={changeStatusMutation.isLoading}
            onClick={() =>
              changeStatusMutation.mutate({ status: true, userId: lawyer.id })
            }
            className=" text-green-500 gap-1.5"
            onSelect={(e) => e.preventDefault()}
          >
            <Check size={15} /> Active
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LawyerActions;
