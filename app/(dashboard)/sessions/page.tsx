"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StudySessionCard } from "@/components/study-session-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { studySessions, myCourses, currentUser } from "@/lib/data";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function StudySessionsPage() {
  const [localSessions, setLocalSessions] = useState(studySessions);
  const [showCreate, setShowCreate] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    date: "",
    time: "",
    location: "",
  });

  const handleJoin = (sessionId: string) => {
    setLocalSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId ? { ...s, joined: true, attendees: s.attendees + 1 } : s
      )
    );
    toast.success("Joined study session!");
    // TODO: Send to backend
  };

  const handleLeave = (sessionId: string) => {
    setLocalSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId ? { ...s, joined: false, attendees: s.attendees - 1 } : s
      )
    );
    toast.success("Left study session");
    // TODO: Send to backend
  };

  const handleCreate = () => {
    if (!formData.title || !formData.course || !formData.date || !formData.time || !formData.location) {
      toast.error("Please fill in all fields");
      return;
    }

    const newSession = {
      id: String(Date.now()),
      title: formData.title,
      course: formData.course,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      organizer: currentUser.name,
      attendees: 1,
      joined: true,
    };

    setLocalSessions([newSession, ...localSessions]);
    setFormData({ title: "", course: "", date: "", time: "", location: "" });
    setShowCreate(false);
    toast.success("Study session created!");
    // TODO: Send to backend
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <PageHeader
        title="Study Sessions"
        description="Organize and join study sessions with your classmates."
      >
        <Button onClick={() => setShowCreate(!showCreate)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Session
        </Button>
      </PageHeader>

      {/* Create Session Form */}
      {showCreate && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Create a Study Session</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Session Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Midterm Review"
                  value={formData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Select value={formData.course} onValueChange={(v) => updateField("course", v)}>
                  <SelectTrigger id="course">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {myCourses.map((course) => (
                      <SelectItem key={course.id} value={course.code}>
                        {course.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => updateField("date", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  placeholder="e.g., 2:00 PM - 4:00 PM"
                  value={formData.time}
                  onChange={(e) => updateField("time", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Library 3rd Floor, Room 301"
                value={formData.location}
                onChange={(e) => updateField("location", e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreate(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate}>Create Session</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sessions Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {localSessions.map((session) => (
          <StudySessionCard
            key={session.id}
            session={session}
            onJoin={() => handleJoin(session.id)}
            onLeave={() => handleLeave(session.id)}
          />
        ))}
      </div>

      {localSessions.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No study sessions yet. Create one to get started!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
