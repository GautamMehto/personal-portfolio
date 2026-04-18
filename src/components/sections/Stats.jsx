import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StatsData } from '../../data';

gsap.registerPlugin(ScrollTrigger);

const Stats = () => {
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
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                        end: "bottom 70%",
                        scrub: 1,
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <section ref={sectionRef} className="relative w-full py-20 bg-dark-bg text-text-primary overflow-hidden flex flex-col items-center justify-start min-h-screen">

            {/* Massive Background Stroke Text */}
            <div className="w-full pb-10 border-b border-brand">
                <h2 className="font-helvetica text-7xl md:text-9xl font-semibold text-text-primary">
                    Numbers Don't Lie
                </h2>
            </div>

            {/* Foreground Stats Cards */}
            <div className="relative z-10 w-full px-6 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">

                {/* Stat Cards */}
                {StatsData.map((stat, i) => (
                    <div key={stat.label} ref={addToRefs}>
                        <div className={`flex flex-col items-center md:items-start text-center md:text-left bg-dark-bg border-brand backdrop-blur-sm p-8 rounded-2xl shadow-2xl translate-y-0 ${i >= 0 ? 'border-l-4' : ''}`} style={{
                            transform: window.innerWidth >= 768 ? `translateY(${3 * i}rem)` : "none",
                        }}>
                            <span className="text-5xl font-bold mb-2 text-brand" style={{}}>{stat.value ? stat.value : (new Date().getFullYear() - 2024) + "+"}</span>
                            <h3 className="text-xl uppercase font-medium mb-2">{stat.label}</h3>
                            <p className="text-md text-text-secondary">{stat.description}</p>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default Stats;
