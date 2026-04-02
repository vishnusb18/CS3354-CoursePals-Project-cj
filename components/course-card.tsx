"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, X } from "lucide-react";

interface CourseCardProps {
  course: {
    id: string;
    code: string;
    name: string;
    professor: string;
    enrolled: number;
    semester: string;
  };
  isEnrolled?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
}

export function CourseCard({ course, isEnrolled, onAdd, onRemove }: CourseCardProps) {
  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 p-4">
        <div className="mb-2 flex items-start justify-between">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {course.code}
          </Badge>
          <Badge variant="outline">{course.semester}</Badge>
        </div>
        <h3 className="mb-1 font-semibold text-foreground">{course.name}</h3>
        <p className="mb-3 text-sm text-muted-foreground">{course.professor}</p>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{course.enrolled} students enrolled</span>
        </div>
      </CardContent>
      <CardFooter className="border-t border-border p-4">
        {isEnrolled ? (
          <Button variant="outline" size="sm" className="w-full" onClick={onRemove}>
            <X className="mr-2 h-4 w-4" />
            Remove Course
          </Button>
        ) : (
          <Button size="sm" className="w-full" onClick={onAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
