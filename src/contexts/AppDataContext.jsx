import React, { createContext, useContext, useState } from "react";
import mockUser from "../data/mockUser";
import mockUsers from "../data/mockUsers";
import mockCourses from "../data/mockCourses";
import mockUserCourses from "../data/mockUserCourses";
import mockMessages from "../data/mockMessages";
import mockGroupChats from "../data/mockGroupChats";
import mockFeedPosts from "../data/mockFeedPosts";
import mockPolls from "../data/mockPolls";
import mockStudySessions from "../data/mockStudySessions";
import mockNotifications from "../data/mockNotifications";

const AppDataContext = createContext();

export function AppDataProvider({ children }) {
  // TODO: Replace with backend/Firebase integration
  const [user, setUser] = useState(mockUser);
  const [users, setUsers] = useState(mockUsers);
  const [courses, setCourses] = useState(mockCourses);
  const [userCourses, setUserCourses] = useState(mockUserCourses);
  const [messages, setMessages] = useState(mockMessages);
  const [groupChats, setGroupChats] = useState(mockGroupChats);
  const [feedPosts, setFeedPosts] = useState(mockFeedPosts);
  const [polls, setPolls] = useState(mockPolls);
  const [studySessions, setStudySessions] = useState(mockStudySessions);
  const [notifications, setNotifications] = useState(mockNotifications);

  return (
    <AppDataContext.Provider
      value={{
        user, setUser,
        users, setUsers,
        courses, setCourses,
        userCourses, setUserCourses,
        messages, setMessages,
        groupChats, setGroupChats,
        feedPosts, setFeedPosts,
        polls, setPolls,
        studySessions, setStudySessions,
        notifications, setNotifications,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  return useContext(AppDataContext);
}
