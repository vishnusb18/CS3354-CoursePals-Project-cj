import React, { createContext, useState, useContext } from "react";

// Mock user for demo
const mockUser = {
  id: "u123",
  name: "Jane Doe",
  email: "jane.doe@utdallas.edu",
  major: "Computer Science",
  year: "Junior",
  avatar: "",
};

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // TODO: Replace with real auth logic
  const [user, setUser] = useState(mockUser);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
