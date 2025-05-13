import Status from "@/components/shared/status";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ICase } from "@/types";
import { Eye } from "lucide-react";

const ViewCase = ({ caseItem }: { caseItem: ICase }) => {
  return (
    <Sheet>
      <SheetTrigger className="flex items-center gap-1.5 w-full">
        <span className="flex whitespace-nowrap text-primary items-center gap-1">
          <Eye size={15} /> View
        </span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl font-medium">Case Details</SheetTitle>
        </SheetHeader>

        <div className="py-2">
          <div className="grid grid-cols-4 gap-2 space-y-2">
            <p className="text-sm col-span-1 font-medium mt-2">Title:</p>
            <p className="text-sm col-span-3">{caseItem.title}</p>

            <p className="text-sm col-span-1 font-medium">Description:</p>
            <p className="text-sm col-span-3">{caseItem.description}</p>

            <p className="text-sm col-span-1 font-medium">Category:</p>
            <p className="text-sm col-span-3">{caseItem.case_category}</p>

            <p className="text-sm col-span-1 font-medium">Urgency:</p>
            <p className="text-sm col-span-3">{caseItem.urgency}</p>

            <p className="text-sm col-span-1 font-medium">Expertise:</p>
            <p className="text-sm col-span-3">
              {caseItem.expertise_required.join(", ")}
            </p>

            <p className="text-sm col-span-1 font-medium">Budget:</p>
            <p className="text-sm col-span-3">
              {caseItem.budget_type === "fixed"
                ? `PKR ${caseItem.budget_amount}`
                : "Negotiable"}
            </p>

            <p className="text-sm col-span-1 font-medium">Total Bids:</p>
            <p className="text-sm col-span-3">{caseItem.total_bids}</p>

            <p className="text-sm col-span-1 font-medium">Location:</p>
            <p className="text-sm col-span-3">{caseItem.location}</p>

            <p className="text-sm col-span-1 font-medium">Status:</p>
            <p className="text-sm col-span-3">
              <Status status={caseItem.status} />
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ViewCase;
