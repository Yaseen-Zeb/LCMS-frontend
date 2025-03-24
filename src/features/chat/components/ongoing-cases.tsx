import Status from "@/components/shared/status";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import ReviewForm from "@/features/review/components/review-form";
import { cn } from "@/utils/utils";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

type CaseType = {
  id: number;
  title: string;
  status: string;
};

const OngoingCases = ({
  cases,
  selectedUserId,
}: {
  cases: CaseType[];
  selectedUserId: number;
}) => {
  const caseItems = cases.length ? (
    cases.map((caseItem, i) => (
      <div key={caseItem.id}>
        <DropdownMenuItem className="font-semibold text-sm" disabled>
          {caseItem.title.length < 50
            ? caseItem.title
            : caseItem.title.substring(0, 50) + " ..."}
        </DropdownMenuItem>
        <div className="flex justify-start gap-2">
          <Link to={`/case/detail/${caseItem.id}`}>
            <DropdownMenuItem
              className={cn(
                "h-6 px-3 py-1 text-sm cursor-pointer flex items-center gap-2 rounded-md",
                "hover:bg-muted text-primary border border-input" // mimic button outline style
              )}
            >
              <Eye className="w-4 h-4" />
              View Details
            </DropdownMenuItem>
          </Link>

          {caseItem.status === "closed" ? (
            <Status status="closed" />
          ) : (
            <DropdownMenuItem
              className={cn(
                "h-6 px-3 py-1 text-sm text-green-500 cursor-pointer rounded-md border border-input",
                "hover:bg-muted"
              )}
              onSelect={(e) => e.preventDefault()}
            >
              <ReviewForm case_id={caseItem.id} lawyer_id={selectedUserId} />
            </DropdownMenuItem>
          )}
        </div>

        {cases.length - 1 !== i && <Separator className="my-4" />}
      </div>
    ))
  ) : (
    <DropdownMenuItem disabled key="none">
      No ongoing cases
    </DropdownMenuItem>
  );

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="h-7" variant="outline">
          Ongoing Cases
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-96 overflow-auto">
        {caseItems}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OngoingCases;
