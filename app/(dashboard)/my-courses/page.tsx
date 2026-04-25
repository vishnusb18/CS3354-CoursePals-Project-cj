"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { CourseCard } from "@/components/course-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { courses, myCourses } from "@/lib/data";
import { Plus, Users } from "lucide-react";
import { toast } from "sonner";

// Haris: The system displays suggested courses based on major (Draft V3)
// Note: The system shows empty state if no courses added
const suggestedCourses = courses.filter((c) => !myCourses.find((mc) => mc.id === c.id)).slice(0, 3);

export default function MyCoursesPage() {
  const [enrolledCourses, setEnrolledCourses] = useState(myCourses);

  const handleRemove = (courseId: string) => {
    const course = enrolledCourses.find((c) => c.id === courseId);
    setEnrolledCourses((prev) => prev.filter((c) => c.id !== courseId));
    toast.success(`Removed ${course?.code} from your courses`);
    // TODO: Save to backend --> (CSV file)
  };

  const handleAddSuggested = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (course && !enrolledCourses.find((c) => c.id === courseId)) {
      setEnrolledCourses((prev) => [...prev, course]);
      toast.success(`Added ${course.code} to your courses`);
      // TODO: Save to backend --> (CSV File)
    }
  };

  // Display enrolled courses with option to remove,
  // and show suggested courses with option to add
  // If no enrolled courses, show empty state with link to browse courses
  // TODO: implement the backend saving logic
  return (
    <div>
      <PageHeader
        title = "My Courses"
        description = "Manage your enrolled courses for this semester."
      >
        <Button asChild>
          <Link href = "/courses">
            <Plus className = "mr-2 h-4 w-4" />
            Add Course
          </Link>
        </Button>
      </PageHeader>

      {enrolledCourses.length > 0 ? (
        <div className = "mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map((course) => (
            <CourseCard
              key = {course.id}
              course = {course}
              isEnrolled
              onRemove = {() => handleRemove(course.id)}
            />
          ))}
        </div>
      ) : (
        <Card className = "mb-8">
          <CardContent className = "flex flex-col items-center justify-center py-12">
            <p className = "mb-4 text-muted-foreground">You haven&apos;t added any courses yet.</p>
            <Button asChild>
              <Link href = "/courses">Browse Course Directory</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Suggested Courses */}
      <Card>
        <CardHeader>
          <CardTitle className = "text-lg">Suggested for You</CardTitle>
          <p className = "text-sm text-muted-foreground">
            Based on your major and academic year
          </p>
        </CardHeader>
        <CardContent>
          <div className = "space-y-3">
            {suggestedCourses.map((course) => (
              <div
                key = {course.id}
                className = "flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div>
                  <div className = "mb-1 flex items-center gap-2">
                    <Badge variant = "secondary" className = "bg-primary/10 text-primary">
                      {course.code}
                    </Badge>
                    <Badge variant = "outline">{course.semester}</Badge>
                  </div>
                  <p className = "font-medium text-foreground">{course.name}</p>
                  <div className = "mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{course.professor}</span>
                    <span className = "flex items-center gap-1">
                      <Users className = "h-3 w-3" />
                      {course.enrolled} enrolled
                    </span>
                  </div>
                </div>
                <Button
                  size = "sm"
                  onClick = {() => handleAddSuggested(course.id)}
                  disabled = {enrolledCourses.some((c) => c.id === course.id)}
                >
                  <Plus className = "mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
