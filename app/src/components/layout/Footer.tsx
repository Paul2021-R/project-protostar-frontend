import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by Hansol. The source code is available on GitHub.
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <ModeToggle />
          <Link
            href="/terms-of-service"
            className="text-xs hover:underline underline-offset-4"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy-policy"
            className="text-xs hover:underline underline-offset-4"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
