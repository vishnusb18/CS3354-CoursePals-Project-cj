import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const navLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/courses", label: "Courses" },
  { to: "/my-courses", label: "My Courses" },
  { to: "/pals", label: "Pals" },
  { to: "/messages", label: "Messages" },
  { to: "/group-chats", label: "Group Chats" },
  { to: "/polls", label: "Polls" },
  { to: "/study-sessions", label: "Study Sessions" },
  { to: "/notifications", label: "Notifications" },
  { to: "/profile", label: "Profile" },
];

export default function Navbar() {
  const { user } = useAuth();
  const location = useLocation();
  return (
    <nav className="bg-white border-b shadow-sm px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="font-bold text-lg text-primary">Course Pals</Link>
        <div className="hidden md:flex gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1 rounded hover:bg-gray-100 transition ${location.pathname === link.to ? "bg-primary text-white" : "text-gray-700"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="hidden md:inline text-sm text-gray-600">{user?.name}</span>
        <Link to="/profile" className="rounded-full bg-primary text-white px-3 py-1 text-sm">Profile</Link>
      </div>
    </nav>
  );
}
