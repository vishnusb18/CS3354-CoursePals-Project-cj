// Login Function and Test Cases
function login(username, password) {
  const validUsername = "admin";
  const validPassword = "1234";
  if (username !== validUsername) return "Invalid username";
  if (password !== validPassword) return "Invalid password";
  return "Valid login";
}

console.log("Login Test 1:", login("admin", "1234")); // Valid login
console.log("Login Test 2:", login("admin", "wrong")); // Invalid password
console.log("Login Test 3:", login("user", "1234")); // Invalid username
console.log("Login Test 4:", login("", "")); // Invalid username

// Logout Function and Test Cases
function logout(isLoggedIn) {
  if (!isLoggedIn) return "User not logged in";
  return "Logout successful";
}

console.log("Logout Test 1:", logout(true));  // Logout successful
console.log("Logout Test 2:", logout(false)); // User not logged in

// Schedule Add/Remove Test Cases
let schedule = [];
function addCourse(course) {
  if (!course.code || !course.section) return "Missing fields";
  schedule.push(course);
  return "Course added";
}
function removeCourse(index) {
  if (index < 0 || index >= schedule.length) return "Invalid index";
  schedule.splice(index, 1);
  return "Course removed";
}

console.log("Add Course Test 1:", addCourse({ code: "CS 3354", section: "009" })); // Course added
console.log("Add Course Test 2:", addCourse({ code: "", section: "009" })); // Missing fields
console.log("Schedule after add:", schedule); // Should show one course
console.log("Remove Course Test 1:", removeCourse(0)); // Course removed
console.log("Remove Course Test 2:", removeCourse(5)); // Invalid index
console.log("Schedule after remove:", schedule); // Should be empty

// Profile Edit Test Case
let profile = { name: "Alex", major: "CS" };
function editProfile(field, value) {
  if (!profile.hasOwnProperty(field)) return "Invalid field";
  profile[field] = value;
  return "Profile updated";
}

console.log("Profile Edit Test 1:", editProfile("name", "Sam")); // Profile updated
console.log("Profile Edit Test 2:", editProfile("email", "test@utd.edu")); // Invalid field
console.log("Profile after edit:", profile);
