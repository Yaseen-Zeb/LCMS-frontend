import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ICase } from "@/types";
import formatDate from "@/utils/formatDate";
import { Briefcase, MapPin, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const WorkHistory = ({
  cases,
}: {
  cases: { pendingCases: ICase[]; completedCases: ICase[] };
}) => {
  return (
    <div>
      <Tabs defaultValue="ongoing" className="mt-0">
        <TabsList className="w-full px-1 border-primary border bg-blue-100">
          <TabsTrigger value="ongoing" className="w-1/2 text-gray-500">
            Completed Cases
          </TabsTrigger>
          <TabsTrigger value="completed" className="w-1/2 text-gray-500">
            Ongoing Cases
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ongoing">
          {cases.completedCases.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              {cases.completedCases?.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="p-4 bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] rounded-lg border border-gray-200 hover:border-primary group"
                >
                  <Link to={`/case/detail/${caseItem.id}`} className="w-full">
                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-primary group-hover:cursor-pointer min-h-[56px]">
                      {caseItem.title.length < 57
                        ? caseItem.title
                        : caseItem.title.substring(0, 57) + " ..."}
                    </h2>
                  </Link>

                  <div className="flex items-center text-gray-600 text-sm mt-2">
                    <span className="flex items-center gap-2">
                      <Briefcase size={16} />
                      Budget: {caseItem.budget_amount} PKR <b>·</b>{" "}
                      {caseItem.budget_type}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mt-2">
                    <span className="flex items-center gap-2">
                      <TrendingUp size={16} />
                      Submitted Bids: {caseItem.total_bids || 0}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mt-2">
                    <span className="flex items-start gap-2">
                      <span>
                        <MapPin size={16} className="mt-0.5" />
                      </span>
                      Location:{" "}
                      {caseItem.location.length < 60
                        ? caseItem.location
                        : caseItem.location.substring(0, 60) + " ..."}
                    </span>
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
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-6">
              No cases have been completed yet.
            </div>
          )}
        </TabsContent>
        <TabsContent value="completed">
          {cases.pendingCases.length ? (
            <>
              <h3 className="text-xl font-semibold my-3">Ongoing Cases</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cases.pendingCases?.map((caseItem) => (
                  <div
                    key={caseItem.id}
                    className="p-4 bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] rounded-lg border border-gray-200 hover:border-primary group"
                  >
                    <Link to={`/case/detail/${caseItem.id}`} className="w-full">
                      <h2 className="text-lg font-semibold text-gray-800 group-hover:text-primary group-hover:cursor-pointer min-h-[56px]">
                        {caseItem.title.length < 57
                          ? caseItem.title
                          : caseItem.title.substring(0, 57) + " ..."}
                      </h2>
                    </Link>

                    <div className="flex items-center text-gray-600 text-sm mt-2">
                      <span className="flex items-center gap-2">
                        <Briefcase size={16} />
                        Budget: {caseItem.budget_amount} PKR <b>·</b>{" "}
                        {caseItem.budget_type}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mt-2">
                      <span className="flex items-center gap-2">
                        <TrendingUp size={16} />
                        Submitted Bids: {caseItem.total_bids || 0}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mt-2">
                      <span className="flex items-start gap-2">
                        <span>
                          <MapPin size={16} className="mt-0.5" />
                        </span>
                        Location:{" "}
                        {caseItem.location.length < 60
                          ? caseItem.location
                          : caseItem.location.substring(0, 60) + " ..."}
                      </span>
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
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center mt-6">
              No ongoing cases at the moment.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkHistory;
