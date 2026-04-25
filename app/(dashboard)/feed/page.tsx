"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { feedPosts, myCourses, currentUser } from "@/lib/data";
import { Paperclip, FileText, Send } from "lucide-react";
import { toast } from "sonner";

// Author: Vishnu
// Course feed page where students can post updates and view classmates' posts
// Similar to a social media feed but filtered by course
export default function FeedPage() {
  // Track which course filter is selected
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  
  // Text content for new post being composed
  const [newPost, setNewPost] = useState("");
  
  // Local state for posts (includes initial posts and new ones)
  const [localPosts, setLocalPosts] = useState(feedPosts);

  // Filter posts by selected course, or show all if "all" is selected
  const filteredPosts = selectedCourse === "all"
    ? localPosts
    : localPosts.filter((post) => post.course === selectedCourse);

  // Create and publish a new post
  const handlePost = () => {
    // Don't post if the text area is empty
    if (!newPost.trim()) return;

    // Create new post object with current user info
    const post = {
      id: String(Date.now()),
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      course: selectedCourse === "all" ? "CS 3345" : selectedCourse,
      content: newPost,
      timestamp: "Just now",
      attachment: null,
    };

    // Add new post to the beginning of the list
    setLocalPosts([post, ...localPosts]);
    setNewPost("");
    toast.success("Post published!");
    // TODO: Send to backend
  };

  return (
    <div>
      {/* Page header with course filter dropdown */}
      <PageHeader
        title="Course Feed"
        description="Share updates, resources, and connect with classmates."
      >
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            {myCourses.map((course) => (
              <SelectItem key={course.id} value={course.code}>
                {course.code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PageHeader>

      {/* Post Composer - where users write new posts */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* User's avatar */}
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {currentUser.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              {/* Text area for composing post */}
              <Textarea
                placeholder="Share an update with your classmates..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              {/* Action buttons for attaching files and posting */}
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm">
                  <Paperclip className="mr-2 h-4 w-4" />
                  Attach File
                </Button>
                <Button onClick={handlePost} disabled={!newPost.trim()}>
                  <Send className="mr-2 h-4 w-4" />
                  Post
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feed Posts - displays all posts in the feed */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          // Generate initials from the author's name for avatar
          const initials = post.authorName
            .split(" ")
            .map((n) => n[0])
            .join("");

          return (
            <Card key={post.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  {/* Post author's avatar with initials */}
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      {/* Author name and timestamp */}
                      <div>
                        <p className="font-medium text-foreground">{post.authorName}</p>
                        <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                      </div>
                      {/* Course badge */}
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {post.course}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {/* Post content text */}
                <p className="text-foreground">{post.content}</p>
                {/* Show attachment if one exists */}
                {post.attachment && (
                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {post.attachment.name}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty state when no posts match the filter */}
      {filteredPosts.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No posts yet. Be the first to share!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
