import { useEffect, useMemo, useState } from "react";
import { getPayroll } from "../services/payrollApi";

const money = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

function StatusBadge({ status }) {
  const styles = {
    Paid: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    Processed: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
    Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        styles[status] ||
        "bg-slate-50 text-slate-600 ring-slate-600/20"
      }`}
    >
      {status || "Pending"}
    </span>
  );
}

export default function Payroll() {
  const [payroll, setPayroll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPayroll = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getPayroll();

        setPayroll(result.data?.data || []);
      } catch (err) {
        console.error("Payroll loading error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load payroll records."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPayroll();
  }, []);

  const summary = useMemo(() => {
    const totalPayroll = payroll.reduce(
      (sum, item) => sum + Number(item.netSalary || 0),
      0
    );

    const totalBasic = payroll.reduce(
      (sum, item) => sum + Number(item.basicSalary || 0),
      0
    );

    const totalDeductions = payroll.reduce(
      (sum, item) => sum + Number(item.deductions || 0),
      0
    );

    const employees = new Set(
      payroll.map((item) =>
        String(item.employeeId?._id || item.employeeId)
      )
    );

    return {
      totalPayroll,
      totalBasic,
      totalDeductions,
      employeeCount: employees.size,
    };
  }, [payroll]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-indigo-600">
          Workforce Finance
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Payroll
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage employee salary and payroll records.
        </p>
      </div>


      {/* Summary Cards */}
      {!loading && !error && payroll.length > 0 && (
        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Total Payroll
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {money(summary.totalPayroll)}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Across payroll records
            </p>
          </div>


          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Employees
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {summary.employeeCount}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Employees with payroll
            </p>
          </div>


          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Basic Salary
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {money(summary.totalBasic)}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Total basic salary
            </p>
          </div>


          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Deductions
            </p>

            <p className="mt-2 text-2xl font-bold text-red-500">
              {money(summary.totalDeductions)}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Total deductions
            </p>
          </div>

        </div>
      )}


      {/* Loading */}
      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600" />

          <p className="text-sm font-medium text-slate-700">
            Loading payroll...
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Fetching the latest payroll records.
          </p>
        </div>
      )}


      {/* Error */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm">

          <p className="text-sm font-semibold text-red-600">
            Unable to load payroll
          </p>

          <p className="mt-2 text-sm text-slate-500">
            {error}
          </p>

        </div>
      )}


      {/* Empty */}
      {!loading && !error && payroll.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
            ₹
          </div>

          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            No payroll records
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Payroll records will appear here once they are created.
          </p>

        </div>
      )}


      {/* Payroll Table */}
      {!loading && !error && payroll.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

            <div>
              <h2 className="font-semibold text-slate-900">
                Payroll Records
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {payroll.length} record
                {payroll.length !== 1 ? "s" : ""}
              </p>
            </div>

          </div>


          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-slate-50">

                <tr>
                  {[
                    "Employee",
                    "Month",
                    "Basic",
                    "Allowances",
                    "Deductions",
                    "Net Salary",
                    "Status",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="whitespace-nowrap px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>

              </thead>


              <tbody className="divide-y divide-slate-100">

                {payroll.map((item) => {

                  const employee =
                    item.employeeId;

                  const employeeName =
                    employee?.name ||
                    "Employee";

                  const employeeCode =
                    employee?.employeeId ||
                    employee?._id ||
                    "-";

                  return (
                    <tr
                      key={item._id}
                      className="transition hover:bg-slate-50"
                    >

                      {/* Employee */}
                      <td className="whitespace-nowrap px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                            {employeeName
                              .split(" ")
                              .map((name) => name[0])
                              .slice(0, 2)
                              .join("")
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {employeeName}
                            </p>

                            <p className="text-xs text-slate-400">
                              {employeeCode}
                            </p>
                          </div>

                        </div>

                      </td>


                      {/* Month */}
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">
                        {item.month}
                      </td>


                      {/* Basic */}
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                        {money(item.basicSalary)}
                      </td>


                      {/* Allowances */}
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                        {money(item.allowances)}
                      </td>


                      {/* Deductions */}
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-red-500">
                        - {money(item.deductions)}
                      </td>


                      {/* Net */}
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-slate-900">
                        {money(item.netSalary)}
                      </td>


                      {/* Status */}
                      <td className="whitespace-nowrap px-6 py-4">
                        <StatusBadge
                          status={item.status}
                        />
                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </div>
  );
}