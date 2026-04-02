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

export default function FeedPage() {
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [newPost, setNewPost] = useState("");
  const [localPosts, setLocalPosts] = useState(feedPosts);

  const filteredPosts = selectedCourse === "all"
    ? localPosts
    : localPosts.filter((post) => post.course === selectedCourse);

  const handlePost = () => {
    if (!newPost.trim()) return;

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

    setLocalPosts([post, ...localPosts]);
    setNewPost("");
    toast.success("Post published!");
    // TODO: Send to backend
  };

  return (
    <div>
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

      {/* Post Composer */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {currentUser.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="Share an update with your classmates..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[80px] resize-none"
              />
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

      {/* Feed Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const initials = post.authorName
            .split(" ")
            .map((n) => n[0])
            .join("");

          return (
            <Card key={post.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{post.authorName}</p>
                        <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {post.course}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-foreground">{post.content}</p>
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
