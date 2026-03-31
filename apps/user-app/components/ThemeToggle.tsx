'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isLight = theme === 'light';

  return (
    <button
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      className="p-1 border rounded-full bg-gray-600 dark:bg-gray-100 hover:scale-105 transition"
      title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
    >
      {isLight ? (
        <Moon className="w-5 h-5 text-white dark:text-gray-800" />
      ) : (
        <Sun className="w-5 h-5 text-black dark:text-gray-800" />
      )}
    </button>
  );
}
