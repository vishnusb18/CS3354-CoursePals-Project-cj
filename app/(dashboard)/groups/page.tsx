"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { MessageBubble } from "@/components/message-bubble";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { groupChats, groupMessages, currentUser } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Plus, Send, Users } from "lucide-react";

// Group chat page where students can message in course-based groups
// Layout has two parts: group list on the left, active chat on the right
export default function GroupChatsPage() {
  // Track which group chat is currently open
  const [selectedGroup, setSelectedGroup] = useState(groupChats[0]);
  
  // Store the message being typed
  const [newMessage, setNewMessage] = useState("");
  
  // Store all messages for all groups (grouped by group ID)
  const [localMessages, setLocalMessages] = useState(groupMessages);

  // Get messages for the currently selected group
  const groupChatMessages = localMessages[selectedGroup.id] || [];

  // Send a message in the current group chat
  const handleSend = () => {
    // Don't send empty messages
    if (!newMessage.trim()) return;

    // Create new message object
    const newMsg = {
      id: String(Date.now()),
      senderId: currentUser.id,
      senderName: currentUser.name,
      content: newMessage,
      timestamp: "Just now",
    };

    // Add message to the current group's message list
    setLocalMessages((prev) => ({
      ...prev,
      [selectedGroup.id]: [...(prev[selectedGroup.id] || []), newMsg],
    }));
    setNewMessage("");
    // TODO: Send message to backend
  };

  return (
    <div>
      {/* Page header with create group button */}
      <PageHeader
        title="Group Chats"
        description="Collaborate with classmates in course-based group chats."
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </PageHeader>

      {/* Two-column layout: group list (left) and chat window (right) */}
      <div className="grid h-[calc(100vh-16rem)] gap-4 lg:grid-cols-3">
        {/* Group List - shows all available group chats */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Groups</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[calc(100vh-22rem)] overflow-y-auto">
              {groupChats.map((group) => (
                <button
                  key={group.id}
                  onClick={() => setSelectedGroup(group)}
                  className={cn(
                    "flex w-full flex-col gap-1 border-b border-border p-4 text-left transition-colors hover:bg-accent/50",
                    selectedGroup.id === group.id && "bg-accent"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground">{group.name}</p>
                    {/* Course badge for each group */}
                    <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                      {group.course}
                    </Badge>
                  </div>
                  {/* Preview of last message */}
                  <p className="truncate text-sm text-muted-foreground">
                    {group.lastMessage}
                  </p>
                  {/* Group metadata: member count and timestamp */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      {group.members} members
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {group.timestamp}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Group Chat View - displays messages for selected group */}
        <Card className="flex flex-col lg:col-span-2">
          {/* Chat header showing group info */}
          <CardHeader className="border-b border-border pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{selectedGroup.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedGroup.members} members
                </p>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {selectedGroup.course}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col p-0">
            {/* Messages area - scrollable list of all messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {groupChatMessages.map((message) => (
                <MessageBubble
                  key={message.id}
                  content={message.content}
                  timestamp={message.timestamp}
                  isOwn={message.senderId === currentUser.id}
                  senderName={message.senderName}
                />
              ))}
            </div>
            {/* Message input area at the bottom */}
            <div className="border-t border-border p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
