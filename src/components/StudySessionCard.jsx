import React from "react";

// Author: Vishnu
// Study session card component that displays session information
// Allows users to join or leave study sessions
export default function StudySessionCard({ session, onJoin, onLeave }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 border mb-4 flex flex-col gap-2">
      {/* Session title */}
      <div className="font-semibold text-lg">{session.title}</div>
      {/* Location and formatted time */}
      <div className="text-gray-500 text-sm">{session.location} • {new Date(session.time).toLocaleString()}</div>
      {/* Action buttons - show leave if joined, join if not */}
      <div className="flex gap-2 mt-2">
        {session.joined ? (
          <button className="bg-red-100 text-red-600 px-3 py-1 rounded" onClick={() => onLeave(session)}>
            Leave
          </button>
        ) : (
          <button className="bg-primary text-white px-3 py-1 rounded" onClick={() => onJoin(session)}>
            Join
          </button>
        )}
      </div>
    </div>
  );
}
