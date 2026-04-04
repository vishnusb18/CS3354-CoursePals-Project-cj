import React from "react";

export default function GroupChatItem({ group, selected, onClick }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded cursor-pointer transition hover:bg-gray-100 ${selected ? "bg-primary text-white" : "text-gray-700"}`}
      onClick={() => onClick(group)}
    >
      <span className="text-2xl">👥</span>
      <div>
        <div className="font-semibold">{group.name}</div>
        <div className="text-xs text-gray-400">{group.members.length} members</div>
      </div>
    </div>
  );
}
