import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const HighlightReveal = ({ children, triggerState, delay = 0, duration = 0.5, highlightColor = "bg-brand", className }) => {
    const highlightRef = useRef(null);
    const tl = useRef(null);

    useEffect(() => {
        tl.current = gsap.timeline({ paused: true });

        tl.current
            .to(highlightRef.current, {
                scaleX: 1,
                duration: duration / 2,
                ease: "power3.inOut"
            })
            .to(highlightRef.current, {
                scaleX: 0,
                transformOrigin: "right center",
                duration: duration / 2,
                ease: "power3.inOut"
            });
    }, [duration]);

    useEffect(() => {
        if (triggerState) {
            gsap.delayedCall(delay, () => tl.current.play());
        } else {
            tl.current.reverse();
        }
    }, [triggerState, delay]);

    return (
        <div className={`w-fit relative inline-block overflow-hidden ${className}`}>
            {children}
            <div
                ref={highlightRef}
                className={`absolute inset-0 ${highlightColor} z-10 origin-left scale-x-0`}
            ></div>
        </div>
    );
};

export default HighlightReveal;
