import React from "react";

export default function CourseCard({ course, enrolled, onAdd, onRemove }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border">
      <div className="font-semibold text-lg">{course.name}</div>
      <div className="flex gap-2 mt-2">
        {enrolled ? (
          <button
            className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
            onClick={() => onRemove(course)}
          >
            Remove
          </button>
        ) : (
          <button
            className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark"
            onClick={() => onAdd(course)}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}
