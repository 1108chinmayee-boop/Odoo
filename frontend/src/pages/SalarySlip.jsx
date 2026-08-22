import { useEffect, useState } from "react";
import { getMyPayroll } from "../services/payrollApi";

const money = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

function SalarySlip() {
  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSalarySlip = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getMyPayroll();

        const records = result.data?.data || [];

        setPayroll(records[0] || null);
      } catch (err) {
        console.error("Salary slip error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load salary information."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSalarySlip();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-sm text-slate-500">
          Loading salary information...
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-red-600">
            Unable to load salary slip
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {error}
          </p>
        </div>
      </div>
    );
  }

  // No salary
  if (!payroll) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-8">
        <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            No salary information available
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Your salary slip has not been generated yet.
          </p>
        </div>
      </div>
    );
  }

  const employee = payroll.employeeId;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        {/* Header */}
        <div className="mb-8 flex items-start justify-between border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Dayflow
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Salary Slip
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-500">
              Payroll Month
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {payroll.month}
            </p>
          </div>
        </div>


        {/* Employee Information */}
        <div className="mb-8 grid gap-4 border-b border-slate-200 pb-6 sm:grid-cols-2">

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Employee
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {employee?.name || "Employee"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Employee ID
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {employee?.employeeId ||
                employee?._id ||
                "-"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Status
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {payroll.status || "Pending"}
            </p>
          </div>

        </div>


        {/* Salary Breakdown */}
        <div className="space-y-4">

          <div className="flex justify-between text-sm">
            <span className="text-slate-600">
              Basic Salary
            </span>

            <span className="font-medium text-slate-900">
              {money(payroll.basicSalary)}
            </span>
          </div>


          <div className="flex justify-between text-sm">
            <span className="text-slate-600">
              Allowances
            </span>

            <span className="font-medium text-slate-900">
              {money(payroll.allowances)}
            </span>
          </div>


          <div className="flex justify-between text-sm">
            <span className="text-slate-600">
              Deductions
            </span>

            <span className="font-medium text-red-500">
              - {money(payroll.deductions)}
            </span>
          </div>


          {/* Net Salary */}
          <div className="flex justify-between border-t border-slate-200 pt-5 text-xl font-bold">

            <span className="text-slate-900">
              Net Salary
            </span>

            <span className="text-indigo-600">
              {money(payroll.netSalary)}
            </span>

          </div>

        </div>

      </div>
    </div>
  );
}

export default SalarySlip;