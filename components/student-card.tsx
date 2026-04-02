"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, User } from "lucide-react";
import Link from "next/link";

interface StudentCardProps {
  student: {
    id: string;
    name: string;
    major: string;
    year: string;
    sharedCourses: string[];
    avatar: string;
  };
}

export function StudentCard({ student }: StudentCardProps) {
  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 p-4">
        <div className="mb-3 flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-secondary text-secondary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">{student.name}</h3>
            <p className="text-sm text-muted-foreground">{student.major}</p>
          </div>
        </div>
        <Badge variant="outline" className="mb-3">
          {student.year}
        </Badge>
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Shared Courses</p>
          <div className="flex flex-wrap gap-1">
            {student.sharedCourses.map((course) => (
              <Badge key={course} variant="secondary" className="bg-primary/10 text-primary text-xs">
                {course}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 border-t border-border p-4">
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <Link href={`/profile/${student.id}`}>
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </Button>
        <Button size="sm" className="flex-1" asChild>
          <Link href={`/messages?to=${student.id}`}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Message
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
