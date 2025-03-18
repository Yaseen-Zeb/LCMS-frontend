import Status from "@/components/shared/status";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { env } from "@/config/env";
import { IUser } from "@/types";
import { Eye, Download } from "lucide-react";

const ViewLawyer = ({ lawyer }: { lawyer: IUser }) => {
  return (
    <Sheet>
      <SheetTrigger className="flex items-center gap-1.5 w-full">
        <Eye size={15} /> View
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl font-medium">
            Lawyer Detials
          </SheetTitle>
        </SheetHeader>

        {/* Profile Picture */}
        <div className="flex justify-center py-4">
          {lawyer.profile_picture ? (
            <img
              src={`${env.VITE_APP_BASE_URL}/${lawyer.profile_picture}`}
              alt="Profile"
              className="w-24 h-24 rounded-full border"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>

        {/* Lawyer Details */}
        <div className="p-2">
          <div className="grid grid-cols-4 gap-1 space-y-2">
            <p className="text-sm col-span-1 font-medium mt-2">Name:</p>
            <p className="text-sm col-span-3">{lawyer.name}</p>

            <p className="text-sm col-span-1 font-medium">Email:</p>
            <p className="text-sm col-span-3">{lawyer.email}</p>

            <p className="text-sm col-span-1 font-medium">Phone:</p>
            <p className="text-sm col-span-3">{lawyer.phone_number}</p>

            <p className="text-sm col-span-1 font-medium">Address:</p>
            <p className="text-sm col-span-3">{lawyer.address}</p>

            {lawyer.specialization && lawyer.specialization.length > 0 && (
              <>
                <p className="text-sm col-span-1 font-medium">Expertise:</p>
                <p className="text-sm col-span-3 flex flex-wrap gap-1">
                  {lawyer.specialization.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </p>
              </>
            )}

            {lawyer.experience !== undefined && (
              <>
                <p className="text-sm col-span-1 font-medium">Experience:</p>
                <p className="text-sm col-span-3">{lawyer.experience} years</p>
              </>
            )}

            <p className="text-sm col-span-1 font-medium">Status:</p>
            <p className={"text-sm col-span-3"}>
              <Status status={lawyer.status ? "Active" : "Inactive"} />
            </p>

            {/* Download Certificate */}
            {lawyer.certificate && (
              <>
                <p className="text-sm col-span-1 font-medium">Certificate:</p>
                <p className="text-sm col-span-3">
                  <a
                    href={lawyer.certificate}
                    download
                    className="text-blue-500 flex items-center gap-1"
                  >
                    <Download size={16} /> Download Certificate
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ViewLawyer;
