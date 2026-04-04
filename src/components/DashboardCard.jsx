import React from "react";

export default function DashboardCard({ title, value, icon, className = "" }) {
  return (
    <div className={`bg-white rounded-lg shadow p-4 flex items-center gap-4 ${className}`}>
      <div className="text-3xl">{icon}</div>
      <div>
        <div className="text-gray-500 text-sm">{title}</div>
        <div className="font-bold text-xl">{value}</div>
      </div>
    </div>
  );
}
