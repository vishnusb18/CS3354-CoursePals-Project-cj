"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { getClientFirestore } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { CourseCard } from "@/components/course-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { courses } from "@/lib/data";
import { Plus, Users } from "lucide-react";
import { toast } from "sonner";

// Haris: The system displays suggested courses based on major (Draft V3)
// Note: The system shows empty state if no courses added
// We'll filter suggested courses after loading enrolled

export default function MyCoursesPage() {
  const { user } = useAuth();
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<typeof courses>([]);
  const [loading, setLoading] = useState(true);

  // Load enrolled courses from Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const db = getClientFirestore();
        const profileRef = doc(db, "profiles", user.uid);
        const snap = await getDoc(profileRef);
        if (snap.exists()) {
          const data = snap.data();
          const ids = Array.isArray(data.courses) ? data.courses : [];
          setEnrolledIds(ids);
          setEnrolledCourses(courses.filter((c) => ids.includes(c.id)));
        } else {
          setEnrolledIds([]);
          setEnrolledCourses([]);
        }
      } catch {
        setEnrolledIds([]);
        setEnrolledCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [user]);

  // Remove a course from Firestore
  const handleRemove = async (courseId: string) => {
    if (!user) return;
    const db = getClientFirestore();
    const profileRef = doc(db, "profiles", user.uid);
    const newIds = enrolledIds.filter((id) => id !== courseId);
    setEnrolledIds(newIds);
    setEnrolledCourses(courses.filter((c) => newIds.includes(c.id)));
    try {
      await setDoc(profileRef, { courses: newIds }, { merge: true });
      const course = courses.find((c) => c.id === courseId);
      toast.success(`Removed ${course?.code} from your courses`);
    } catch {
      toast.error("Failed to remove course");
    }
  };

  // Add a suggested course to Firestore
  const handleAddSuggested = async (courseId: string) => {
    if (!user) return;
    const db = getClientFirestore();
    const profileRef = doc(db, "profiles", user.uid);
    const newIds = [...enrolledIds, courseId];
    setEnrolledIds(newIds);
    setEnrolledCourses(courses.filter((c) => newIds.includes(c.id)));
    try {
      await setDoc(profileRef, { courses: newIds }, { merge: true });
      const course = courses.find((c) => c.id === courseId);
      toast.success(`Added ${course?.code} to your courses`);
    } catch {
      toast.error("Failed to add course");
    }
  };

  // Filter suggested courses based on enrolledIds
  const suggestedCourses = courses.filter((c) => !enrolledIds.includes(c.id)).slice(0, 3);

  return (
    <div>
      <PageHeader
        title="My Courses"
        description="Manage your enrolled courses for this semester."
      >
        <Button asChild>
          <Link href="/courses">
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Link>
        </Button>
      </PageHeader>

      {loading ? (
        <div className="py-12 text-center">Loading your courses...</div>
      ) : enrolledCourses.length > 0 ? (
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled
              onRemove={() => handleRemove(course.id)}
            />
          ))}
        </div>
      ) : (
        <Card className="mb-8">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="mb-4 text-muted-foreground">You haven&apos;t added any courses yet.</p>
            <Button asChild>
              <Link href="/courses">Browse Course Directory</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Suggested Courses */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Suggested for You</CardTitle>
          <p className="text-sm text-muted-foreground">
            Based on your major and academic year
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {suggestedCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {course.code}
                    </Badge>
                    <Badge variant="outline">{course.semester}</Badge>
                  </div>
                  <p className="font-medium text-foreground">{course.name}</p>
                  <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{course.professor}</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {course.enrolled} enrolled
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleAddSuggested(course.id)}
                  disabled={enrolledIds.includes(course.id)}
                >
                  <Plus className="mr-2 h-4 w-4" />
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
