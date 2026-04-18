import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.documentElement.classList.add('light');
            return false;
        }
        document.documentElement.classList.remove('light');
        return true;
    });

    useEffect(() => {
        // Just sync DOM classes here if not caught above, though it is caught
        if (!isDark) {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }
    }, [isDark]);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.add('light');
            localStorage.setItem('theme', 'light');
            setIsDark(false);
        } else {
            document.documentElement.classList.remove('light');
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
        }
    };

    // Determine the hand image based on the theme
    const currentImage = isDark ? '../src/assets/images/MyHand.png' : '../src/assets/images/WhiteHand.png';

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme, currentImage }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
