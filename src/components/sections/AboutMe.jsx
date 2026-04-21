import React, { useRef, useEffect, lazy } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Download } from 'lucide-react';
import { AboutMe, StatsData } from '../../data';
// import AnimatedButton from '../common/AnimatedButton';
// import MarqueeButton from '../common/MarqueeButton';

const AnimatedButton = lazy(() => import('../common/AnimatedButton'));
const MarqueeButton = lazy(() => import('../common/MarqueeButton'));

gsap.registerPlugin(ScrollTrigger);

const AboutMeSection = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        // ScrollTrigger text reveal animation
        const words = textRef.current.querySelectorAll('.reveal-word');

        const ctx = gsap.context(() => {
            // Text reveal
            gsap.fromTo(words,
                { color: 'var(--text-secondary)', opacity: .50 },
                {
                    color: 'var(--text-primary)', // Animate from gray to white
                    stagger: 0.25,
                    opacity: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 40%', // Start when section is slightly below center
                        end: 'center center',     // End when bottom hits center
                        scrub: 1,                 // Smooth scrubbing linking animation to scroll bar
                    }
                });

            // Stats and Buttons stagger animation
            const bottomElements = bottomRef.current.querySelectorAll('.animate-up');

            gsap.fromTo(bottomElements,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: bottomRef.current,
                        start: 'top bottom-=100',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    const primaryText = AboutMe[0].description;

    // Split the primaryText into words and wrap each in a span
    const words = primaryText.split(' ').map((word, i) => (
        <span key={i} className="reveal-word inline-block mr-2 lg:mr-4 text-text-secondary transition-colors duration-200">
            {word}
        </span>
    ));

    return (
        <section ref={sectionRef} className="w-full h-fit flex flex-col justify-center bg-dark-bg py-20 px-6 md:px-20 relative z-20">
            <div className="container w-full mx-auto">
                <div className="pb-10 border-b border-brand mb-6 md:mb-12">
                    <h2 className="font-helvetica text-7xl md:text-9xl font-semibold text-text-primary">
                        About Me
                    </h2>
                </div>

                <div
                    ref={textRef}
                    className="text-2xl md:text-5xl lg:text-5xl font-medium tracking-tight leading-tight md:leading-tight lg:leading-[1.1] mb-20"
                >
                    {words}
                </div>

                <div ref={bottomRef} className="w-full flex flex-col gap-10 justify-center items-center">
                    <div className="col-span-4 gap-2 md:gap-0 grid grid-cols-1 md:grid-cols-4 grid-rows-auto w-full">
                        {StatsData.map((stat, index) => (
                            <div key={index} className={`${stat.className} col-span-1 p-6 animate-up flex items-start flex-col gap-2`}>
                                <span className="text-4xl md:text-5xl font-bold text-brand">
                                    {stat.value
                                        ? stat.value
                                        : (new Date().getFullYear() - 2024) + "+"
                                    }
                                </span>
                                <span className="text-xl text-text-primary uppercase tracking-widest font-medium">
                                    {stat.label}
                                </span>
                                <span className="w-full text-sm text-text-secondary uppercase font-medium">
                                    {stat.description}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full flex flex-col md:flex-row justify-center items-start gap-6">
                        <div className="animate-up">
                            <AnimatedButton
                                label="More About Me"
                                icon={ArrowRight}
                                path={"/personal-portfolio/about"}
                            />
                        </div>
                        <div className="animate-up">
                            <MarqueeButton
                                label="Download CV"
                                icon={Download}
                                path={"/personal-portfolio/Gautam-Mehto-Resume.pdf"}
                                download
                                external
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default AboutMeSection;
