import { useState } from "react";
import AttendanceChart from "../components/AttendanceChart";
import WorkforceIntelligence from "../components/WorkforceIntelligence";

import {
  Users,
  UserCheck,
  CalendarClock,
  TrendingUp,
  Check,
  X,
  Clock3,
  AlertTriangle,
} from "lucide-react";

import StatCard from "../components/StatCard";

import {
  dashboardStats,
  leaveRequests,
  recentAttendance,
  workforceHealth,
  workforceInsight,
} from "../data/mockData";

function AdminDashboard() {
  const [requests, setRequests] = useState(leaveRequests);

  // Approve leave request
  const handleApprove = (id) => {
    setRequests((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status: "Approved" }
          : item
      )
    );
  };

  // Reject leave request
  const handleReject = (id) => {
    setRequests((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status: "Rejected" }
          : item
      )
    );
  };

  return (
    <div className="space-y-8">

      {/* ================================= */}
      {/* Welcome                           */}
      {/* ================================= */}

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Workforce Overview
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor your workforce and make informed HR decisions.
        </p>
      </div>


      {/* ================================= */}
      {/* Statistics                        */}
      {/* ================================= */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title={dashboardStats.employees.title}
          value={dashboardStats.employees.value}
          subtitle={dashboardStats.employees.subtitle}
          trend={dashboardStats.employees.trend}
          icon={Users}
        />

        <StatCard
          title={dashboardStats.presentToday.title}
          value={dashboardStats.presentToday.value}
          subtitle={dashboardStats.presentToday.subtitle}
          trend={dashboardStats.presentToday.trend}
          icon={UserCheck}
        />

        <StatCard
          title={dashboardStats.pendingLeaves.title}
          value={dashboardStats.pendingLeaves.value}
          subtitle={dashboardStats.pendingLeaves.subtitle}
          trend={dashboardStats.pendingLeaves.trend}
          icon={CalendarClock}
        />

        <StatCard
          title={dashboardStats.attendance.title}
          value={dashboardStats.attendance.value}
          subtitle={dashboardStats.attendance.subtitle}
          trend={dashboardStats.attendance.trend}
          icon={TrendingUp}
        />

      </div>


      {/* ================================= */}
      {/* Workforce Health + Insight        */}
      {/* ================================= */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Workforce Health */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="font-semibold text-slate-900">
                Workforce Health
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Overall workforce indicator
              </p>
            </div>

            <TrendingUp
              className="text-indigo-600"
              size={20}
            />

          </div>


          {/* Score */}
          <div className="mt-6 flex items-center justify-center">

            <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border-[12px] border-indigo-100">

              <span className="text-4xl font-bold text-slate-900">
                {workforceHealth.score}%
              </span>

              <span className="text-xs text-slate-500">
                Healthy
              </span>

            </div>

          </div>


          {/* Metrics */}
          <div className="mt-6 space-y-4">

            <HealthMetric
              label="Attendance"
              value={workforceHealth.attendance}
            />

            <HealthMetric
              label="Leave Trend"
              value={workforceHealth.leaveTrend}
            />

            <HealthMetric
              label="Employee Activity"
              value={workforceHealth.activity}
            />

          </div>

        </div>


        {/* Workforce Insight */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm lg:col-span-2">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <AlertTriangle size={22} />
            </div>


            <div>

              <p className="text-sm font-semibold text-amber-900">
                {workforceInsight.title}
              </p>

              <h3 className="mt-2 text-xl font-bold text-slate-900">
                {workforceInsight.message}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Dayflow identified a change in workforce
                attendance patterns that may require HR attention.
              </p>


              {/* Suggested Action */}
              <div className="mt-5 rounded-xl bg-white p-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Suggested Action
                </p>

                <p className="mt-1 text-sm font-medium text-slate-800">
                  {workforceInsight.action}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ================================= */}
      {/* Attendance Analytics              */}
      {/* ================================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6">

          <h2 className="font-semibold text-slate-900">
            Attendance Analytics
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Workforce attendance trends
          </p>

        </div>

        <AttendanceChart />

      </div>


      {/* ================================= */}
      {/* Workforce Intelligence            */}
      {/* ================================= */}

      <WorkforceIntelligence />


      {/* ================================= */}
      {/* Leave Requests + Attendance       */}
      {/* ================================= */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">


        {/* ================================= */}
        {/* Leave Requests                    */}
        {/* ================================= */}

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-slate-100 p-6">

            <div>

              <h2 className="font-semibold text-slate-900">
                Pending Leave Requests
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Requests awaiting HR approval
              </p>

            </div>


            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">

              {
                requests.filter(
                  (request) => request.status === "Pending"
                ).length
              }{" "}

              Pending

            </span>

          </div>


          <div className="divide-y divide-slate-100">

            {requests.map((request) => (

              <div
                key={request.id}
                className="flex items-center justify-between gap-4 p-5"
              >

                {/* Employee */}
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                    {request.avatar}
                  </div>


                  <div>

                    <p className="text-sm font-semibold text-slate-900">
                      {request.employee}
                    </p>

                    <p className="text-xs text-slate-500">
                      {request.department} · {request.type}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {request.dates}
                    </p>

                  </div>

                </div>


                {/* Actions / Status */}
                <div className="flex items-center gap-2">

                  {request.status === "Pending" ? (
                    <>

                      {/* Approve */}
                      <button
                        onClick={() =>
                          handleApprove(request.id)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition hover:bg-emerald-100"
                        title="Approve"
                      >
                        <Check size={17} />
                      </button>


                      {/* Reject */}
                      <button
                        onClick={() =>
                          handleReject(request.id)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
                        title="Reject"
                      >
                        <X size={17} />
                      </button>

                    </>
                  ) : (

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        request.status === "Approved"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {request.status}
                    </span>

                  )}

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* ================================= */}
        {/* Recent Attendance                 */}
        {/* ================================= */}

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 p-6">

            <h2 className="font-semibold text-slate-900">
              Recent Attendance
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Today's employee attendance activity
            </p>

          </div>


          <div className="divide-y divide-slate-100">

            {recentAttendance.map((employee) => (

              <div
                key={employee.employee}
                className="flex items-center justify-between p-5"
              >

                {/* Employee */}
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                    {employee.avatar}
                  </div>


                  <div>

                    <p className="text-sm font-semibold text-slate-900">
                      {employee.employee}
                    </p>

                    <p className="text-xs text-slate-500">
                      {employee.department}
                    </p>

                  </div>

                </div>


                {/* Attendance */}
                <div className="text-right">

                  <div className="flex items-center justify-end gap-1 text-xs text-slate-500">

                    <Clock3 size={13} />

                    {employee.time}

                  </div>


                  <span
                    className={`mt-1 inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                      employee.status === "Present"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {employee.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}


/* ================================= */
/* Workforce Health Metric           */
/* ================================= */

function HealthMetric({ label, value }) {
  return (
    <div>

      <div className="mb-1 flex justify-between text-xs">

        <span className="font-medium text-slate-600">
          {label}
        </span>

        <span className="font-semibold text-slate-900">
          {value}%
        </span>

      </div>


      <div className="h-2 overflow-hidden rounded-full bg-slate-100">

        <div
          className="h-full rounded-full bg-indigo-500"
          style={{
            width: `${value}%`,
          }}
        />

      </div>

    </div>
  );
}


export default AdminDashboard;