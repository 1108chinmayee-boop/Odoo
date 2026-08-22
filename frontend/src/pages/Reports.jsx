import { useEffect, useMemo, useState } from "react";
import { getPayroll } from "../services/payrollApi";

const money = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

export default function Reports() {
  const [payroll, setPayroll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReport = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getPayroll();

        setPayroll(result.data?.data || []);
      } catch (err) {
        console.error("Payroll report error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load payroll report."
        );
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, []);

  const report = useMemo(() => {
    const totalPayroll = payroll.reduce(
      (sum, item) =>
        sum + Number(item.netSalary || 0),
      0
    );

    const totalBasic = payroll.reduce(
      (sum, item) =>
        sum + Number(item.basicSalary || 0),
      0
    );

    const totalAllowances = payroll.reduce(
      (sum, item) =>
        sum + Number(item.allowances || 0),
      0
    );

    const totalDeductions = payroll.reduce(
      (sum, item) =>
        sum + Number(item.deductions || 0),
      0
    );

    const employeeIds = new Set(
      payroll.map((item) =>
        String(
          item.employeeId?._id ||
            item.employeeId
        )
      )
    );

    const paid = payroll.filter(
      (item) => item.status === "Paid"
    ).length;

    const processed = payroll.filter(
      (item) => item.status === "Processed"
    ).length;

    const pending = payroll.filter(
      (item) =>
        !item.status ||
        item.status === "Pending"
    ).length;

    const averageSalary =
      employeeIds.size > 0
        ? totalPayroll / employeeIds.size
        : 0;

    return {
      totalPayroll,
      totalBasic,
      totalAllowances,
      totalDeductions,
      employeeCount: employeeIds.size,
      averageSalary,
      paid,
      processed,
      pending,
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
          Payroll Report
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Overview of payroll spending, salaries and deductions.
        </p>
      </div>


      {/* Loading */}
      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600" />

          <p className="text-sm font-medium text-slate-700">
            Preparing payroll report...
          </p>

        </div>
      )}


      {/* Error */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm">

          <p className="font-semibold text-red-600">
            Unable to load report
          </p>

          <p className="mt-2 text-sm text-slate-500">
            {error}
          </p>

        </div>
      )}


      {/* Empty */}
      {!loading && !error && payroll.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

          <h2 className="text-lg font-semibold text-slate-900">
            No payroll data available
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            The report will appear once payroll records are created.
          </p>

        </div>
      )}


      {/* Report */}
      {!loading && !error && payroll.length > 0 && (
        <>
          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Total Payroll
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {money(report.totalPayroll)}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Net payroll recorded
              </p>
            </div>


            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Employees
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {report.employeeCount}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Employees with payroll
              </p>
            </div>


            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Average Salary
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {money(report.averageSalary)}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Average recorded salary
              </p>
            </div>


            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Deductions
              </p>

              <p className="mt-2 text-2xl font-bold text-red-500">
                {money(report.totalDeductions)}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Total deductions
              </p>
            </div>

          </div>


          {/* Salary Breakdown */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5">
              <h2 className="font-semibold text-slate-900">
                Salary Breakdown
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Overview of recorded salary components.
              </p>
            </div>


            <div className="grid gap-4 sm:grid-cols-3">

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Basic Salary
                </p>

                <p className="mt-2 text-lg font-bold text-slate-900">
                  {money(report.totalBasic)}
                </p>
              </div>


              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Allowances
                </p>

                <p className="mt-2 text-lg font-bold text-emerald-600">
                  {money(report.totalAllowances)}
                </p>
              </div>


              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Deductions
                </p>

                <p className="mt-2 text-lg font-bold text-red-500">
                  {money(report.totalDeductions)}
                </p>
              </div>

            </div>

          </div>


          {/* Payroll Status */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5">
              <h2 className="font-semibold text-slate-900">
                Payroll Status
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Current processing status of payroll records.
              </p>
            </div>


            <div className="grid gap-4 sm:grid-cols-3">

              <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                <p className="text-xs font-medium text-amber-700">
                  Pending
                </p>

                <p className="mt-2 text-2xl font-bold text-amber-800">
                  {report.pending}
                </p>
              </div>


              <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                <p className="text-xs font-medium text-indigo-700">
                  Processed
                </p>

                <p className="mt-2 text-2xl font-bold text-indigo-800">
                  {report.processed}
                </p>
              </div>


              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <p className="text-xs font-medium text-emerald-700">
                  Paid
                </p>

                <p className="mt-2 text-2xl font-bold text-emerald-800">
                  {report.paid}
                </p>
              </div>

            </div>

          </div>


          {/* Records */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 px-6 py-4">

              <h2 className="font-semibold text-slate-900">
                Report Records
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {payroll.length} payroll record
                {payroll.length !== 1 ? "s" : ""}
              </p>

            </div>


            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-slate-50">

                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Employee
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Month
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Net Salary
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>
                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-100">

                  {payroll.map((item) => (
                    <tr
                      key={item._id}
                      className="transition hover:bg-slate-50"
                    >

                      <td className="px-6 py-4">

                        <p className="text-sm font-semibold text-slate-900">
                          {item.employeeId?.name ||
                            "Employee"}
                        </p>

                        <p className="text-xs text-slate-400">
                          {item.employeeId?.employeeId ||
                            "-"}
                        </p>

                      </td>


                      <td className="px-6 py-4 text-sm text-slate-600">
                        {item.month}
                      </td>


                      <td className="px-6 py-4 text-sm font-bold text-slate-900">
                        {money(item.netSalary)}
                      </td>


                      <td className="px-6 py-4">

                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                          {item.status || "Pending"}
                        </span>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>
        </>
      )}

    </div>
  );
}