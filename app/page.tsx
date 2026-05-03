import { Navbar } from "@/components/navbar";
// import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Users,
  MessageSquare,
  Calendar,
  BookOpen,
  Search,
  UserPlus,
  MessagesSquare,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Find Classmates",
    description: "Discover students in your courses and connect with potential study partners based on shared classes.",
  },
  {
    icon: MessagesSquare,
    title: "Join Study Groups",
    description: "Create or join course-specific group chats to collaborate, share resources, and support each other.",
  },
  {
    icon: MessageSquare,
    title: "Direct Messaging",
    description: "Send private messages to classmates to coordinate study sessions or discuss course material.",
  },
  {
    icon: Calendar,
    title: "Study Sessions",
    description: "Organize and join study sessions with clear times, locations, and attendee lists.",
  },
];

const howItWorks = [
  {
    step: 1,
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Sign up with your UTD email and add your courses, major, and academic year.",
  },
  {
    step: 2,
    icon: Search,
    title: "Find Your Courses",
    description: "Browse the course directory and add the classes you are enrolled in this semester.",
  },
  {
    step: 3,
    icon: Users,
    title: "Connect with Pals",
    description: "Discover classmates in your courses and start building your study network.",
  },
  {
    step: 4,
    icon: BookOpen,
    title: "Study Together",
    description: "Join group chats, create study sessions, and collaborate with your course pals.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-accent/50 to-background px-4 py-20 sm:py-32">
          <div className="container mx-auto text-center">
            <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Connect with Classmates, <span className="text-primary">Study Together</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
              Course Pals helps UTD students find study partners, join course groups, and build meaningful academic connections. Never study alone again.
            </p>
            {/* Auth links removed for demo as requested */}
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20">
          <div className="container mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Everything You Need to Succeed
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Course Pals provides all the tools you need to connect with classmates and enhance your academic experience.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="border-border bg-card">
                    <CardContent className="p-6">
                      <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-muted/30 px-4 py-20">
          <div className="container mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                How It Works
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Getting started with Course Pals is easy. Follow these simple steps to connect with your classmates.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="mb-2 text-sm font-medium text-primary">
                      Step {item.step}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="container mx-auto">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8 text-center sm:p-12">
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Ready to Find Your Course Pals?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
                  Join thousands of UTD students who are already connecting, studying, and succeeding together.
                </p>
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="mt-8"
                >
                  <Link href="/signup">
                    Sign Up Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* <Footer /> removed */}
    </div>
  );
}
