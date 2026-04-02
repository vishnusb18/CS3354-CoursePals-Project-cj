"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StudentCard } from "@/components/student-card";
import { SearchBar } from "@/components/search-bar";
import { recommendedStudents } from "@/lib/data";

export default function PalsPage() {
  const [search, setSearch] = useState("");

  const filteredStudents = recommendedStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.major.toLowerCase().includes(search.toLowerCase()) ||
      student.sharedCourses.some((course) =>
        course.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div>
      <PageHeader
        title="Find Course Pals"
        description="Discover classmates in your courses and connect with potential study partners."
      >
        <SearchBar
          placeholder="Search by name, major, or course..."
          value={search}
          onChange={setSearch}
          className="w-full sm:w-72"
        />
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredStudents.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No students found matching your search.</p>
        </div>
      )}
    </div>
  );
}
