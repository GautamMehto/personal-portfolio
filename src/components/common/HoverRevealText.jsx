import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useCursor } from "../Custom/CursorContext";

const HoverRevealText = ({ primaryText, secondaryText, className }) => {
    const wrapperRef = useRef(null);
    const primaryRef = useRef(null);
    const secondaryRef = useRef(null);
    const { setMode } = useCursor();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        // Hide secondary initially
        gsap.set(secondaryRef.current, {
            WebkitMaskImage:
                "radial-gradient(circle 0px at 50% 50%, black 0%, transparent 0%)",
            maskImage:
                "radial-gradient(circle 0px at 50% 50%, black 0%, transparent 0%)",
        });
    }, []);

    const handleMove = (e) => {
        if (isMobile) return;
        const rect = wrapperRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(primaryRef.current, {
            WebkitMaskImage: `radial-gradient(circle 160px at ${x}px ${y}px, transparent 99%, black 100%)`,
            maskImage: `radial-gradient(circle 160px at ${x}px ${y}px, transparent 99%, black 100%)`,
            duration: 0.2,
            ease: "power3.out",
        });

        gsap.to(secondaryRef.current, {
            WebkitMaskImage: `radial-gradient(circle 160px at ${x}px ${y}px, black 99%, transparent 100%)`,
            maskImage: `radial-gradient(circle 160px at ${x}px ${y}px, black 99%, transparent 100%)`,
            duration: 0.2,
            ease: "power3.out",
        });
    };

    const handleEnter = () => {
        if (isMobile) return;
        setMode("reveal");
    };

    const handleLeave = () => {
        if (isMobile) return;
        setMode("default");

        gsap.to(primaryRef.current, {
            WebkitMaskImage: "none",
            maskImage: "none",
            duration: 0.3,
        });

        gsap.to(secondaryRef.current, {
            WebkitMaskImage:
                "radial-gradient(circle 0px at 50% 50%, black 0%, transparent 0%)",
            maskImage:
                "radial-gradient(circle 0px at 50% 50%, black 0%, transparent 0%)",
            duration: 0.3,
        });
    };

    return (
        <div
            ref={wrapperRef}
            onMouseMove={handleMove}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className={`relative inline-block ${!isMobile ? "cursor-none" : ""} ${className}`}
        >
            {/* PRIMARY */}
            <div ref={primaryRef} className={`text-text-primary ${className}`}>
                {primaryText}
            </div>

            {/* SECONDARY */}
            <div
                ref={secondaryRef}
                className={`absolute inset-0 text-text-primary ${className}`}
            >
                {secondaryText}
            </div>
        </div>
    );
};

export default HoverRevealText;