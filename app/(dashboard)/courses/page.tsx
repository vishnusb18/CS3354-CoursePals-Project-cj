"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { getClientFirestore } from "@/lib/firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { PageHeader } from "@/components/page-header";
import { CourseCard } from "@/components/course-card";
import { SearchBar } from "@/components/search-bar";
import { courses } from "@/lib/data";
import { toast } from "sonner";

// Author: Vishnu
// Main page component for the course directory
// Allows students to browse all available courses and enroll/unenroll
export default function CourseDirectoryPage() {
  // Track search input for filtering courses
  const [search, setSearch] = useState("");
  
  // Auth and Firestore
  const { user } = useAuth();
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
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
          setEnrolledIds(Array.isArray(data.courses) ? data.courses : []);
        }
      } catch (e) {
        setEnrolledIds([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [user]);

  // Filter courses based on search input
  // Searches across course code, name, and professor name
  const filteredCourses = courses.filter(
    (course) =>
      course.code.toLowerCase().includes(search.toLowerCase()) ||
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.professor.toLowerCase().includes(search.toLowerCase())
  );

  // Handle adding a course to the student's enrolled courses
  // Add a course to Firestore
  const handleAdd = async (courseId: string) => {
    if (!user) return;
    const db = getClientFirestore();
    const profileRef = doc(db, "profiles", user.uid);
    const newIds = [...enrolledIds, courseId];
    setEnrolledIds(newIds);
    try {
      await setDoc(profileRef, { courses: newIds }, { merge: true });
      const course = courses.find((c) => c.id === courseId);
      toast.success(`Added ${course?.code} to your courses`);
    } catch {
      toast.error("Failed to add course");
    }
  };

  // Remove a course from Firestore
  const handleRemove = async (courseId: string) => {
    if (!user) return;
    const db = getClientFirestore();
    const profileRef = doc(db, "profiles", user.uid);
    const newIds = enrolledIds.filter((id) => id !== courseId);
    setEnrolledIds(newIds);
    try {
      await setDoc(profileRef, { courses: newIds }, { merge: true });
      const course = courses.find((c) => c.id === courseId);
      toast.success(`Removed ${course?.code} from your courses`);
    } catch {
      toast.error("Failed to remove course");
    }
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

      {loading ? (
        <div className="py-12 text-center">Loading your courses...</div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
