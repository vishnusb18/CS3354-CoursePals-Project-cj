import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import MyCourses from "./pages/MyCourses";
import CourseFeed from "./pages/CourseFeed";
import Pals from "./pages/Pals";
import Messages from "./pages/Messages";
import GroupChats from "./pages/GroupChats";
import Polls from "./pages/Polls";
import StudySessions from "./pages/StudySessions";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import { AuthProvider } from "./contexts/AuthContext";
import { AppDataProvider } from "./contexts/AppDataContext";

function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppDataProvider>
        <Router>
          <Routes>
            {/* Public routes (add login/signup if needed) */}
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/signup" element={<Signup />} /> */}

            {/* Protected app routes */}
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/my-courses" element={<MyCourses />} />
              <Route path="/course/:courseId/feed" element={<CourseFeed />} />
              <Route path="/pals" element={<Pals />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/group-chats" element={<GroupChats />} />
              <Route path="/polls" element={<Polls />} />
              <Route path="/study-sessions" element={<StudySessions />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AppDataProvider>
    </AuthProvider>
  );
}
