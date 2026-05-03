// Simple in-memory backend for demo purposes
// This file simulates a backend for profile and messaging

let profileData = {
  name: "Demo User",
  email: "demo@utd.edu",
  major: "Computer Science",
  year: "Senior",
  grade: "A",
  bio: "This is a demo bio.",
  textNotifications: true,
};

let messagesData = {
  "1": [
    { id: "1", senderId: "1", content: "Hello!", timestamp: "2026-05-02" },
  ],
};

export function getProfile() {
  return profileData;
}

export function updateProfile(newProfile) {
  profileData = { ...profileData, ...newProfile };
  return profileData;
}

export function getMessages(conversationId) {
  return messagesData[conversationId] || [];
}

export function sendMessage(conversationId, message) {
  if (!messagesData[conversationId]) messagesData[conversationId] = [];
  messagesData[conversationId].push(message);
  return messagesData[conversationId];
}
