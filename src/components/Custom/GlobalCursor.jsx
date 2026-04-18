import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCursor } from "./CursorContext";

const GlobalCursor = () => {
    const cursorRef = useRef(null);
    const { mode } = useCursor();
    const isDesktop = window.innerWidth >= 768;

    useEffect(() => {
        const move = (e) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                opacity: 1,
                duration: 0.15,
                ease: "power3.out",
            });
        };

        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    useEffect(() => {
        if (mode === "reveal") {
            gsap.to(cursorRef.current, {
                scale: 4,
                duration: 0.3,
                backgroundColor: "white",
                ease: "power3.out",
            });
        } else {
            gsap.to(cursorRef.current, {
                scale: 1,
                duration: 0.3,
                backgroundColor: "transparent",
                ease: "power3.out",
            });
        }
    }, [mode]);

    return (
        isDesktop && (
            <div
                ref={cursorRef}
                className="pointer-events-none fixed top-0 left-0 opacity-0 w-20 h-20 rounded-full border border-(--the-white) mix-blend-difference z-[9999] flex items-center justify-center"
                style={{
                    transform: "translate(-50%, -50%)",
                }}

            >
                <div className="Dot size-1 bg-text-primary rounded-full"></div>
            </div>
        )
    );
};

export default GlobalCursor;