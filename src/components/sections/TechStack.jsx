import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TechStackInfo, TechIcons } from '../../data';

gsap.registerPlugin(ScrollTrigger);

const MagneticPill = ({ label }) => {
    const pillRef = useRef(null);
    const glowRef = useRef(null);

    const Icon = TechIcons[label];

    const handleMouseMove = (e) => {
        const rect = pillRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(pillRef.current, {
            x: x * 0.8,
            y: y * 0.8,
            duration: 0.3,
            ease: "power3.out",
        });

        gsap.to(glowRef.current, {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            opacity: 1,
            duration: 0.2,
        });
    };

    const handleMouseLeave = () => {
        gsap.to(pillRef.current, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.4)",
        });

        gsap.to(glowRef.current, {
            opacity: 0,
            duration: 0.3,
        });
    };

    return (
        <div
            ref={pillRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative overflow-hidden px-5 py-2.5 rounded-full bg-dark-bg border border-text-secondary/30 text-text-secondary cursor-pointer select-none transition-colors hover:text-text-primary hover:border-brand/70"
        >
            {/* Cursor Glow */}
            <span
                ref={glowRef}
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-brand/30 blur-2xl opacity-0"
            />

            <span className="relative flex items-center gap-2 z-10 pointer-events-none">
                {Icon && <Icon className="text-lg opacity-90" />}
                <span className="text-sm font-medium tracking-wide">{label}</span>
            </span>
        </div>
    );
};

const TechStack = ({ otherClass }) => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                cardsRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className={`mt-40 ${otherClass} w-full mb-10 px-6 md:px-20`}>
            <div className="pb-10 border-b border-brand mb-12">
                <h2 className="font-helvetica text-7xl md:text-9xl font-semibold text-text-primary">
                    My Tech Stack
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {TechStackInfo.map((category, index) => (
                    <div
                        key={index}
                        ref={(el) => (cardsRef.current[index] = el)}
                        className="bg-dark-bg border border-border-dark p-8 rounded-2xl hover:border-brand/50 transition-colors duration-300 group"
                    >
                        <h3 className="text-2xl text-text-primary font-semibold mb-6 group-hover:text-brand transition-colors duration-300">
                            {category.title}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {category.items.map((tech) => {
                                return <MagneticPill key={tech} label={tech} />;
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechStack;
