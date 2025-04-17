import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Blocks,
  CalendarClock,
  CalendarDays,
  ChartSpline,
  MapPin,
  Receipt,
  TrendingUp,
  UserCircle,
} from "lucide-react";
import { useGetCaseDetail } from "../api/api-queries";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiResponseError from "@/components/shared/api-response-error";
import { useAuthContext } from "@/providers/auth-provider";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import formatDate from "@/utils/formatDate";
import Status from "@/components/shared/status";
import toast from "react-hot-toast";

const CaseDetail = () => {
  const { user, handleBidAuthModal } = useAuthContext();
  const [copied, setCopied] = useState(false);
  const { id } = useParams();

  const {
    data: caseDetail,
    isLoading: isCaseDetailLoading,
    refetch: refetchCaseDetail,
    isError: isCaseDetailError,
  } = useGetCaseDetail(Number(id || 0));

  useEffect(() => {
    if (id) refetchCaseDetail();
  }, [id, refetchCaseDetail]);

  if (isCaseDetailLoading) return <Loader />;
  if (isCaseDetailError) return <ApiResponseError />;

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg border border-gray-200 flex flex-col lg:flex-row gap-6">
      {/* Left Side - Job Details */}
      <div className="w-full lg:w-2/3">
        <h1 className="text-2xl font-medium text-gray-900">
          {caseDetail?.data.title}
        </h1>

        <div className="text-sm mt-2">
          <span className="flex items-center gap-2">
            <CalendarDays size={13} />
            Posted Date: {formatDate(caseDetail!.data.createdAt)}
          </span>
        </div>

        <div className="mt-4 text-gray-700 text-sm">
          <p>{caseDetail?.data.description}</p>
        </div>

        <Separator className="my-3" />

        <div className="flex flex-wrap gap-2 text-sm">
          <MapPin size={14} className="mt-1" />
          Location: {caseDetail?.data.location}
        </div>

        <Separator className="my-3" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <span className="flex items-center gap-2 text-sm">
            <Receipt size={14} />
            Budget: {caseDetail?.data.budget_amount} PKR · {caseDetail?.data.budget_type}
          </span>
          <span className="flex items-center gap-2 text-sm">
            <TrendingUp size={14} />
            Submitted Bids: {caseDetail.data.total_bids ?? 0}
          </span>
        </div>

        <Separator className="my-3" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <span className="flex items-center gap-2 text-sm">
            <Blocks size={14} />
            Category: {caseDetail?.data.case_category}
          </span>
          <span className="flex items-center gap-2 text-sm">
            <ChartSpline size={14} />
            Case Status: <Status status={caseDetail!.data.status} />
          </span>
        </div>

        <Separator className="my-3" />

        <div>
          <h3 className="font-semibold text-gray-800 mb-1">
            Required Skills and Expertise
          </h3>
          <div className="flex flex-wrap gap-2">
            {caseDetail?.data.expertise_required.map((expertise, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full"
              >
                {expertise}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-md">
        {(!user || user?.role === "lawyer") && (
          <div className="flex flex-col gap-3 mb-8">
            <Button
              onClick={() => {
                if (caseDetail.data.status === "open") {
                  handleBidAuthModal(caseDetail.data.id);
                } else {
                  toast.success(
                    `This case is currently ${caseDetail.data.status} and bid cannot be submitted now.`
                  );
                }
              }}
              className="w-full px-6 py-2"
            >
              Place your bid
            </Button>
          </div>
        )}

        <Link to={`/client/profile/${caseDetail.data.client.id}`}>
          <div className="bg-white p-4 rounded-lg border border-gray-300 hover:border-primary cursor-pointer">
            <h3 className="font-semibold text-gray-800">About the Client</h3>
            <div className="flex items-center gap-1 mt-2 hover:text-primary">
              <UserCircle size={18} />
              <span>
                {caseDetail?.data.client.name.length < 30
                  ? caseDetail?.data.client.name
                  : caseDetail?.data.client.name.substring(0, 30) + " ..."}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-3 text-gray-600">
              <MapPin size={14} />
              <span className="text-sm">
                {caseDetail?.data.client.address.length < 35
                  ? caseDetail?.data.client.address
                  : caseDetail?.data.client.address.substring(0, 35) + " ..."}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-3 text-gray-600">
              <CalendarClock size={14} />
              <span className="text-sm">
                Member since {formatDate(caseDetail.data.client.createdAt)}
              </span>
            </div>
          </div>
        </Link>

        <div className="mt-6">
          <h3 className="font-semibold text-gray-800">Case Link</h3>
          <div className="flex items-center mt-1">
            <Input
              type="text"
              value={window.location.href}
              readOnly
              className="px-3 py-2 text-gray-500 text-sm border rounded-l-md w-full border-r-0"
            />
            <Button
              className="rounded-l-none w-28"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href).then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                });
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;