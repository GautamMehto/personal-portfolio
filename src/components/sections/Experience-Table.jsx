import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExperienceData } from "../../data";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceTable() {
    const tableRef = useRef(null);

    useEffect(() => {
        if (!tableRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".experience-header",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: tableRef.current,
                        start: "top 85%",
                    },
                }
            );

            gsap.fromTo(
                ".experience-row",
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: tableRef.current,
                        start: "top 80%",
                    },
                }
            );
        }, tableRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative min-h-screen text-text-primary bg-dark-bg py-10 md:py-20 px-6 md:px-20 overflow-hidden flex flex-col justify-center">

            {/* Section Header */}
            <div className="relative z-10 w-full mx-auto pb-10 border-b border-brand mb-6 md:mb-12">
                <h2 className="font-helvetica text-7xl md:text-9xl font-semibold text-text-primary">
                    Work Experience
                </h2>
            </div>

            <div className="relative z-10 w-full mx-auto" ref={tableRef}>
                <div className="flex flex-col w-full">
                    {/* Table Header Row */}
                    <div className="experience-header hidden lg:grid lg:grid-cols-12 gap-4 lg:gap-8 items-center py-6 border-b border-border-dark">
                        <div className="lg:col-span-2 text-text-secondary font-geist text-sm tracking-[0.2em] font-semibold uppercase">
                            Timeframe
                        </div>
                        <div className="lg:col-span-4 text-text-secondary font-geist text-sm tracking-[0.2em] font-semibold uppercase pl-1">
                            Role
                        </div>
                        <div className="lg:col-span-3 text-text-secondary font-geist text-sm tracking-[0.2em] font-semibold uppercase">
                            Company
                        </div>
                        <div className="lg:col-span-3 text-text-secondary font-geist text-sm tracking-[0.2em] font-semibold uppercase">
                            Description
                        </div>
                    </div>

                    {ExperienceData.map((exp, index) => (
                        <div
                            key={index}
                            className="experience-row group flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-8 items-start lg:items-center py-10 md:py-14 border-b border-border-dark"
                        >
                            {/* Date */}
                            <div className="lg:col-span-2 text-text-secondary font-geist text-sm md:text-base font-medium tracking-widest uppercase">
                                {exp.date}
                            </div>

                            {/* Role */}
                            <div className="lg:col-span-4 w-full">
                                <h3 className="font-helvetica text-3xl md:text-5xl lg:text-5xl font-bold uppercase tracking-wide text-text-primary group-hover:text-brand transition-all duration-500 group-hover:translate-x-2">
                                    {exp.role}
                                </h3>
                            </div>

                            {/* Company */}
                            <div className="lg:col-span-3 text-text-primary font-geist text-sm md:text-base font-bold uppercase tracking-[0.2em]">
                                {exp.company}
                            </div>

                            {/* Description */}
                            <div className="lg:col-span-3 text-text-secondary font-geist leading-relaxed text-sm md:text-base group-hover:text-text-primary transition-all duration-300">
                                {exp.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
