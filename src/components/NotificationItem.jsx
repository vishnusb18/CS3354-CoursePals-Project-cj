import React from "react";

export default function NotificationItem({ notification, onClick }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded cursor-pointer transition ${notification.read ? "bg-gray-100 text-gray-400" : "bg-blue-50 text-blue-900 font-semibold"}`}
      onClick={() => onClick(notification)}
    >
      <span className="text-xl">🔔</span>
      <div>
        <div>{notification.content}</div>
        <div className="text-xs text-gray-400">{new Date(notification.timestamp).toLocaleString()}</div>
      </div>
    </div>
  );
}
