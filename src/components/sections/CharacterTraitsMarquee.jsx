import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    FaLightbulb,
    FaRocket,
    FaLaptopCode,
    FaRegSmileBeam,
    FaHandsHelping,
    FaBrain,
    FaUserAstronaut
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const traits = [
    { text: "Creative Problem Solver", icon: FaLightbulb },
    { text: "Fast Learner", icon: FaRocket },
    { text: "Passionate Coder", icon: FaLaptopCode },
    { text: "Positive Attitude", icon: FaRegSmileBeam },
    { text: "Team Player", icon: FaHandsHelping },
    { text: "Analytical Thinker", icon: FaBrain },
    { text: "Future Ready", icon: FaUserAstronaut },
];

const CharacterTraitsMarquee = () => {
    const marqueeRef = useRef(null);
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);

    useEffect(() => {
        let xPercent = 0;
        let direction = -1; // -1 for left, 1 for right
        let animationFrameId;

        // Base speed
        const speed = 0.03;

        // ScrollTrigger to detect scroll direction and speed up temporarily on scroll
        ScrollTrigger.create({
            trigger: document.body,
            start: 0,
            end: "max",
            onUpdate: (self) => {
                // Change direction based on scroll direction
                // self.direction is 1 for scrolling down, -1 for scrolling up
                direction = self.direction;

                // Optional: speed up during scroll
                gsap.to(marqueeRef.current, {
                    x: () => {
                        xPercent += speed * direction * 2; // Speed multiplier during scroll
                        return xPercent;
                    },
                    duration: 0.1,
                    overwrite: "auto"
                });
            }
        });

        // Continuous animation loop
        const animate = () => {
            if (xPercent <= -100) {
                xPercent = 0;
            }
            if (xPercent > 0) {
                xPercent = -100;
            }

            gsap.set(textRef1.current, { xPercent: xPercent });
            gsap.set(textRef2.current, { xPercent: xPercent });

            xPercent += speed * direction;
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    // Helper to render traits list
    const renderTraits = () => (
        <div className="flex items-center gap-12 px-6">
            {traits.map((trait, index) => {
                const Icon = trait.icon;
                return (
                    <div key={index} className="flex items-center gap-4 text-text-secondary whitespace-nowrap">
                        <Icon className="text-3xl text-brand" />
                        <span className="text-5xl md:text-7xl font-semibold font-helvetica uppercase tracking-wider text-text-secondary">
                            {trait.text}
                        </span>
                        <span className="text-brand text-2xl ml-8">✦</span>
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="w-full relative py-10 my-20 overflow-hidden bg-dark-bg border-y border-border-dark flex items-center">
            <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-linear-to-r from-dark-bg to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-linear-to-l from-dark-bg to-transparent z-10 pointer-events-none"></div>

            <div ref={marqueeRef} className="flex whitespace-nowrap w-fit">
                <div ref={textRef1} className="flex flex-nowrap w-max">
                    {renderTraits()}
                </div>
                <div ref={textRef2} className="flex flex-nowrap w-max absolute top-0 left-full">
                    {renderTraits()}
                </div>
            </div>
        </div>
    );
};

export default CharacterTraitsMarquee;
