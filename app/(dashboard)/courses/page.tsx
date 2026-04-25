"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { CourseCard } from "@/components/course-card";
import { SearchBar } from "@/components/search-bar";
import { courses, myCourses } from "@/lib/data";
import { toast } from "sonner";

// Main page component for the course directory
// Allows students to browse all available courses and enroll/unenroll
export default function CourseDirectoryPage() {
  // Track search input for filtering courses
  const [search, setSearch] = useState("");
  
  // Keep track of which courses the student is enrolled in
  // Initialize with the IDs from myCourses data
  const [enrolledIds, setEnrolledIds] = useState<string[]>(myCourses.map((c) => c.id));

  // Filter courses based on search input
  // Searches across course code, name, and professor name
  const filteredCourses = courses.filter(
    (course) =>
      course.code.toLowerCase().includes(search.toLowerCase()) ||
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.professor.toLowerCase().includes(search.toLowerCase())
  );

  // Handle adding a course to the student's enrolled courses
  const handleAdd = (courseId: string) => {
    // Add the course ID to the enrolled list
    setEnrolledIds((prev) => [...prev, courseId]);
    const course = courses.find((c) => c.id === courseId);
    toast.success(`Added ${course?.code} to your courses`);
    // TODO: Save to backend
  };

  // Handle removing a course from the student's enrolled courses
  const handleRemove = (courseId: string) => {
    // Filter out the removed course ID
    setEnrolledIds((prev) => prev.filter((id) => id !== courseId));
    const course = courses.find((c) => c.id === courseId);
    toast.success(`Removed ${course?.code} from your courses`);
    // TODO: Save to backend
  };

  return (
    <div>
      {/* Page header with title and search bar */}
      <PageHeader
        title="Course Directory"
        description="Browse available courses and add them to your schedule."
      >
        <SearchBar
          placeholder="Search courses..."
          value={search}
          onChange={setSearch}
          className="w-full sm:w-64"
        />
      </PageHeader>

      {/* Grid layout that displays all filtered courses */}
      {/* Responsive: 1 column on mobile, up to 4 columns on extra large screens */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isEnrolled={enrolledIds.includes(course.id)}
            onAdd={() => handleAdd(course.id)}
            onRemove={() => handleRemove(course.id)}
          />
        ))}
      </div>

      {/* Display empty state message when no courses match the search */}
      {filteredCourses.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No courses found matching your search.</p>
        </div>
      )}
    </div>
  );
}
