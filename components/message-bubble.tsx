import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isOwn: boolean;
  senderName?: string;
}

export function MessageBubble({ content, timestamp, isOwn, senderName }: MessageBubbleProps) {
  return (
    <div className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2",
          isOwn
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md bg-muted text-foreground"
        )}
      >
        {senderName && !isOwn && (
          <p className="mb-1 text-xs font-medium text-secondary">{senderName}</p>
        )}
        <p className="text-sm">{content}</p>
        <p
          className={cn(
            "mt-1 text-xs",
            isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {timestamp}
        </p>
      </div>
    </div>
  );
}
