import { useGetMyCases } from "@/features/case/api/api-queries";
import CaseForm from "@/features/case/components/case-form";
import Loader from "@/components/ui/loader"; // Ensure you have a loader component
import NoDataFound from "@/components/shared/no-data-found"; // Ensure you have a no-data component

const MyCases = () => {
  const { data, isLoading } = useGetMyCases();

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold">My Cases</h3>
        <CaseForm />
      </div>

      <div className="relative overflow-x-auto border rounded-sm">
        {isLoading ? (
          <Loader />
        ) : data?.data.cases.length ? (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-gray-600 font-semibold bg-gray-100">
              <tr>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Title
                </td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Required expertise
                </td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Urgency level
                </td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Budget
                </td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Budget Type
                </td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Views
                </td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">
                  Actions
                </td>
              </tr>
            </thead>
            <tbody>
              {data.data.cases.map((caseItem, index) => (
                <tr key={caseItem.id || index}>
                  <td className="px-6 py-4">
                    {" "}
                    {caseItem.title.length > 30 ? (
                      <>
                        {caseItem.title.substring(0, 30)}
                        <b> ...</b>
                      </>
                    ) : (
                      caseItem.title
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {Array.isArray(caseItem.expertise_required) &&
                    caseItem.expertise_required.length > 0 ? (
                      <>
                        {caseItem.expertise_required.join(", ").length > 30 ? (
                          <>
                            {caseItem.expertise_required
                              .join(", ")
                              .substring(0, 30)}
                            <b> ...</b>
                          </>
                        ) : (
                          caseItem.expertise_required.join(", ")
                        )}
                      </>
                    ) : (
                      "No expertise specified"
                    )}
                  </td>
                  <td className="px-6 py-4">{caseItem.urgency || "N/A"}</td>
                  <td className="px-6 py-4">
                    {caseItem.budget_amount
                      ? `$${caseItem.budget_amount}`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">{caseItem.budget_type || "N/A"}</td>
                  <td className="px-6 py-4">{3}</td>
                  <td className="px-6 py-4">
                    {/* Placeholder for action buttons */}
                    <button className="text-blue-500 hover:underline">
                      Edit
                    </button>
                    <span className="mx-2">|</span>
                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoDataFound />
        )}
      </div>
    </>
  );
};

export default MyCases;
