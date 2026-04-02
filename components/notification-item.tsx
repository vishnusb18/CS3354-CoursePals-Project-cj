import { cn } from "@/lib/utils";
import { MessageSquare, BarChart3, Calendar, Newspaper, BookOpen } from "lucide-react";

interface NotificationItemProps {
  notification: {
    id: string;
    type: "message" | "poll" | "session" | "feed" | "course";
    content: string;
    timestamp: string;
    read: boolean;
  };
}

const iconMap = {
  message: MessageSquare,
  poll: BarChart3,
  session: Calendar,
  feed: Newspaper,
  course: BookOpen,
};

const colorMap = {
  message: "bg-primary/10 text-primary",
  poll: "bg-secondary/10 text-secondary",
  session: "bg-primary/10 text-primary",
  feed: "bg-secondary/10 text-secondary",
  course: "bg-primary/10 text-primary",
};

export function NotificationItem({ notification }: NotificationItemProps) {
  const Icon = iconMap[notification.type];

  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-lg border border-border p-4 transition-colors",
        notification.read ? "bg-background" : "bg-accent/30"
      )}
    >
      <div className={cn("rounded-lg p-2", colorMap[notification.type])}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className={cn("text-sm", notification.read ? "text-muted-foreground" : "font-medium text-foreground")}>
          {notification.content}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{notification.timestamp}</p>
      </div>
      {!notification.read && (
        <div className="h-2 w-2 rounded-full bg-primary" />
      )}
    </div>
  );
}
