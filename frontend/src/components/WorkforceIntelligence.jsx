import {
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Users,
} from "lucide-react";

import {
  departmentAnalytics,
  employeeRisk,
  hrRecommendations,
} from "../data/mockData";

function WorkforceIntelligence() {
  return (
    <div className="space-y-6">

      {/* Section Header */}
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          Workforce Intelligence
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Turn workforce data into actionable HR decisions.
        </p>
      </div>

      {/* Department Performance */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Users size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Department Performance
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Compare attendance, productivity and leave patterns
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">

            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Department
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Employees
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Attendance
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Productivity
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Leave Rate
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Risk
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {departmentAnalytics.map((department) => (
                <tr
                  key={department.department}
                  className="transition hover:bg-slate-50"
                >

                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-900">
                      {department.department}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">
                      {department.employees}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">

                      <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-indigo-500"
                          style={{
                            width: `${department.attendance}%`,
                          }}
                        />
                      </div>

                      <span className="text-sm font-medium text-slate-700">
                        {department.attendance}%
                      </span>

                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-700">
                      {department.productivity}%
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-700">
                      {department.leaveRate}%
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <RiskBadge risk={department.risk} />
                  </td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

      {/* Risk + Recommendations */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Employee Risk */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <AlertTriangle size={20} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Employee Risk Detection
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Employees requiring HR attention
                </p>
              </div>

            </div>

          </div>

          <div className="divide-y divide-slate-100">

            {employeeRisk.map((employee) => (

              <div
                key={employee.employee}
                className="p-5"
              >

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {employee.employee}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {employee.department}
                    </p>
                  </div>

                  <RiskBadge risk={employee.risk} />

                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">

                  <RiskMetric
                    label="Attendance"
                    value={`${employee.attendance}%`}
                  />

                  <RiskMetric
                    label="Leave Days"
                    value={employee.leaveDays}
                  />

                  <RiskMetric
                    label="Late Days"
                    value={employee.lateDays}
                  />

                </div>

                <div className="mt-3 flex items-start gap-2 rounded-lg bg-slate-50 p-3">
                  <TrendingDown
                    size={15}
                    className="mt-0.5 shrink-0 text-slate-400"
                  />

                  <p className="text-xs leading-5 text-slate-600">
                    {employee.reason}
                  </p>
                </div>

              </div>

            ))}

          </div>
        </div>

        {/* HR Recommendations */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  HR Recommendations
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Suggested actions based on workforce signals
                </p>
              </div>

            </div>

          </div>

          <div className="divide-y divide-slate-100">

            {hrRecommendations.map((recommendation) => (

              <div
                key={recommendation.id}
                className="p-5"
              >

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {recommendation.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {recommendation.description}
                    </p>
                  </div>

                  <PriorityBadge
                    priority={recommendation.priority}
                  />

                </div>

                <div className="mt-4 rounded-xl bg-indigo-50 p-4">

                  <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-400">
                    Recommended Action
                  </p>

                  <p className="mt-1 text-sm font-medium text-indigo-900">
                    {recommendation.action}
                  </p>

                </div>

              </div>

            ))}

          </div>
        </div>

      </div>

    </div>
  );
}


/* -------------------------------- */
/* Risk Badge                       */
/* -------------------------------- */

function RiskBadge({ risk }) {
  const styles = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-amber-50 text-amber-600",
    Low: "bg-emerald-50 text-emerald-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[risk] || "bg-slate-50 text-slate-600"
      }`}
    >
      {risk}
    </span>
  );
}


/* -------------------------------- */
/* Priority Badge                   */
/* -------------------------------- */

function PriorityBadge({ priority }) {
  const styles = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-amber-50 text-amber-600",
    Low: "bg-emerald-50 text-emerald-600",
  };

  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
        styles[priority] || "bg-slate-50 text-slate-600"
      }`}
    >
      {priority}
    </span>
  );
}


/* -------------------------------- */
/* Risk Metric                      */
/* -------------------------------- */

function RiskMetric({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <p className="text-[11px] text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}

export default WorkforceIntelligence;