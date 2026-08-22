import React from "react";
import { useEffect, useState } from "react";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  FaChartLine,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";

import SalaryCard from "../components/SalaryCard";
import WorkforceHealth from "../components/WorkforceHealth";
import { getPayrollAnalytics } from "../services/payrollApi";

const money = (value) =>
  `₹${Math.round(
    Number(value || 0)
  ).toLocaleString("en-IN")}`;

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getPayrollAnalytics();

        setAnalytics(result.data?.data || null);
      } catch (err) {
        console.error(
          "Analytics loading error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to load payroll analytics."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  // ============================================
  // Loading
  // ============================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-8">
        <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="text-center">

            <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600" />

            <p className="text-sm font-semibold text-slate-700">
              Loading workforce analytics...
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Preparing payroll insights.
            </p>

          </div>
        </div>
      </div>
    );
  }


  // ============================================
  // Error
  // ============================================

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-8">
        <div className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm">

          <p className="text-sm font-semibold text-red-600">
            Unable to load analytics
          </p>

          <p className="mt-2 text-sm text-slate-500">
            {error}
          </p>

        </div>
      </div>
    );
  }


  // ============================================
  // Empty
  // ============================================

  if (!analytics) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

          <h2 className="text-lg font-semibold text-slate-900">
            No analytics available
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Analytics will appear once payroll data is available.
          </p>

        </div>
      </div>
    );
  }


  const payrollTrend =
    analytics.payrollTrend || [];


  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      {/* ======================================== */}
      {/* Header                                   */}
      {/* ======================================== */}

      <div className="mb-8">

        <p className="text-sm font-semibold text-indigo-600">
          Workforce Intelligence
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Analytics
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Turn payroll data into useful HR insights.
        </p>

      </div>


      {/* ======================================== */}
      {/* KPI Cards                                */}
      {/* ======================================== */}

      <div className="mb-7 grid gap-5 md:grid-cols-3">

        <SalaryCard
          title="Total Payroll"
          value={money(analytics.totalPayroll)}
          icon={<FaMoneyBillWave />}
        />

        <SalaryCard
          title="Employees"
          value={analytics.totalEmployees || 0}
          icon={<FaUsers />}
        />

        <SalaryCard
          title="Average Salary"
          value={money(analytics.averageSalary)}
          icon={<FaChartLine />}
        />

      </div>


      {/* ======================================== */}
      {/* Latest Month Summary                     */}
      {/* ======================================== */}

      <div className="mb-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Latest Payroll Period
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              {analytics.latestMonth || "N/A"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Total payroll processed for the latest available month.
            </p>
          </div>


          <div className="rounded-xl bg-indigo-50 px-5 py-4 text-left sm:text-right">

            <p className="text-xs font-medium text-indigo-600">
              Latest Month Payroll
            </p>

            <p className="mt-1 text-xl font-bold text-indigo-700">
              {money(
                analytics.latestMonthPayroll
              )}
            </p>

          </div>

        </div>

      </div>


      {/* ======================================== */}
      {/* Workforce Health                         */}
      {/* ======================================== */}

      <div className="mb-7">

        <WorkforceHealth
          attendance={91}
          leaveChange={12}
        />

        <p className="mt-2 px-1 text-xs text-slate-400">
          Attendance and leave values are temporary placeholders
          until Person 2's Attendance and Leave APIs are integrated.
        </p>

      </div>


      {/* ======================================== */}
      {/* Payroll Trend                            */}
      {/* ======================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6">

          <h2 className="text-lg font-semibold text-slate-900">
            Payroll Trend
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Monthly payroll expenditure over time.
          </p>

        </div>


        {payrollTrend.length === 0 ? (

          <div className="flex h-[350px] items-center justify-center">

            <p className="text-sm text-slate-400">
              No payroll trend data available.
            </p>

          </div>

        ) : (

          <div className="h-[350px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={payrollTrend}
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 10,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  tick={{
                    fontSize: 12,
                  }}
                />

                <YAxis
                  tick={{
                    fontSize: 12,
                  }}
                  tickFormatter={(value) =>
                    `₹${Number(
                      value
                    ).toLocaleString("en-IN")}`
                  }
                />

                <Tooltip
                  formatter={(value) => [
                    money(value),
                    "Payroll",
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey="amount"
                  name="Payroll"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        )}

      </div>

    </div>
  );
}