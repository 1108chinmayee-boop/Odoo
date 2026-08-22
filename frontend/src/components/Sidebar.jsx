import {
  LayoutDashboard,
  Users,
  Clock3,
  CalendarDays,
  Wallet,
  BarChart3,
  FileText,
  Bell,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    label: "Employees",
    icon: Users,
    path: "/employees",
  },
  {
    label: "Attendance",
    icon: Clock3,
    path: "/attendance",
  },
  {
    label: "Leave Requests",
    icon: CalendarDays,
    path: "/leave",
  },
  {
    label: "Payroll",
    icon: Wallet,
    path: "/payroll",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    label: "Reports",
    icon: FileText,
    path: "/reports",
  },
];

const bottomItems = [
  {
    label: "Notifications",
    icon: Bell,
    path: "/notifications",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

function Sidebar({ sidebarOpen, onClose }) {
  const handleNavigation = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-slate-950 text-white shadow-xl transition-transform duration-300 ease-in-out
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
        lg:translate-x-0 lg:shadow-none
      `}
    >

      {/* ================================= */}
      {/* Logo                              */}
      {/* ================================= */}

      <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">

        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Dayflow
          </h1>

          <p className="text-xs text-slate-400">
            Intelligent Workforce OS
          </p>
        </div>


        {/* Mobile Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>

      </div>


      {/* ================================= */}
      {/* Navigation                        */}
      {/* ================================= */}

      <nav className="flex-1 overflow-y-auto px-4 py-6">

        {/* Workspace */}
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Workspace
        </p>


        <div className="space-y-1">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === "/"}
                onClick={handleNavigation}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={19} />

                <span>{item.label}</span>
              </NavLink>
            );
          })}

        </div>


        {/* System */}
        <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          System
        </p>


        <div className="space-y-1">

          {bottomItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={handleNavigation}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={19} />

                <span>{item.label}</span>
              </NavLink>
            );
          })}

        </div>

      </nav>


      {/* ================================= */}
      {/* Admin Profile                     */}
      {/* ================================= */}

      <div className="border-t border-slate-800 p-4">

        <div className="mb-3 flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-semibold">
            A
          </div>

          <div className="min-w-0">

            <p className="truncate text-sm font-semibold">
              Admin
            </p>

            <p className="truncate text-xs text-slate-400">
              HR Administrator
            </p>

          </div>

        </div>


        {/* Logout */}
        <button
          type="button"
          onClick={() => {
            console.log("Logout clicked");
            handleNavigation();
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <LogOut size={18} />

          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;