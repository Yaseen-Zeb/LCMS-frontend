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
  const getValue = (val?: string | number | null) => val ? val : "N/A";

  return (
    <Sheet>
      <SheetTrigger className="flex items-center gap-1.5 w-full">
        <Eye size={15} /> View
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl font-medium">
            Lawyer Details
          </SheetTitle>
        </SheetHeader>

        {/* Profile Picture */}
        <div className="flex justify-center py-4">
          <div className="relative w-24 h-24">
            {lawyer.profile_picture ? (
              <>
                <img
                  src={`${env.VITE_APP_BASE_URL}/${lawyer.profile_picture}`}
                  alt="Profile"
                  className="w-full h-full rounded-full border"
                />
                <span
                  className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
                    lawyer?.is_online ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </>
            ) : (
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* Lawyer Details */}
        <div className="p-2">
          <div className="grid grid-cols-4 gap-1 space-y-2">
            <p className="text-sm col-span-1 font-medium mt-2">Name:</p>
            <p className="text-sm col-span-3">{getValue(lawyer.name)}</p>

            <p className="text-sm col-span-1 font-medium">Email:</p>
            <p className="text-sm col-span-3">{getValue(lawyer.email)}</p>

            <p className="text-sm col-span-1 font-medium">Phone:</p>
            <p className="text-sm col-span-3">{getValue(lawyer.phone_number)}</p>

            <p className="text-sm col-span-1 font-medium">CNIC:</p>
            <p className="text-sm col-span-3">{getValue(lawyer.cnic)}</p>

            <p className="text-sm col-span-1 font-medium">Gender:</p>
            <p className="text-sm col-span-3">{getValue(lawyer.gender)}</p>

            <p className="text-sm col-span-1 font-medium">Languages:</p>
            <p className="text-sm col-span-3">{getValue(lawyer.languages_spoken)}</p>

            <p className="text-sm col-span-1 font-medium">Link:</p>
            <p className="text-sm col-span-3">
              {lawyer.website_or_social ? (
                <a
                  href={lawyer.website_or_social}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {lawyer.website_or_social}
                </a>
              ) : (
                "N/A"
              )}
            </p>

            <p className="text-sm col-span-1 font-medium">Bio:</p>
            <p className="text-sm col-span-3 whitespace-pre-line">
              {getValue(lawyer.bio)}
            </p>

            <p className="text-sm col-span-1 font-medium">Address:</p>
            <p className="text-sm col-span-3">{getValue(lawyer.address)}</p>

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
            <p className="text-sm col-span-3">
              <Status status={lawyer.status ? "Active" : "Inactive"} />
            </p>

            {lawyer.certificate && (
              <>
                <p className="text-sm col-span-1 font-medium">Certificate:</p>
                <p className="text-sm col-span-3">
                  <a
                    href={lawyer.certificate}
                    download={`${lawyer.name}-certificate.pdf`}
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
