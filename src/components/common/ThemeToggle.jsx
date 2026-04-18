import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-12 right-6 z-50 p-3 rounded-full bg-dark-surface text-text-primary shadow-xl border border-border-dark hover:border-brand hover:text-brand transition-all duration-300"
            aria-label="Toggle Theme"
        >
            {isDark ? <Sun size={22} className="relative z-10" /> : <Moon size={22} className="relative z-10" />}
        </button>
    );
};

export default ThemeToggle;


