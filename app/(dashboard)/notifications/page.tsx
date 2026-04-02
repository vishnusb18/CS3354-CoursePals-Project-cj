"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { NotificationItem } from "@/components/notification-item";
import { Button } from "@/components/ui/button";
import { notifications } from "@/lib/data";
import { Check } from "lucide-react";
import { toast } from "sonner";

export default function NotificationsPage() {
  const [localNotifications, setLocalNotifications] = useState(notifications);

  const unreadCount = localNotifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setLocalNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
    toast.success("All notifications marked as read");
    // TODO: Send to backend
  };

  return (
    <div>
      <PageHeader
        title="Notifications"
        description={`You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}.`}
      >
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </PageHeader>

      <div className="space-y-3">
        {localNotifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification as { id: string; type: "message" | "poll" | "session" | "feed" | "course"; content: string; timestamp: string; read: boolean }}
          />
        ))}
      </div>

      {localNotifications.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No notifications yet.</p>
        </div>
      )}
    </div>
  );
}
