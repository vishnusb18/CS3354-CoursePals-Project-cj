/** Parsa-profile page: a page that displays and manages a users 
 * profile details it includes
 * name
 * major
 * email
 * academic year
 * bio */
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
import { getClientFirestore } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Camera, Save } from "lucide-react";
import { toast } from "sonner";

// updating edits to proile (dynamic)
export default function ProfilePage() {

  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    major: "",
    year: "",
    grade: "",
    bio: "",
    textNotifications: true,
  });

  // Pull major and year from Firestore profile if available, fallback to auth if not
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const db = getClientFirestore();
        const profileRef = doc(db, "profiles", user.uid);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          const data = profileSnap.data();
          setProfile((prev) => ({
            ...prev,
            major: data.major || prev.major || "",
            year: data.year || prev.year || "",
            name: data.name || prev.name || user.displayName || "",
            email: data.email || prev.email || user.email || "",
            grade: data.grade || prev.grade || "",
            bio: data.bio || prev.bio || "",
            textNotifications: typeof data.textNotifications === "boolean" ? data.textNotifications : prev.textNotifications,
          }));
        } else {
          // fallback: try to get major/year from user object if custom claims or metadata used
          setProfile((prev) => ({
            ...prev,
            major: (user as any).major || prev.major || "",
            year: (user as any).year || prev.year || "",
          }));
        }
      } catch (err) {
        // fallback: try to get major/year from user object if custom claims or metadata used
        setProfile((prev) => ({
          ...prev,
          major: (user as any).major || prev.major || "",
          year: (user as any).year || prev.year || "",
        }));
      }
    };
    fetchProfile();
    // Only run when user changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const updateField = (field: string, value: string | boolean) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };
// save profile changes 
  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
    if (typeof window !== "undefined") {
      localStorage.setItem("profile", JSON.stringify(profile));
    }
    // TODO: Save to backend if needed
  };

  // generate user initials
    const initials = (profile.name || user?.displayName || "?")
      .split(" ")
      .map((n) => n[0])
      .join("");

  return (
    <div>
      <PageHeader
        title="My Profile"
        description="Manage your account settings and preferences."
      >
        {isEditing ? (
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
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
                  variant="secondary"
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <h2 className="mt-4 text-xl font-semibold text-foreground">{profile.name}</h2>
            <p className="text-muted-foreground">{profile.major}</p>
            <p className="text-sm text-muted-foreground">{profile.year}</p>
            {profile.grade && (
              <p className="text-sm text-muted-foreground">Grade: {profile.grade}</p>
            )}
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">UTD Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="major">Major</Label>
                {isEditing ? (
                  <Select value={profile.major} onValueChange={(v) => updateField("major", v)}>
                    <SelectTrigger id="major">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Information Technology">Information Technology</SelectItem>
                      <SelectItem value="Computer Engineering">Computer Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input value={profile.major} disabled />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Academic Year</Label>
                {isEditing ? (
                  <Select value={profile.year} onValueChange={(v) => updateField("year", v)}>
                    <SelectTrigger id="year">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Freshman">Freshman</SelectItem>
                      <SelectItem value="Sophomore">Sophomore</SelectItem>
                      <SelectItem value="Junior">Junior</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                      <SelectItem value="Graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input value={profile.year} disabled />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                value={profile.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                disabled={!isEditing}
                className="min-h-25"
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium text-foreground">Text Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive SMS notifications for messages and study sessions
                </p>
              </div>
              <Switch
                checked={profile.textNotifications}
                onCheckedChange={(checked) => updateField("textNotifications", checked)}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
