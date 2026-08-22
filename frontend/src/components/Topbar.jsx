import { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

import NotificationPanel from "./NotificationPanel";
import { notifications } from "../data/mockData";

function Topbar({ onMenuClick }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">

      {/* ================================= */}
      {/* Left                            */}
      {/* ================================= */}

      <div className="flex min-w-0 items-center gap-3">

        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-slate-900 sm:text-xl">
            Admin Dashboard
          </h2>

          <p className="mt-1 hidden text-sm text-slate-500 sm:block">
            Here's what's happening with your workforce today.
          </p>
        </div>

      </div>


      {/* ================================= */}
      {/* Right                           */}
      {/* ================================= */}

      <div className="flex items-center gap-2 sm:gap-4">

        {/* ================================= */}
        {/* Search                            */}
        {/* ================================= */}

        <div className="relative hidden md:block">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search employees..."
            className="w-56 rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 lg:w-64"
          />

        </div>


        {/* ================================= */}
        {/* Notifications                     */}
        {/* ================================= */}

        <div className="relative">

          <button
            type="button"
            onClick={() => {
              setShowNotifications((current) => !current);
              setShowProfile(false);
            }}
            className="relative rounded-lg p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Notifications"
          >

            <Bell size={21} />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}

          </button>


          {/* Notification Panel */}
          {showNotifications && (
            <NotificationPanel
              onClose={() => setShowNotifications(false)}
            />
          )}

        </div>


        {/* Divider */}
        <div className="hidden h-8 w-px bg-slate-200 sm:block" />


        {/* ================================= */}
        {/* Admin Profile                     */}
        {/* ================================= */}

        <div className="relative">

          <button
            type="button"
            onClick={() => {
              setShowProfile((current) => !current);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 rounded-lg px-1.5 py-1.5 transition hover:bg-slate-100 sm:gap-3 sm:px-2"
          >

            {/* Avatar */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
              A
            </div>


            {/* User Information */}
            <div className="hidden text-left sm:block">

              <p className="text-sm font-semibold text-slate-900">
                Admin
              </p>

              <p className="text-xs text-slate-500">
                HR Administrator
              </p>

            </div>


            <ChevronDown
              size={17}
              className={`hidden text-slate-400 transition sm:block ${
                showProfile ? "rotate-180" : ""
              }`}
            />

          </button>


          {/* ================================= */}
          {/* Profile Dropdown                  */}
          {/* ================================= */}

          {showProfile && (
            <div className="absolute right-0 top-14 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">

              {/* Profile Header */}
              <div className="border-b border-slate-100 p-4">

                <p className="text-sm font-semibold text-slate-900">
                  Admin
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  HR Administrator
                </p>

              </div>


              {/* Profile Actions */}
              <div className="p-2">

                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <User size={17} />

                  <span>My Profile</span>
                </button>


                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <Settings size={17} />

                  <span>Settings</span>
                </button>


                <div className="my-1 border-t border-slate-100" />


                <button
                  type="button"
                  onClick={() => {
                    console.log("Logout clicked");
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-500 transition hover:bg-red-50"
                >
                  <LogOut size={17} />

                  <span>Logout</span>
                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default Topbar;