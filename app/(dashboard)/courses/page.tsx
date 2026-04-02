"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { CourseCard } from "@/components/course-card";
import { SearchBar } from "@/components/search-bar";
import { courses, myCourses } from "@/lib/data";
import { toast } from "sonner";

export default function CourseDirectoryPage() {
  const [search, setSearch] = useState("");
  const [enrolledIds, setEnrolledIds] = useState<string[]>(myCourses.map((c) => c.id));

  const filteredCourses = courses.filter(
    (course) =>
      course.code.toLowerCase().includes(search.toLowerCase()) ||
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.professor.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (courseId: string) => {
    setEnrolledIds((prev) => [...prev, courseId]);
    const course = courses.find((c) => c.id === courseId);
    toast.success(`Added ${course?.code} to your courses`);
    // TODO: Save to backend
  };

  const handleRemove = (courseId: string) => {
    setEnrolledIds((prev) => prev.filter((id) => id !== courseId));
    const course = courses.find((c) => c.id === courseId);
    toast.success(`Removed ${course?.code} from your courses`);
    // TODO: Save to backend
  };

  return (
    <div>
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

      {filteredCourses.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No courses found matching your search.</p>
        </div>
      )}
    </div>
  );
}
