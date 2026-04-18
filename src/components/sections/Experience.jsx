import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExperienceData } from "../../data";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
    const experiencesectionRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        if (!lineRef.current || !experiencesectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                lineRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: experiencesectionRef.current,
                        start: "top 20%",
                        end: "bottom 80%",
                        scrub: true,
                    },
                }
            );
        }, experiencesectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={experiencesectionRef}
            className="relative min-h-screen text-text-primary overflow-hidden py-0 md:px-20 bg-dark-bg"
        >
            <div className="">
                {/* Section Title */}
                <div className="pb-10 border-b border-brand">
                    <h2 className="font-helvetica text-5xl md:text-9xl font-semibold text-text-primary">
                        Work Experience
                    </h2>
                </div>

                <div className="relative w-full mx-auto py-20 mt-10">
                    {/* Vertical Line */}
                    <div className="absolute md:left-[34.2%] left-[41.5%] top-0 -translate-x-1/2 h-full w-[2px] bg-border-dark">
                        <div
                            ref={lineRef}
                            className="origin-top w-full h-full bg-brand shadow-[0_0_15px_rgba(227,62,43,0.5)]"
                        />
                    </div>

                    <div className="space-y-40">
                        {ExperienceData.map((item, index) => (
                            <ExperienceRow key={index} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function ExperienceRow({ company, role, description, date }) {
    const rowRef = useRef(null);
    const dotRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (!rowRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                dotRef.current,
                {
                    scale: 1,
                    backgroundColor: "transparent",
                    boxShadow: "0 0 0px rgba(255,255,255,0)",
                },
                {
                    scale: 1.8,
                    backgroundColor: "var(--color-text-primary, #ffffff)",
                    boxShadow: "0 0 25px rgba(255,255,255,0.8)",
                    scrollTrigger: {
                        trigger: rowRef.current,
                        start: "top center",
                        end: "top 40%",
                        scrub: true,
                    },
                }
            );

            gsap.fromTo(
                contentRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: rowRef.current,
                        start: "top 75%",
                        toggleActions: "play reverse play reverse",
                    },
                }
            );
        }, rowRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={rowRef} className="w-full relative flex gap-10 justify-between">
            {/* Left side: Date and Company */}
            <div className="text-left w-2/6">
                <p className="text-text-secondary mb-2">{date}</p>
                <h3 className="font-semibold text-2xl md:text-4xl text-text-primary">{company}</h3>
            </div>

            {/* Center Timeline Dot */}
            <div className="relative flex justify-center">
                <span
                    ref={dotRef}
                    className="absolute top-3 w-4 h-4 rounded-full bg-dark-bg border-[1px] border-text-primary shadow-[0_0_20px_rgba(255,255,255,0.4)] z-10"
                />
            </div>

            {/* Right Side: Role and Description */}
            <div ref={contentRef} className="w-4/6 pl-4 md:pl-8">
                <h2 className="text-2xl md:text-5xl font-semibold text-brand mb-4 leading-none">{role}</h2>
                <p className="text-text-secondary md:text-xl leading-relaxed">{description}</p>
            </div>
        </div>
    );
}
