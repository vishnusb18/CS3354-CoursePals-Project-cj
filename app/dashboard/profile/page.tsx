// Haris: Only allow access to profile page after user has been authenticated - UC1
"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";

import Link from "next/link";
import { Camera, Save } from "lucide-react";
import { toast } from "sonner";



export default function ProfilePage() {
  const { user } = useAuth();
  const [hasMounted, setHasMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    major: "",
    year: "",
    grade: "",
    bio: "",
    textNotifications: true,
  });

  useEffect(() => {
    setHasMounted(true);

    // Only access localStorage and user after mount
    const stored = typeof window !== "undefined" ? localStorage.getItem("profile") : null;

    if (stored) {
      setProfile(JSON.parse(stored));
    } else if (user) {
      setProfile((p) => ({
        ...p,
        name: user.displayName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  // CRUD Applications to make changes to profile page information - Connect to Backend (CSV File) 
  const updateField = (field: string, value: string | boolean) => {
    setProfile((prev: typeof profile) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");

    if (typeof window !== "undefined") {
      localStorage.setItem("profile", JSON.stringify(profile));
    }
    // TODO: Save to backend if needed --> (CSV File)
  };

  const initials = profile.name
    .split(" ")
    .map((n: string) => n[0])
    .join("");


  // Prevent hydration error: render nothing until client mount
  if (!hasMounted) {
    return null;
  }

  // Display profile information with option to edit, and save changes
  // Show profile picture (initials fallback) and allow changing it when editing
  // Show preferences like text notifications with toggle switch
  // TODO: implement the backend saving logic
  return (
    <div>
      <PageHeader
        title="My Profile"
        description="Manage your account settings and preferences."
      >
        <div className="flex gap-2">
          {isEditing ? (
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
          <Link href="/dashboard/pals">
            <Button variant="secondary">Find Course Pals</Button>
          </Link>
        </div>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Picture */}
        <Card className="lg:col-span-1">
          <CardContent className="flex flex-col items-center p-6">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarFallback className="bg-primary text-4xl text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  variant = "secondary"
                  size = "icon"
                  className = "absolute bottom-0 right-0 rounded-full"
                >
                  <Camera className = "h-4 w-4" />
                </Button>
              )}
            </div>
            <h2 className = "mt-4 text-xl font-semibold text-foreground">{profile.name}</h2>
            <p className = "text-muted-foreground">{profile.major}</p>
            <p className = "text-sm text-muted-foreground">{profile.year}</p>
            {profile.grade && (
              <p className = "text-sm text-muted-foreground">Grade: {profile.grade}</p>
            )}
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className = "lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className = "space-y-4">
            <div className = "grid gap-4 sm:grid-cols-2">
              <div className = "space-y-2">
                <Label htmlFor = "name">Full Name</Label>
                <Input
                  id = "name"
                  value = {profile.name}
                  onChange = {(e) => updateField("name", e.target.value)}
                  disabled = {!isEditing}
                />
              </div>
              <div className = "space-y-2">
                <Label htmlFor = "email">UTD Email</Label>
                <Input
                  id = "email"
                  type = "email"
                  value = {profile.email}
                  onChange = {(e) => updateField("email", e.target.value)}
                  disabled = {!isEditing}
                />
              </div>
            </div>

            <div className = "grid gap-4 sm:grid-cols-2">
              <div className = "space-y-2">
                <Label htmlFor = "major">Major</Label>
                {isEditing ? (
                  <Select value = {profile.major} onValueChange = {(v) => updateField("major", v)}>
                    <SelectTrigger id = "major">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value = "Computer Science">Computer Science</SelectItem>
                      <SelectItem value = "Software Engineering">Software Engineering</SelectItem>
                      <SelectItem value ="Data Science">Data Science</SelectItem>
                      <SelectItem value = "Information Technology">Information Technology</SelectItem>
                      <SelectItem value = "Computer Engineering">Computer Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input value={profile.major} disabled />
                )}
              </div>
              <div className = "space-y-2">
                <Label htmlFor = "year">Academic Year</Label>
                {isEditing ? (
                  <Select value = {profile.year} onValueChange={(v) => updateField("year", v)}>
                    <SelectTrigger id = "year">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value = "Freshman">Freshman</SelectItem>
                      <SelectItem value = "Sophomore">Sophomore</SelectItem>
                      <SelectItem value = "Junior">Junior</SelectItem>
                      <SelectItem value = "Senior">Senior</SelectItem>
                      <SelectItem value = "Graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input value = {profile.year} disabled />
                )}
              </div>
            </div>

            <div className = "space-y-2">
              <Label htmlFor = "bio">Bio</Label>
              <Textarea
                id = "bio"
                placeholder = "Tell us about yourself..."
                value = {profile.bio}
                onChange = {(e) => updateField("bio", e.target.value)}
                disabled = {!isEditing}
                className = "min-h-25"
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className = "lg:col-span-3">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className = "flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className = "font-medium text-foreground">Text Notifications</p>
                <p className = "text-sm text-muted-foreground">
                  Receive SMS notifications for messages and study sessions
                </p>
              </div>
              <Switch
                checked = {profile.textNotifications}
                onCheckedChange = {(checked) => updateField("textNotifications", checked)}
                disabled = {!isEditing}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
