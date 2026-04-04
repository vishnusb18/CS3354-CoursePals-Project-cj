"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { currentUser } from "@/lib/data";

export default function SchedulePage() {
  const [courses, setCourses] = useState(currentUser.schedule || []);
  const [form, setForm] = useState({
    courseCode: "",
    section: "",
    title: "",
    meeting: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAdd() {
    if (!form.courseCode || !form.section) return;
    setCourses([...courses, form]);
    setForm({ courseCode: "", section: "", title: "", meeting: "" });
  }

  function handleRemove(idx: number) {
    setCourses(courses.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <PageHeader
        title="My Schedule"
        description="Add your enrolled courses and sections. You'll be matched with students in the same section."
      />
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end">
        <Input
          name="courseCode"
          placeholder="Course Code (e.g. CS 3354)"
          value={form.courseCode}
          onChange={handleChange}
          className="sm:w-40"
        />
        <Input
          name="section"
          placeholder="Section (e.g. 009)"
          value={form.section}
          onChange={handleChange}
          className="sm:w-24"
        />
        <Input
          name="title"
          placeholder="Course Title (optional)"
          value={form.title}
          onChange={handleChange}
          className="sm:w-56"
        />
        <Input
          name="meeting"
          placeholder="Meeting Time (optional)"
          value={form.meeting}
          onChange={handleChange}
          className="sm:w-56"
        />
        <Button onClick={handleAdd} className="sm:w-auto">Add</Button>
      </div>
      <div>
        {courses.length === 0 ? (
          <p className="text-muted-foreground">No courses added yet. Add your classes above.</p>
        ) : (
          <ul className="space-y-2">
            {courses.map((c, idx) => (
              <li key={idx} className="flex items-center gap-2 border-b pb-2">
                <span className="font-mono">{c.courseCode}-{c.section}</span>
                {c.title && <span className="text-sm text-muted-foreground">{c.title}</span>}
                {c.meeting && <span className="text-xs text-muted-foreground">({c.meeting})</span>}
                <Button variant="outline" size="sm" onClick={() => handleRemove(idx)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
