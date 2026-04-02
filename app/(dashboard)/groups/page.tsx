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

export default function GroupChatsPage() {
  const [selectedGroup, setSelectedGroup] = useState(groupChats[0]);
  const [newMessage, setNewMessage] = useState("");
  const [localMessages, setLocalMessages] = useState(groupMessages);

  const groupChatMessages = localMessages[selectedGroup.id] || [];

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: String(Date.now()),
      senderId: currentUser.id,
      senderName: currentUser.name,
      content: newMessage,
      timestamp: "Just now",
    };

    setLocalMessages((prev) => ({
      ...prev,
      [selectedGroup.id]: [...(prev[selectedGroup.id] || []), newMsg],
    }));
    setNewMessage("");
    // TODO: Send message to backend
  };

  return (
    <div>
      <PageHeader
        title="Group Chats"
        description="Collaborate with classmates in course-based group chats."
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </PageHeader>

      <div className="grid h-[calc(100vh-16rem)] gap-4 lg:grid-cols-3">
        {/* Group List */}
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
                    <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                      {group.course}
                    </Badge>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">
                    {group.lastMessage}
                  </p>
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

        {/* Group Chat View */}
        <Card className="flex flex-col lg:col-span-2">
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
