import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  BadgePercent,
  Briefcase,
  ChevronDown,
  Eye,
  MapPin,
  TrendingUp,
  XCircle,
} from "lucide-react";
import Loader from "@/components/ui/loader";
import { useGetCases } from "../api/api-queries";
import NoDataFound from "@/components/shared/no-data-found";
import { Link } from "react-router-dom";
import ApiResponseError from "@/components/shared/api-response-error";
import { useAuthContext } from "@/providers/auth-provider";
import formatDate from "@/utils/formatDate";
import { CASE_CATEGORIES } from "@/utils/constant";
import toast from "react-hot-toast";

const CasesList = () => {
  const { user, handleBidAuthModal } = useAuthContext();
  const { data, isLoading, isError } = useGetCases();

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [budgetFilter, setBudgetFilter] = useState("");

  let filteredCases = data?.data || [];

  if (searchQuery) {
    filteredCases = filteredCases.filter((caseItem) =>
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (categoryFilter) {
    filteredCases = filteredCases.filter(
      (caseItem) => caseItem.case_category === categoryFilter
    );
  }

  if (statusFilter) {
    filteredCases = filteredCases.filter(
      (caseItem) => caseItem.status === statusFilter
    );
  }

  if (budgetFilter === "Low to High") {
    filteredCases = [...filteredCases].sort(
      (a, b) => a.budget_amount - b.budget_amount
    );
  } else if (budgetFilter === "High to Low") {
    filteredCases = [...filteredCases].sort(
      (a, b) => b.budget_amount - a.budget_amount
    );
  }

  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("");
    setStatusFilter("");
    setBudgetFilter("");
  };

  return (
    <>
      <h3 className="text-xl font-semibold">Legal Cases</h3>
      <div className="flex flex-col md:max-w-lg gap-2 lg:gap-6 my-3">
        <div className="flex-1 flex flex-col gap-2">
          <Input
            type="text"
            placeholder="Search legal cases"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-gray-300 h-10"
          />

          <div className="flex flex-wrap items-center gap-2 w-full">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="text-gray-700 border-gray-300 flex items-center gap-1"
                >
                  {categoryFilter || "Case Category"}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white overflow-y-scroll max-h-96">
                {CASE_CATEGORIES.map((category) => (
                  <DropdownMenuItem
                    key={category.value}
                    onClick={() => setCategoryFilter(category.value)}
                  >
                    {category.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem onClick={() => setCategoryFilter("")}>
                  All Categories
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="text-gray-700 border-gray-300 flex items-center gap-1"
                >
                  {statusFilter || "Status"}{" "}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white overflow-y-scroll max-h-96">
                <DropdownMenuItem onClick={() => setStatusFilter("Open")}>
                  Open
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Closed")}>
                  Closed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("")}>
                  All Status
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="text-gray-700 border-gray-300 flex items-center gap-1"
                >
                  {budgetFilter || "Budget"}{" "}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white overflow-y-scroll max-h-96">
                <DropdownMenuItem
                  onClick={() => setBudgetFilter("Low to High")}
                >
                  Low to High
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setBudgetFilter("High to Low")}
                >
                  High to Low
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setBudgetFilter("")}>
                  All Budgets
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {(categoryFilter ||
              statusFilter ||
              budgetFilter ||
              searchQuery) && (
              <Button
                variant="outline"
                className="text-red-600 border-gray-300 flex items-center gap-1"
                onClick={clearFilters}
              >
                <XCircle size={16} /> Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : !filteredCases.length ? (
        isError ? (
          <ApiResponseError />
        ) : (
          <NoDataFound />
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="p-4 bg-white shadow-md rounded-lg border border-gray-200 hover:border-primary group"
            >
              <Link to={`/case/detail/${caseItem.id}`} className="w-full block">
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-primary min-h-[56px]">
                  {caseItem.title.length < 57
                    ? caseItem.title
                    : caseItem.title.substring(0, 57) + " ..."}
                </h2>
              </Link>

              <div className="text-sm text-gray-600 mt-2 space-y-1">
                <div className="flex items-center gap-2">
                  <Briefcase size={16} />
                  Budget: {caseItem.budget_amount} PKR<b>·</b>{" "}
                  {caseItem.budget_type}
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} /> Submitted Bids:{" "}
                  {caseItem.total_bids || 0}
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5" />
                  Location:{" "}
                  {caseItem.location.length < 60
                    ? caseItem.location
                    : caseItem.location.substring(0, 60) + " ..."}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {caseItem.expertise_required.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-gray-500 text-sm mt-3">
                Posted Date: {formatDate(caseItem.createdAt)} <b>·</b>{" "}
                {caseItem.urgency}
              </p>

              <Separator className="my-3" />

              <div
                className={`grid gap-3 text-sm ${
                  user && user?.role !== "lawyer"
                    ? "grid-cols-1"
                    : "grid-cols-2"
                }`}
              >
                {(!user || user?.role === "lawyer") && (
                  <Button
                    className="flex gap-1 h-6 w-full"
                    variant="outline"
                    onClick={() => {
                      if (caseItem.status === "open") {
                        handleBidAuthModal(caseItem.id);
                      } else {
                        toast.success(
                          `This case is currently ${caseItem.status} and bid cannot be submitted now.`
                        );
                      }
                    }}
                  >
                    <BadgePercent /> Bid
                  </Button>
                )}
                <Link to={`/case/detail/${caseItem.id}`} className="w-full">
                  <Button className="flex gap-1 h-6 w-full" variant="outline">
                    <Eye />
                    {user && user?.role !== "lawyer"
                      ? "View Case Details"
                      : "View"}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CasesList;
