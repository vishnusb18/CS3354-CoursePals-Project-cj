// Rohan Antony : Handles the messaging page UI, allowing users to view conversations and send messages within a selected chat.

"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/page-header";
import { MessageBubble } from "@/components/message-bubble";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { conversations, currentUser } from "@/lib/data";
// import { getMessages, sendMessage } from "@/lib/demo-backend";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";

export default function MessagesPage() {
  type Message = {
    id: string;
    senderId: string;
    content: string;
    timestamp: string;
    read?: boolean;
  };
  type MessagesMap = { [conversationId: string]: Message[] };

  // Dummy initial messages for each conversation
  const initialMessages: MessagesMap = {};
  conversations.forEach((conv, idx) => {
    initialMessages[conv.id] = [
      {
        id: `${conv.id}-1`,
        senderId: conv.participant.id,
        content: `Hey! This is a dummy message from ${conv.participant.name}.`,
        timestamp: "Yesterday",
        read: idx !== 0, // Only first conversation is unread
      },
      {
        id: `${conv.id}-2`,
        senderId: currentUser.id,
        content: `Hi ${conv.participant.name}, this is your reply!`,
        timestamp: "Yesterday",
        read: true,
      },
    ];
  });

  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [localMessages, setLocalMessages] = useState<MessagesMap>(initialMessages);

  useEffect(() => {
    // Ensure a message array exists for the selected conversation
    setLocalMessages((prev) => ({
      ...prev,
      [selectedConversation.id]: prev[selectedConversation.id] || [],
    }));
  }, [selectedConversation]);

  const conversationMessages: Message[] = localMessages[selectedConversation.id] || [];

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: String(Date.now()),
      senderId: currentUser.id,
      content: newMessage,
      timestamp: "Just now",
      read: true,
    };

    setLocalMessages((prev) => ({
      ...prev,
      [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMsg],
    }));
    setNewMessage("");
  };

  return (
    <div>
      <PageHeader
        title="Messages"
        description="Chat with your classmates and study partners."
      />

      <div className="grid h-[calc(100vh-16rem)] gap-4 lg:grid-cols-3">
        {/* Conversation List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Conversations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[calc(100vh-22rem)] overflow-y-auto">
              {conversations.map((conversation) => {
                const initials = conversation.participant.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("");

                // Show unread indicator only if there are unread messages from the other user
                const hasUnread = (localMessages[conversation.id] || []).some(
                  (msg) => msg.senderId === conversation.participant.id && msg.read === false
                );

                return (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={cn(
                      "flex w-full items-center gap-3 border-b border-border p-4 text-left transition-colors hover:bg-accent/50",
                      selectedConversation.id === conversation.id && "bg-accent"
                    )}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground">
                          {conversation.participant.name}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {conversation.timestamp}
                        </span>
                      </div>
                      <p className="truncate text-sm text-muted-foreground">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {hasUnread && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/** Hansi : Chat View
         * When on the messaging tab, the user's currently selected (active) conversation is displayed on the right side of the screen.
         * Rendered: header (the name of the person the user's messaging) + chat history
         */}

        {/* Chat View */}
        <Card className="flex flex-col lg:col-span-2">
          <CardHeader className="border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-secondary text-secondary-foreground">
                  {selectedConversation.participant.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">
                  {selectedConversation.participant.name}
                </p>
                <p className="text-sm text-muted-foreground">Online</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col p-0">
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {conversationMessages.map((message: Message) => (
                <MessageBubble
                  key={message.id}
                  content={message.content}
                  timestamp={message.timestamp}
                  isOwn={message.senderId === currentUser.id}
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
