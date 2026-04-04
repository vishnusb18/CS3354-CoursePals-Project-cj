"use client";


import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StudentCard } from "@/components/student-card";
import { currentUser, recommendedStudents } from "@/lib/data";


export default function PalsPage() {
  // Combine current user and recommended students for matching
  const allUsers = [currentUser, ...recommendedStudents];
  const mySections = currentUser.schedule || [];

  // Dummy data for empty state
  const dummyGroups = [
    {
      courseCode: "CS 1010",
      section: "001",
      title: "Intro to College",
      meeting: "MWF 9:00-9:50",
      members: [
        { id: "d1", name: "Demo Student", major: "Undeclared", year: "Freshman", bio: "This is a demo student.", avatar: "", schedule: [] },
      ],
    },
  ];

  // For each section, find all users in that exact section
  const sectionGroups = mySections.map((mySection) => {
    const groupMembers = allUsers.filter((user) =>
      (user.schedule || []).some(
        (s) =>
          s.courseCode === mySection.courseCode &&
          s.section === mySection.section
      )
    );
    return {
      ...mySection,
      members: groupMembers,
    };
  });

  const showDummy = sectionGroups.length === 0;

  return (
    <div>
      <PageHeader
        title="My Section Groups"
        description="See and connect with students in your exact course sections."
      />
      {showDummy ? (
        <div className="space-y-8">
          {dummyGroups.map((group) => (
            <div key={group.courseCode + group.section} className="border rounded-lg p-4 opacity-60">
              <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-semibold text-lg">
                    {group.courseCode}-{group.section}
                    {group.title && <span className="ml-2 text-base text-muted-foreground">{group.title}</span>}
                  </h2>
                  {group.meeting && <div className="text-sm text-muted-foreground">{group.meeting}</div>}
                </div>
                <div className="mt-2 sm:mt-0 text-sm text-muted-foreground">
                  {group.members.length} student in this section
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.members.map((student) => {
                  // Compute shared courses for this group
                  const sharedCourses = (student.schedule || [])
                    .filter((s) =>
                      s.courseCode === group.courseCode &&
                      s.section === group.section
                    )
                    .map((s) => `${s.courseCode}-${s.section}`);
                  return (
                    <StudentCard
                      key={student.id}
                      student={{ ...student, sharedCourses }}
                    />
                  );
                })}
              </div>
              <div className="py-6 text-center">
                <p className="text-muted-foreground">Add your real courses to see actual matches.</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {sectionGroups.map((group) => (
            <div key={group.courseCode + group.section} className="border rounded-lg p-4">
              <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-semibold text-lg">
                    {group.courseCode}-{group.section}
                    {group.title && <span className="ml-2 text-base text-muted-foreground">{group.title}</span>}
                  </h2>
                  {group.meeting && <div className="text-sm text-muted-foreground">{group.meeting}</div>}
                </div>
                <div className="mt-2 sm:mt-0 text-sm text-muted-foreground">
                  {group.members.length} student{group.members.length !== 1 ? "s" : ""} in this section
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.members.map((student) => {
                  // For dummy, sharedCourses is just the group course-section
                  const sharedCourses = [`${group.courseCode}-${group.section}`];
                  return (
                    <StudentCard
                      key={student.id}
                      student={{ ...student, sharedCourses }}
                    />
                  );
                })}
              </div>
              {group.members.length === 1 && (
                <div className="py-6 text-center">
                  <p className="text-muted-foreground">You’re the first person in this section so far.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
