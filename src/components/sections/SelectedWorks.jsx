import React, { useRef, useEffect, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import HoverButton from "../common/HoverButton";
import { TechIcons, WorksData } from "../../data";
import AnimatedButton from "../common/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

const SelectedWorks = () => {
    const containerRef = useRef(null);
    const rightColRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Only Featured Works
    const featuredWorks = useMemo(
        () => WorksData.filter((work) => work.feature === true),
        []
    );

    useEffect(() => {
        const ctx = gsap.context(() => {
            let mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    pin: rightColRef.current,
                });
            });

            const items = gsap.utils.toArray(".project-item");

            items.forEach((item, i) => {
                ScrollTrigger.create({
                    trigger: item,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => setActiveIndex(i),
                    onEnterBack: () => setActiveIndex(i),
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);


    const getIcon = (tech) => {
        const Icon = TechIcons[tech];
        return Icon && <Icon className="text-lg opacity-90" />;
    };
    return (
        <section className="py-10 md:py-20 px-6 md:px-20">
            {/* Section Title */}
            <div className="pb-10 border-b mb-6 md:mb-12 border-brand">
                <h2 className="font-helvetica text-7xl md:text-9xl font-semibold text-text-primary">
                    Selected Work
                </h2>
            </div>
            <div
                ref={containerRef}
                className="w-full bg-dark-bg text-text-primary"
            >

                <div className="flex flex-col md:flex-row">

                    {/* LEFT SIDE */}
                    <div className="w-full md:w-1/2 pt-20">

                        {featuredWorks.map((work, index) => (
                            <div
                                key={work.id}
                                className={`project-item min-h-[80vh] flex flex-col justify-center transition-opacity duration-500 ${activeIndex === index ? "opacity-100" : "opacity-30"
                                    }`}
                            >

                                <div className="text-outline text-[80px] md:text-[150px] font-bold leading-none">
                                    0{index + 1}
                                </div>

                                <h3 className="text-3xl md:text-5xl font-semibold text-text-primary mt-4 mb-4 line-clamp-1">
                                    {work.title}
                                </h3>

                                <p className="text-text-secondary md:text-xl text-sm w-full mb-6 line-clamp-3">
                                    {work.about}
                                </p>

                                {/* IMAGE FOR MOBILE VIEW */}
                                <a
                                    href={`/work/${work.title}`}
                                    className="md:hidden w-full h-[60vw] rounded-xl overflow-hidden mb-8 block relative hover:scale-[1.02] transition-transform duration-300"
                                >
                                    <img
                                        src={work.thumbnailImage}
                                        alt={work.title}
                                        className="w-full h-full object-cover object-top"
                                    />
                                </a>

                                {/* TECH STACK */}
                                <div className="flex gap-3 flex-wrap mb-6">
                                    {work.tech.map((tech, i) => (
                                        i < 3 ?
                                            (

                                                <p
                                                    key={i}
                                                    className="px-4 py-2 flex gap-1 items-center  text-sm rounded-full bg-text-secondary/10 border border-text-secondary/10"
                                                >
                                                    <span>
                                                        {getIcon(tech)}
                                                    </span>
                                                    {tech}
                                                </p>
                                            ) : (
                                                i == 3 &&
                                                <p className="px-4 py-2 flex gap-1 items-center  text-sm rounded-full bg-text-secondary/10 border border-text-secondary/10">
                                                    + {work.tech.length - i}
                                                </p>

                                            )
                                    ))}
                                </div>
                                <div className="flex gap-3 flex-wrap mb-6">
                                    {work.liveLink !== null && (
                                        <HoverButton
                                            label="Live preview"
                                            icon={ArrowUpRight}
                                            path={work.liveLink}
                                        />
                                    )}
                                    {/* {work.codeLink !== null && ( */}
                                    <HoverButton
                                        label="Explore"
                                        icon={ArrowUpRight}
                                        path={`/work/${work.title}`}
                                    />
                                    {/* )} */}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT SIDE */}
                    <div
                        ref={rightColRef}
                        className="hidden md:flex w-1/2 h-screen items-center justify-center"
                    >
                        <div className="relative w-[90%] h-[75%] rounded-2xl overflow-hidden">

                            {featuredWorks.map((work, index) => (
                                <a
                                    key={work.id}
                                    href={`/work/${work.title}`}
                                    className="absolute inset-0 transition-all duration-700"
                                    style={{
                                        opacity: activeIndex === index ? 1 : 0,
                                        transform:
                                            activeIndex === index
                                                ? "scale(1)"
                                                : "scale(0.95)",
                                        pointerEvents:
                                            activeIndex === index ? "auto" : "none",
                                        zIndex: activeIndex === index ? 10 : 0,
                                    }}
                                >
                                    <img
                                        src={work.thumbnailImage}
                                        className="w-full h-full object-cover object-top hover:scale-105 transition-all duration-700"
                                        alt={work.title}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-6">
                <div className="animate-up">
                    <AnimatedButton
                        label="View More"
                        icon={ArrowRight}
                        path={"/works"}
                    />
                </div>
            </div>
        </section >
    );
};

export default SelectedWorks;