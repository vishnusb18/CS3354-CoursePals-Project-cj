"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Check } from "lucide-react";

interface StudySessionCardProps {
  session: {
    id: string;
    title: string;
    course: string;
    date: string;
    time: string;
    location: string;
    organizer: string;
    attendees: number;
    joined: boolean;
  };
  onJoin?: () => void;
  onLeave?: () => void;
}

export function StudySessionCard({ session, onJoin, onLeave }: StudySessionCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-3 flex items-start justify-between">
          <h3 className="font-semibold text-foreground">{session.title}</h3>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {session.course}
          </Badge>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{session.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{session.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{session.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{session.attendees} attending</span>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Organized by <span className="font-medium text-foreground">{session.organizer}</span>
        </p>
      </CardContent>
      <CardFooter className="border-t border-border p-4">
        {session.joined ? (
          <Button variant="outline" size="sm" className="w-full" onClick={onLeave}>
            <Check className="mr-2 h-4 w-4 text-secondary" />
            Joined
          </Button>
        ) : (
          <Button size="sm" className="w-full" onClick={onJoin}>
            Join Session
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
