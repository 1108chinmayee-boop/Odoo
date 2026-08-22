import { Bell, CheckCircle2, Clock3, X } from "lucide-react";
import { notifications } from "../data/mockData";

function NotificationPanel({ onClose }) {
  return (
    <div className="absolute right-0 top-12 z-50 w-96 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h3 className="font-semibold text-slate-900">
            Notifications
          </h3>

          <p className="text-xs text-slate-500">
            Your latest workforce updates
          </p>
        </div>

        <button
          onClick={onClose}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={18} />
        </button>
      </div>

      {/* Notifications */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex gap-3 border-b border-slate-100 px-5 py-4 hover:bg-slate-50 ${
              notification.unread ? "bg-indigo-50/40" : ""
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              {notification.unread ? (
                <Bell size={17} />
              ) : (
                <CheckCircle2 size={17} />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-slate-900">
                  {notification.title}
                </p>

                {notification.unread && (
                  <span className="h-2 w-2 rounded-full bg-indigo-600" />
                )}
              </div>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {notification.message}
              </p>

              <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-400">
                <Clock3 size={12} />
                {notification.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <button className="w-full px-5 py-3 text-center text-sm font-medium text-indigo-600 hover:bg-indigo-50">
        Mark all as read
      </button>
    </div>
  );
}

export default NotificationPanel;