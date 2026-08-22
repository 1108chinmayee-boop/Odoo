import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";

function PlaceholderPage({ title, owner }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">
        {title}
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        This module is being developed by {owner}.
      </p>

      <div className="mt-6 rounded-xl bg-indigo-50 p-5">
        <p className="text-sm font-medium text-indigo-900">
          Navigation integration is ready.
        </p>

        <p className="mt-1 text-xs text-indigo-700">
          The module will appear here when the respective team member
          integrates their page.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AdminLayout>
        <Routes>

          {/* Person 4 */}
          <Route
            path="/"
            element={<AdminDashboard />}
          />

          {/* Person 1 */}
          <Route
            path="/employees"
            element={
              <PlaceholderPage
                title="Employees"
                owner="Person 1"
              />
            }
          />

          {/* Person 2 */}
          <Route
            path="/attendance"
            element={
              <PlaceholderPage
                title="Attendance"
                owner="Person 2"
              />
            }
          />

          <Route
            path="/leave"
            element={
              <PlaceholderPage
                title="Leave Requests"
                owner="Person 2"
              />
            }
          />

          {/* Person 3 */}
          <Route
            path="/payroll"
            element={
              <PlaceholderPage
                title="Payroll"
                owner="Person 3"
              />
            }
          />

          <Route
            path="/analytics"
            element={
              <PlaceholderPage
                title="Analytics"
                owner="Person 3"
              />
            }
          />

          <Route
            path="/reports"
            element={
              <PlaceholderPage
                title="Reports"
                owner="Person 3"
              />
            }
          />

          {/* System */}
          <Route
            path="/notifications"
            element={
              <PlaceholderPage
                title="Notifications"
                owner="Dayflow System"
              />
            }
          />

          <Route
            path="/settings"
            element={
              <PlaceholderPage
                title="Settings"
                owner="Dayflow System"
              />
            }
          />

        </Routes>
      </AdminLayout>
    </BrowserRouter>
  );
}

export default App;