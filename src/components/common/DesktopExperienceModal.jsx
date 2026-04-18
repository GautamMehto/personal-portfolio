import React, { useState, useEffect } from 'react';
import { BsX, BsLaptop } from 'react-icons/bs';

export default function DesktopExperienceModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            // Check if device is mobile/tablet (less than 1024px)
            if (window.innerWidth < 1024) {
                const hasSeenModal = sessionStorage.getItem('hasSeenDesktopModal');
                if (!hasSeenModal) {
                    setIsOpen(true);
                }
            }
        };

        // Add a slight delay before showing the modal
        const timer = setTimeout(checkDevice, 1500);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('hasSeenDesktopModal', 'true');
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            data-lenis-prevent="true"
        >
            {/* Modal Container */}
            <div className="relative w-full max-w-sm bg-dark-bg border border-border-dark p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in duration-300">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="cursor-pointer absolute top-4 right-4 text-text-secondary hover:text-brand transition-colors"
                    title="Close"
                >
                    <BsX className="text-3xl" />
                </button>

                <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mb-2">
                    <BsLaptop className="text-3xl text-brand" />
                </div>

                <h2 className="text-xl md:text-2xl font-semibold text-text-primary">
                    Better on Desktop
                </h2>

                <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                    For more experience open in Laptop. To fully enjoy the dynamic animations and details, a larger screen is recommended.
                </p>

                <button
                    onClick={handleClose}
                    className="mt-2 w-full py-3 bg-brand text-dark-bg font-semibold rounded-full hover:bg-opacity-90 transition-colors cursor-pointer"
                >
                    Continue Anyway
                </button>
            </div>
        </div>
    );
}
