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

// Author: Vishnu
// Polls page where students can create and vote on course-related polls
// Useful for scheduling study sessions or getting feedback on topics
export default function PollsPage() {
  // Store all polls (existing + newly created)
  const [localPolls, setLocalPolls] = useState(polls);
  
  // Toggle visibility of the poll creation form
  const [showCreate, setShowCreate] = useState(false);
  
  // Store the poll question being created
  const [question, setQuestion] = useState("");
  
  // Store poll options (starts with 2 empty options)
  const [options, setOptions] = useState(["", ""]);
  
  // Store which course the poll is for
  const [selectedCourse, setSelectedCourse] = useState("");

  // Add a new option field (up to 6 options allowed)
  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""]);
    }
  };

  // Remove an option field (minimum 2 required)
  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  // Update the text of a specific option
  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Create and publish a new poll
  const handleCreate = () => {
    // Validate that all required fields are filled
    if (!question.trim() || !selectedCourse || options.some((o) => !o.trim())) {
      toast.error("Please fill in all fields");
      return;
    }

    // Build new poll object
    const newPoll = {
      id: String(Date.now()),
      question,
      options: options.map((text, i) => ({ id: String(i), text, votes: 0 })),
      totalVotes: 0,
      createdBy: currentUser.name,
      course: selectedCourse,
    };

    // Add new poll to the top of the list
    setLocalPolls([newPoll, ...localPolls]);
    
    // Reset form fields
    setQuestion("");
    setOptions(["", ""]);
    setSelectedCourse("");
    setShowCreate(false);
    toast.success("Poll created!");
    // TODO: Send to backend
  };

  return (
    <div>
      {/* Page header with create poll button */}
      <PageHeader
        title="Polls"
        description="Create polls and vote on course-related questions."
      >
        <Button onClick={() => setShowCreate(!showCreate)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Poll
        </Button>
      </PageHeader>

      {/* Create Poll Form - only visible when showCreate is true */}
      {showCreate && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Create a New Poll</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Poll question input */}
            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                placeholder="What would you like to ask?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            {/* Course selection dropdown */}
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

            {/* Poll options input section */}
            <div className="space-y-2">
              <Label>Options</Label>
              {options.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                  />
                  {/* Only show remove button if more than 2 options */}
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
              {/* Only show add button if less than 6 options */}
              {options.length < 6 && (
                <Button variant="outline" size="sm" onClick={addOption}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Option
                </Button>
              )}
            </div>

            {/* Form action buttons */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreate(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate}>Create Poll</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Polls List - displays all polls in a 2-column grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {localPolls.map((poll) => (
          <PollCard key={poll.id} poll={poll} />
        ))}
      </div>

      {/* Empty state when no polls exist */}
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
