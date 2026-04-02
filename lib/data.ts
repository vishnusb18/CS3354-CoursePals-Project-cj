// Mock data for Course Pals

export const currentUser = {
  id: "1",
  name: "Alex Johnson",
  email: "axj123456@utdallas.edu",
  major: "Computer Science",
  year: "Junior",
  bio: "Passionate about software development and machine learning. Looking for study partners in CS courses!",
  avatar: "/avatars/alex.jpg",
  textNotifications: true,
};

export const courses = [
  { id: "1", code: "CS 3345", name: "Data Structures and Algorithms", professor: "Dr. Smith", enrolled: 45, semester: "Fall 2026" },
  { id: "2", code: "CS 3354", name: "Software Engineering", professor: "Dr. Chen", enrolled: 38, semester: "Fall 2026" },
  { id: "3", code: "CS 4348", name: "Operating Systems", professor: "Dr. Williams", enrolled: 32, semester: "Fall 2026" },
  { id: "4", code: "CS 4349", name: "Advanced Algorithm Design", professor: "Dr. Davis", enrolled: 28, semester: "Fall 2026" },
  { id: "5", code: "CS 4347", name: "Database Systems", professor: "Dr. Martinez", enrolled: 35, semester: "Fall 2026" },
  { id: "6", code: "MATH 2418", name: "Linear Algebra", professor: "Dr. Brown", enrolled: 52, semester: "Fall 2026" },
  { id: "7", code: "ECS 3390", name: "Professional Communication", professor: "Dr. Taylor", enrolled: 40, semester: "Fall 2026" },
  { id: "8", code: "CS 4361", name: "Computer Graphics", professor: "Dr. Anderson", enrolled: 25, semester: "Fall 2026" },
];

export const myCourses = [
  { id: "1", code: "CS 3345", name: "Data Structures and Algorithms", professor: "Dr. Smith", enrolled: 45, semester: "Fall 2026" },
  { id: "2", code: "CS 3354", name: "Software Engineering", professor: "Dr. Chen", enrolled: 38, semester: "Fall 2026" },
  { id: "5", code: "CS 4347", name: "Database Systems", professor: "Dr. Martinez", enrolled: 35, semester: "Fall 2026" },
];

export const recommendedStudents = [
  { id: "2", name: "Sarah Kim", major: "Computer Science", year: "Junior", sharedCourses: ["CS 3345", "CS 3354"], avatar: "/avatars/sarah.jpg" },
  { id: "3", name: "Michael Chen", major: "Software Engineering", year: "Senior", sharedCourses: ["CS 3354", "CS 4347"], avatar: "/avatars/michael.jpg" },
  { id: "4", name: "Emily Davis", major: "Computer Science", year: "Junior", sharedCourses: ["CS 3345"], avatar: "/avatars/emily.jpg" },
  { id: "5", name: "James Wilson", major: "Data Science", year: "Junior", sharedCourses: ["CS 3345", "CS 4347"], avatar: "/avatars/james.jpg" },
  { id: "6", name: "Maria Garcia", major: "Computer Science", year: "Sophomore", sharedCourses: ["CS 3345"], avatar: "/avatars/maria.jpg" },
  { id: "7", name: "David Lee", major: "Information Technology", year: "Junior", sharedCourses: ["CS 3354"], avatar: "/avatars/david.jpg" },
];

export const conversations = [
  {
    id: "1",
    participant: { id: "2", name: "Sarah Kim", avatar: "/avatars/sarah.jpg" },
    lastMessage: "Hey! Are you free to study for the midterm?",
    timestamp: "2 min ago",
    unread: true,
  },
  {
    id: "2",
    participant: { id: "3", name: "Michael Chen", avatar: "/avatars/michael.jpg" },
    lastMessage: "Thanks for the notes!",
    timestamp: "1 hour ago",
    unread: false,
  },
  {
    id: "3",
    participant: { id: "4", name: "Emily Davis", avatar: "/avatars/emily.jpg" },
    lastMessage: "See you at the study session tomorrow",
    timestamp: "Yesterday",
    unread: false,
  },
];

export const messages: Record<string, Array<{ id: string; senderId: string; content: string; timestamp: string }>> = {
  "1": [
    { id: "1", senderId: "2", content: "Hey Alex! I noticed we have CS 3345 together.", timestamp: "10:30 AM" },
    { id: "2", senderId: "1", content: "Hi Sarah! Yes, it's a tough class. Are you keeping up with the assignments?", timestamp: "10:32 AM" },
    { id: "3", senderId: "2", content: "Barely! The binary search trees section is confusing me.", timestamp: "10:35 AM" },
    { id: "4", senderId: "1", content: "I can help with that! Want to meet up this weekend?", timestamp: "10:36 AM" },
    { id: "5", senderId: "2", content: "That would be great! How about Saturday at the library?", timestamp: "10:38 AM" },
    { id: "6", senderId: "1", content: "Perfect, let's do 2 PM at the 3rd floor study area.", timestamp: "10:40 AM" },
    { id: "7", senderId: "2", content: "Hey! Are you free to study for the midterm?", timestamp: "Just now" },
  ],
  "2": [
    { id: "1", senderId: "3", content: "Hey, did you finish the software engineering assignment?", timestamp: "Yesterday" },
    { id: "2", senderId: "1", content: "Yes! Just submitted it. It was quite challenging.", timestamp: "Yesterday" },
    { id: "3", senderId: "3", content: "Could you share your notes from last lecture? I missed it.", timestamp: "Yesterday" },
    { id: "4", senderId: "1", content: "Sure thing! I'll send them over.", timestamp: "Yesterday" },
    { id: "5", senderId: "3", content: "Thanks for the notes!", timestamp: "1 hour ago" },
  ],
  "3": [
    { id: "1", senderId: "4", content: "Are you going to the study session for DS&A?", timestamp: "Yesterday" },
    { id: "2", senderId: "1", content: "Yes, planning to be there!", timestamp: "Yesterday" },
    { id: "3", senderId: "4", content: "Great! I'll bring the practice problems.", timestamp: "Yesterday" },
    { id: "4", senderId: "1", content: "Awesome, see you there!", timestamp: "Yesterday" },
    { id: "5", senderId: "4", content: "See you at the study session tomorrow", timestamp: "Yesterday" },
  ],
};

export const groupChats = [
  {
    id: "1",
    name: "CS 3345 Study Group",
    course: "CS 3345",
    members: 12,
    lastMessage: "Does anyone have notes from today's lecture?",
    timestamp: "5 min ago",
  },
  {
    id: "2",
    name: "Software Engineering Team",
    course: "CS 3354",
    members: 6,
    lastMessage: "Meeting tomorrow at 3 PM for sprint planning",
    timestamp: "30 min ago",
  },
  {
    id: "3",
    name: "Database Project Group",
    course: "CS 4347",
    members: 4,
    lastMessage: "I finished the ER diagram, check it out!",
    timestamp: "2 hours ago",
  },
];

export const groupMessages: Record<string, Array<{ id: string; senderId: string; senderName: string; content: string; timestamp: string }>> = {
  "1": [
    { id: "1", senderId: "3", senderName: "Michael Chen", content: "Hey everyone, how's the homework going?", timestamp: "10:00 AM" },
    { id: "2", senderId: "2", senderName: "Sarah Kim", content: "Stuck on problem 4, anyone figure it out?", timestamp: "10:05 AM" },
    { id: "3", senderId: "5", senderName: "James Wilson", content: "I think you need to use a min-heap for that one", timestamp: "10:08 AM" },
    { id: "4", senderId: "2", senderName: "Sarah Kim", content: "Oh that makes sense! Thanks James!", timestamp: "10:10 AM" },
    { id: "5", senderId: "4", senderName: "Emily Davis", content: "Does anyone have notes from today's lecture?", timestamp: "Just now" },
  ],
};

export const feedPosts = [
  {
    id: "1",
    authorId: "2",
    authorName: "Sarah Kim",
    authorAvatar: "/avatars/sarah.jpg",
    course: "CS 3345",
    content: "Just finished implementing a red-black tree! It was challenging but really satisfying to see it work.",
    timestamp: "2 hours ago",
    attachment: null,
  },
  {
    id: "2",
    authorId: "3",
    authorName: "Michael Chen",
    authorAvatar: "/avatars/michael.jpg",
    course: "CS 3354",
    content: "Anyone else struggling with the use case diagrams? I keep mixing up include and extend relationships.",
    timestamp: "4 hours ago",
    attachment: null,
  },
  {
    id: "3",
    authorId: "4",
    authorName: "Emily Davis",
    authorAvatar: "/avatars/emily.jpg",
    course: "CS 3345",
    content: "Sharing my notes from today's lecture on graph algorithms. Hope it helps!",
    timestamp: "Yesterday",
    attachment: { name: "Graph_Algorithms_Notes.pdf", type: "pdf" },
  },
  {
    id: "4",
    authorId: "5",
    authorName: "James Wilson",
    authorAvatar: "/avatars/james.jpg",
    course: "CS 4347",
    content: "Pro tip: Always normalize your database to at least 3NF before adding indexes. Learned this the hard way!",
    timestamp: "Yesterday",
    attachment: null,
  },
];

export const polls = [
  {
    id: "1",
    question: "Best time for the CS 3345 study session?",
    options: [
      { id: "1", text: "Saturday 2 PM", votes: 12 },
      { id: "2", text: "Saturday 6 PM", votes: 8 },
      { id: "3", text: "Sunday 3 PM", votes: 15 },
    ],
    totalVotes: 35,
    createdBy: "Sarah Kim",
    course: "CS 3345",
  },
  {
    id: "2",
    question: "Which topic should we review next?",
    options: [
      { id: "1", text: "Binary Search Trees", votes: 20 },
      { id: "2", text: "Hash Tables", votes: 18 },
      { id: "3", text: "Graph Algorithms", votes: 25 },
      { id: "4", text: "Dynamic Programming", votes: 22 },
    ],
    totalVotes: 85,
    createdBy: "Michael Chen",
    course: "CS 3345",
  },
];

export const studySessions = [
  {
    id: "1",
    title: "Midterm Review Session",
    course: "CS 3345",
    date: "April 5, 2026",
    time: "2:00 PM - 4:00 PM",
    location: "Library 3rd Floor, Room 301",
    organizer: "Sarah Kim",
    attendees: 8,
    joined: true,
  },
  {
    id: "2",
    title: "Sprint Planning Meeting",
    course: "CS 3354",
    date: "April 3, 2026",
    time: "3:00 PM - 4:30 PM",
    location: "ECSS 2.415",
    organizer: "Michael Chen",
    attendees: 5,
    joined: true,
  },
  {
    id: "3",
    title: "Database Design Workshop",
    course: "CS 4347",
    date: "April 7, 2026",
    time: "1:00 PM - 3:00 PM",
    location: "Online - Zoom",
    organizer: "James Wilson",
    attendees: 12,
    joined: false,
  },
  {
    id: "4",
    title: "Algorithm Practice Session",
    course: "CS 3345",
    date: "April 10, 2026",
    time: "4:00 PM - 6:00 PM",
    location: "SLC Study Room 4",
    organizer: "Emily Davis",
    attendees: 6,
    joined: false,
  },
];

export const notifications = [
  { id: "1", type: "message", content: "Sarah Kim sent you a message", timestamp: "2 min ago", read: false },
  { id: "2", type: "poll", content: "New poll in CS 3345: Best time for study session?", timestamp: "1 hour ago", read: false },
  { id: "3", type: "session", content: "Reminder: Midterm Review Session tomorrow at 2 PM", timestamp: "3 hours ago", read: true },
  { id: "4", type: "feed", content: "Emily Davis posted in CS 3345 feed", timestamp: "Yesterday", read: true },
  { id: "5", type: "course", content: "You were added to CS 4347 - Database Systems", timestamp: "2 days ago", read: true },
  { id: "6", type: "message", content: "Michael Chen sent you a message", timestamp: "2 days ago", read: true },
];
