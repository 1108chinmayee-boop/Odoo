import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================================= */}
      {/* Mobile Overlay                    */}
      {/* ================================= */}

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
        />
      )}


      {/* ================================= */}
      {/* Sidebar                           */}
      {/* ================================= */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />


      {/* ================================= */}
      {/* Main Area                         */}
      {/* ================================= */}

      <div className="min-h-screen lg:ml-64">

        {/* Topbar */}
        <Topbar
          onMenuClick={() =>
            setSidebarOpen((current) => !current)
          }
        />


        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;