'use client';

import * as React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { SidebarContext } from '@/components/ui/sidebar';

import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const sidebarContext = React.useContext(SidebarContext);
  const open = sidebarContext ? sidebarContext.open : true;
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  if (!open) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={cycleTheme}
        className="h-8 w-8 rounded-md"
        title="Toggle Theme"
      >
        {theme === 'light' && <Sun className="h-4 w-4" />}
        {theme === 'dark' && <Moon className="h-4 w-4" />}
        {theme === 'system' && <Monitor className="h-4 w-4" />}
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg border bg-background transition-colors duration-300">
      <Button
        variant={theme === 'light' ? 'default' : 'ghost'}
        size="icon"
        onClick={() => setTheme('light')}
        className="h-8 w-8 rounded-md transition-all duration-200"
        title="Light Mode"
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Light</span>
      </Button>
      <Button
        variant={theme === 'dark' ? 'default' : 'ghost'}
        size="icon"
        onClick={() => setTheme('dark')}
        className="h-8 w-8 rounded-md transition-all duration-200"
        title="Dark Mode"
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Dark</span>
      </Button>
      <Button
        variant={theme === 'system' ? 'default' : 'ghost'}
        size="icon"
        onClick={() => setTheme('system')}
        className="h-8 w-8 rounded-md transition-all duration-200"
        title="System Theme"
      >
        <Monitor className="h-4 w-4" />
        <span className="sr-only">System</span>
      </Button>
    </div>
  );
}
