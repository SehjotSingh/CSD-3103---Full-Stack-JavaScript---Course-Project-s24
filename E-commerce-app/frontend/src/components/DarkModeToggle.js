// components/DarkModeToggle.js
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const DarkModeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // After mounting, we have access to the theme
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-md focus:outline-none"
            aria-label="Toggle Dark Mode"
        >
            {theme === 'dark' ? '🌙' : '☀️'}
        </button>
    );
};

export default DarkModeToggle;
