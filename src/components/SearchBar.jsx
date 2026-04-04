import React from "react";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
    />
  );
}
