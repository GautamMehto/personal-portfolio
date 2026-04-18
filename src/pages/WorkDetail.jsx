import React, { useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TechIcons, WorksData } from "../data";
import AnimatedButton from "../components/common/AnimatedButton";
import { BsArrowLeft, BsGithub, BsEye } from "react-icons/bs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const getIcons = (tech) => {
    const Icon = TechIcons[tech];
    return Icon ? <Icon className="text-lg opacity-90" /> : null;
}

const getBentoClass = (idx) => {
    switch (idx) {
        case 0: return "col-span-1 md:col-span-4 md:row-span-4";
        case 1: return "col-span-1 md:col-span-4 md:row-span-2";
        case 2: return "col-span-1 md:col-span-4 md:row-span-4";
        case 3: return "col-span-1 md:col-span-4 md:row-span-2";
        default: return "col-span-1 md:col-span-4 md:row-span-2";
    }
}

const WorkDetails = () => {
    const { title } = useParams();
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const currentIndex = WorksData.findIndex((w) => w.title === title);
    const work = WorksData[currentIndex];

    // Determine Prev and Next Works
    const prevWork = currentIndex > 0 ? WorksData[currentIndex - 1] : null;
    const nextWork = currentIndex < WorksData.length - 1 ? WorksData[currentIndex + 1] : null;

    const mediaItems = useMemo(() => {
        const items = work.images.map((img) => ({
            type: "image",
            src: img,
        }));

        return items;
    }, [work]);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!work || !containerRef.current) return;

        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Hero section animations
            tl.from(".header-nav", { opacity: 0, y: -20, duration: 0.5, ease: "power2.out" })
                .from(".tech-pill", { opacity: 0, scale: 0.9, stagger: 0.1, duration: 0.4, ease: "back.out(1.5)" }, "-=0.2")
                .from(".project-title", { opacity: 0, y: 30, duration: 0.6, ease: "power3.out" }, "-=0.2")
                .from(".action-btn", { opacity: 0, x: 20, stagger: 0.1, duration: 0.5, ease: "power2.out" }, "-=0.4")
                .from(".bento-item", { opacity: 0, y: 40, stagger: 0.1, duration: 0.7, ease: "power3.out" }, "-=0.4");

            // Scroll triggered animations for details
            gsap.utils.toArray(".detail-section").forEach(section => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                    opacity: 0,
                    y: 30,
                    duration: 0.6,
                    ease: "power2.out"
                });
            });

            // Pagination
            gsap.from(".pagination-nav", {
                scrollTrigger: {
                    trigger: ".pagination-nav",
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                ease: "power2.out"
            });

        }, containerRef);

        return () => ctx.revert();
    }, [title, work]);

    if (!work) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center text-text-primary bg-dark-bg">
                <h2 className="project-title font-helvetica font-black text-5xl md:text-9xl capitalize mb-8">Project not found</h2>
                <div className="group flex justify-between items-center mb-10 text-text-primary">
                    <button onClick={() => navigate(-1)} className="group group-hover:text-brand transition-colors duration-300 flex items-center gap-3 cursor-pointer">
                        <BsArrowLeft className="text-xl " />
                        <span className="text-sm font-bold tracking-tighter uppercase">BACK TO WORKS</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="bg-dark-bg min-h-screen text-text-primary pt-32 px-6 md:px-20">

            {/* TopAppBar */}
            <div className="group flex justify-between items-center mb-10 text-text-primary">
                <button onClick={() => navigate(-1)} className="group group-hover:text-brand transition-colors duration-300 flex items-center gap-3 cursor-pointer">
                    <BsArrowLeft className="text-xl " />
                    <span className="text-sm font-bold tracking-tighter uppercase">BACK TO WORKS</span>
                </button>
            </div>

            <main className="pb-10 md:pb-20  md:max-w-[1440px] mx-auto">
                {/* Hero Section */}
                <section className="mb-12 md:mb-24 border-b border-brand">
                    <div className="w-full flex flex-col md:flex-row items-baseline-last justify-between gap-12 pb-6 md:pb-0">
                        <div className="w-full md:w-5/6">
                            <div className="w-full flex flex-wrap gap-3 mb-6">
                                {work.tech.map((t, idx) => (
                                    <span key={idx} className="tech-pill bg-dark-surface px-4 py-2 rounded-full Paragraph text-[0.7rem] tracking-widest text-text-secondary uppercase flex items-center gap-2 border border-border-dark/50">
                                        {getIcons(t)}
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <h1 className="project-title w-full font-helvetica font-black text-7xl md:text-9xl mb-0 md:mb-8">
                                {work.title}
                            </h1>
                        </div>

                        <div className="flex flex-col sm:flex-row xl:flex-col gap-4">
                            {work.liveLink && (
                                <div className="action-btn">
                                    <AnimatedButton
                                        label="Live Preview"
                                        icon={BsEye}
                                        path={work.liveLink}
                                        external
                                    />
                                </div>
                            )}
                            {work.codeLink && (
                                <div className="action-btn">
                                    <AnimatedButton
                                        label="Source Code"
                                        icon={BsGithub}
                                        path={work.codeLink}
                                        external
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Bento Gallery */}
                <section className="mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-4 gap-6 md:h-screen md:grid-flow-dense">
                        {mediaItems.map((item, idx) => (
                            <div
                                key={idx}
                                className={`bento-item ${getBentoClass(idx)} bg-dark-surface overflow-hidden group min-h-[300px] md:min-h-0`}
                            >
                                <img
                                    src={item.src}
                                    alt={`Project preview ${idx + 1}`}
                                    className="w-full h-full flex items-center justify-center object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Content Section */}
                <section className="w-full h-fit detail-section">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
                        <div className="w-full flex flex-col gap-10">
                            <div className="flex items-center justify-center">
                                <h3 className="text-4xl font-semibold text-brand uppercase">Overview
                                </h3>
                                <div className="w-full h-0.5 bg-brand" />
                            </div>

                            <div className="col-span-2">
                                <p className="text-xl leading-relaxed text-text-primary mb-8 font-light">
                                    {work.about}
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-10">
                            <div className="flex items-center justify-center">
                                <h3 className="text-4xl font-semibold text-brand uppercase">Challenges
                                </h3>
                                <div className="w-full h-0.5 bg-brand" />
                            </div>

                            <div className="col-span-2">
                                <p className="text-xl leading-relaxed text-text-primary mb-8 font-light">
                                    {work.challenges}
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-10">
                            <div className="flex items-center justify-center">
                                <h3 className="text-4xl font-semibold text-brand uppercase">Approach
                                </h3>
                                <div className="w-full h-0.5 bg-brand" />
                            </div>

                            <div className="col-span-2">
                                <p className="text-xl leading-relaxed text-text-primary mb-8 font-light">
                                    {work.approach}
                                </p>

                            </div>
                        </div>
                    </div>

                    {work.video ?
                        (
                            <div className="w-full bg-dark-surface my-10">
                                <video alt="video" src={work.video} autoPlay loop muted className="w-full h-full object-contain md:object-cover" />
                            </div>
                        ) :
                        null
                    }


                    <div className="w-full flex flex-wrap gap-x-12 gap-y-6 pt-20 border-t border-border-dark/50">
                        <div>
                            <span className="text-xl block text-brand mb-2 uppercase tracking-widest">Performance</span>
                            <span className="text-4xl font-bold tracking-tighter">90.0%</span>
                        </div>
                        <div>
                            <span className="text-xl block text-brand mb-2 uppercase tracking-widest">Components</span>
                            <span className="text-4xl font-bold tracking-tighter">100+</span>
                        </div>
                        <div>
                            <span className="text-xl block text-brand mb-2 uppercase tracking-widest">Uptime</span>
                            <span className="text-4xl font-bold tracking-tighter">24/7</span>
                        </div>
                    </div>
                </section>
            </main>

            {/* Pagination */}
            <div className="pagination-nav bg-dark-bg border-t border-border-dark/50 py-20 pb-32">
                <div className="max-w-[1440px] w-full">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-10 group">
                        {prevWork ? (
                            <button onClick={() => navigate(`/work/${prevWork.title}`)} className="flex flex-col gap-2 md:hover:translate-x-2 transition-transform duration-500 cursor-pointer w-full md:w-auto text-center md:text-left">
                                <span className="Paragraph uppercase tracking-[0.2em] text-[0.7rem] text-text-secondary">PREVIOUS PROJECT</span>
                                <span className="text-3xl md:text-4xl uppercase tracking-tighter text-text-primary hover:text-brand transition-colors">{prevWork.title}</span>
                            </button>
                        ) : (
                            <div className="flex flex-col gap-2 w-full md:w-auto text-center md:text-left opacity-30">
                                <span className="Paragraph uppercase tracking-[0.2em] text-[0.7rem] text-text-secondary">PREVIOUS PROJECT</span>
                                <span className="text-3xl md:text-4xl uppercase tracking-tighter text-text-primary">-</span>
                            </div>
                        )}

                        <div className="w-full md:h-24 md:w-px bg-border-dark"></div>

                        {nextWork ? (
                            <button onClick={() => navigate(`/work/${nextWork.title}`)} className="flex flex-col md:items-end gap-2 md:hover:-translate-x-2 transition-transform duration-500 w-full md:w-auto text-center md:text-right cursor-pointer">
                                <span className="Paragraph uppercase tracking-[0.2em] text-[0.7rem] text-text-secondary">NEXT PROJECT</span>
                                <span className="text-3xl md:text-4xl uppercase tracking-tighter text-text-primary hover:text-brand transition-colors">{nextWork.title}</span>
                            </button>
                        ) : (
                            <div className="flex flex-col md:items-end gap-2 w-full md:w-auto text-center md:text-right opacity-30">
                                <span className="Paragraph uppercase tracking-[0.2em] text-[0.7rem] text-text-secondary">NEXT PROJECT</span>
                                <span className="text-3xl md:text-4xl uppercase tracking-tighter text-text-primary">-</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkDetails;
