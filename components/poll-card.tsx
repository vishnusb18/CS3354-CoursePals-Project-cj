"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PollCardProps {
  poll: {
    id: string;
    question: string;
    options: Array<{ id: string; text: string; votes: number }>;
    totalVotes: number;
    createdBy: string;
    course: string;
  };
}

export function PollCard({ poll }: PollCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (optionId: string) => {
    if (!hasVoted) {
      setSelectedOption(optionId);
      setHasVoted(true);
      // TODO: Send vote to backend
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{poll.question}</CardTitle>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {poll.course}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">Created by {poll.createdBy}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {poll.options.map((option) => {
          const percentage = Math.round((option.votes / poll.totalVotes) * 100);
          const isSelected = selectedOption === option.id;

          return (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={hasVoted}
              className={cn(
                "relative w-full overflow-hidden rounded-lg border border-border p-3 text-left transition-colors",
                hasVoted
                  ? "cursor-default"
                  : "cursor-pointer hover:border-primary/50 hover:bg-accent/50"
              )}
            >
              {hasVoted && (
                <div
                  className={cn(
                    "absolute inset-y-0 left-0 transition-all",
                    isSelected ? "bg-primary/20" : "bg-muted"
                  )}
                  style={{ width: `${percentage}%` }}
                />
              )}
              <div className="relative flex items-center justify-between">
                <span className={cn("font-medium", isSelected && "text-primary")}>
                  {option.text}
                </span>
                {hasVoted && (
                  <span className="text-sm text-muted-foreground">
                    {percentage}% ({option.votes} votes)
                  </span>
                )}
              </div>
            </button>
          );
        })}
        <p className="text-center text-sm text-muted-foreground">
          {poll.totalVotes} total votes
        </p>
      </CardContent>
    </Card>
  );
}
