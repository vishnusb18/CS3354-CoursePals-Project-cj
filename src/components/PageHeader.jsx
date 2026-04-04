import React from "react";

export default function PageHeader({ title, description, children }) {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <div>
        <h1 className="text-2xl font-bold text-primary mb-1">{title}</h1>
        {description && <div className="text-gray-500 text-sm">{description}</div>}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}
