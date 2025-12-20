import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, ChevronDown } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4 md:px-8">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-4 lg:mr-6 flex items-center space-x-2">
            {/* Mobile/Tablet Logo */}
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground lg:hidden">
              <span className="text-lg font-bold">P</span>
            </div>
            {/* Desktop Logo */}
            <span className="hidden font-bold lg:inline-block">ProtoStar</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/about/seeker"
              className="transition-colors hover:text-foreground/80 text-foreground/60 whitespace-nowrap"
            >
              For Job Seekers
            </Link>
            <Link
              href="/about/recruiter"
              className="transition-colors hover:text-foreground/80 text-foreground/60 whitespace-nowrap"
            >
              For Recruiters
            </Link>
          </nav>

          {/* Mobile/Tablet Navigation (Dropdown) */}
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 h-8 px-2">
                  About <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/about/seeker">For Job Seekers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about/recruiter">For Recruiters</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <Link href="/login">
              {/* Desktop Login Text */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden lg:flex whitespace-nowrap"
              >
                Login
              </Button>
              {/* Mobile/Tablet Login Icon */}
              <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8">
                <User className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="whitespace-nowrap">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
