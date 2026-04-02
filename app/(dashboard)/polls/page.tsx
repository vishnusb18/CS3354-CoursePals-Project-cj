"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { PollCard } from "@/components/poll-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { polls, myCourses, currentUser } from "@/lib/data";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

export default function PollsPage() {
  const [localPolls, setLocalPolls] = useState(polls);
  const [showCreate, setShowCreate] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [selectedCourse, setSelectedCourse] = useState("");

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""]);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreate = () => {
    if (!question.trim() || !selectedCourse || options.some((o) => !o.trim())) {
      toast.error("Please fill in all fields");
      return;
    }

    const newPoll = {
      id: String(Date.now()),
      question,
      options: options.map((text, i) => ({ id: String(i), text, votes: 0 })),
      totalVotes: 0,
      createdBy: currentUser.name,
      course: selectedCourse,
    };

    setLocalPolls([newPoll, ...localPolls]);
    setQuestion("");
    setOptions(["", ""]);
    setSelectedCourse("");
    setShowCreate(false);
    toast.success("Poll created!");
    // TODO: Send to backend
  };

  return (
    <div>
      <PageHeader
        title="Polls"
        description="Create polls and vote on course-related questions."
      >
        <Button onClick={() => setShowCreate(!showCreate)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Poll
        </Button>
      </PageHeader>

      {/* Create Poll Form */}
      {showCreate && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Create a New Poll</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                placeholder="What would you like to ask?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {myCourses.map((course) => (
                    <SelectItem key={course.id} value={course.code}>
                      {course.code} - {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Options</Label>
              {options.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                  />
                  {options.length > 2 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeOption(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              {options.length < 6 && (
                <Button variant="outline" size="sm" onClick={addOption}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Option
                </Button>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreate(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate}>Create Poll</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Polls List */}
      <div className="grid gap-4 md:grid-cols-2">
        {localPolls.map((poll) => (
          <PollCard key={poll.id} poll={poll} />
        ))}
      </div>

      {localPolls.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No polls yet. Create one to get started!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
