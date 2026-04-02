import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">Course Pals</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connecting UTD students with classmates for better learning experiences.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-foreground">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/pals" className="hover:text-foreground">Find Classmates</Link></li>
              <li><Link href="/sessions" className="hover:text-foreground">Study Sessions</Link></li>
              <li><Link href="/groups" className="hover:text-foreground">Group Chats</Link></li>
              <li><Link href="/polls" className="hover:text-foreground">Course Polls</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/courses" className="hover:text-foreground">Course Directory</Link></li>
              <li><Link href="/feed" className="hover:text-foreground">Course Feed</Link></li>
              <li><Link href="#" className="hover:text-foreground">Help Center</Link></li>
              <li><Link href="#" className="hover:text-foreground">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-foreground">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Course Pals. Built for UTD students.</p>
        </div>
      </div>
    </footer>
  );
}
