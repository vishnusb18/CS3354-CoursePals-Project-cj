import React from "react";

export default function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
      <div className="text-5xl mb-2">📭</div>
      <div className="text-lg">{message}</div>
    </div>
  );
}
