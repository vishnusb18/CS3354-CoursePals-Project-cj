import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { currentUser, myCourses, notifications, studySessions } from "@/lib/data";
import {
  BookOpen,
  MessageSquare,
  Calendar,
  Bell,
  Users,
  ArrowRight,
} from "lucide-react";

const quickLinks = [
  { href: "/courses", label: "Browse Courses", icon: BookOpen },
  { href: "/pals", label: "Find Pals", icon: Users },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/sessions", label: "Study Sessions", icon: Calendar },
];

export default function DashboardPage() {
  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const upcomingSessions = studySessions.filter((s) => s.joined).length;

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${currentUser.name.split(" ")[0]}!`}
        description="Here's what's happening with your courses today."
      />

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Enrolled Courses"
          value={myCourses.length}
          icon={BookOpen}
          description="This semester"
        />
        <StatCard
          title="Unread Messages"
          value={2}
          icon={MessageSquare}
          description="From classmates"
        />
        <StatCard
          title="Study Sessions"
          value={upcomingSessions}
          icon={Calendar}
          description="Upcoming"
        />
        <StatCard
          title="Notifications"
          value={unreadNotifications}
          icon={Bell}
          description="Unread"
        />
      </div>

      {/* Quick Links */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent"
              >
                <div className="rounded-lg bg-primary/10 p-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium text-card-foreground">{link.label}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* My Courses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Courses</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/my-courses">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div>
                    <Badge variant="secondary" className="mb-1 bg-primary/10 text-primary">
                      {course.code}
                    </Badge>
                    <p className="text-sm font-medium text-foreground">{course.name}</p>
                    <p className="text-xs text-muted-foreground">{course.professor}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/feed?course=${course.id}`}>Feed</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Sessions</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/sessions">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {studySessions
                .filter((s) => s.joined)
                .slice(0, 3)
                .map((session) => (
                  <div
                    key={session.id}
                    className="rounded-lg border border-border p-3"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <p className="font-medium text-foreground">{session.title}</p>
                      <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                        {session.course}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {session.date}
                      </span>
                      <span>{session.time}</span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/notifications">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.slice(0, 4).map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center gap-3 rounded-lg border border-border p-3"
                >
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  )}
                  <div className="flex-1">
                    <p className={`text-sm ${notification.read ? "text-muted-foreground" : "font-medium text-foreground"}`}>
                      {notification.content}
                    </p>
                    <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
