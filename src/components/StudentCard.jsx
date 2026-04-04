import React from "react";

export default function StudentCard({ student, sharedCourses, onMessage, onViewProfile }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border">
      <div className="font-semibold text-lg">{student.name}</div>
      <div className="text-gray-500 text-sm">{student.major} ({student.year})</div>
      <div className="text-xs text-gray-400">Shared courses: {sharedCourses.join(", ")}</div>
      <div className="flex gap-2 mt-2">
        <button className="bg-primary text-white px-3 py-1 rounded" onClick={() => onMessage(student)}>
          Message
        </button>
        <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded" onClick={() => onViewProfile(student)}>
          View Profile
        </button>
      </div>
    </div>
  );
}
