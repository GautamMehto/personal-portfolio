import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { navItems } from "../../data";
import HighlightReveal from "../Animations/HighlightReveal";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    // ----- Brand GSAP ScrollTrigger Setup -----
    const brandRef = useRef(null);
    const navbarRef = useRef(null);

    const location = useLocation();
    useEffect(() => {
        const isDesktop = window.innerWidth >= 768;
        const finalTop = isDesktop ? '2rem' : '1.5rem';
        const finalLeft = isDesktop ? '5rem' : '1.5rem';

        // Refresh ScrollTrigger strictly on route change so page height is recalculated
        ScrollTrigger.refresh();

        const ctx = gsap.context(() => {
            const isHome = window.location.pathname === '/personal-portfolio/';

            if (isHome) {
                // Animate from large to small on scroll for Home
                gsap.set(brandRef.current, {
                    top: '1vh',
                    left: '5vw',
                    fontSize: '18vw',
                });

                gsap.to(brandRef.current, {
                    top: finalTop,
                    left: finalLeft,
                    fontSize: '2rem',
                    scrollTrigger: {
                        trigger: document.body,
                        start: 'top top',
                        end: '+=600',
                        scrub: 1.5,
                    }
                });
            } else {
                // Static small logo for all other pages
                gsap.set(brandRef.current, {
                    top: finalTop,
                    left: finalLeft,
                    fontSize: '2rem',
                });
            }

            // Navbar background blur still applies everywhere
            gsap.to(navbarRef.current, {
                backdropFilter: "blur(10px)",
                scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: '100px top',
                    scrub: 1.5,
                }
            });
        });

        // Cleanup: Revert context so there aren't duplicate triggers floating around
        return () => ctx.revert();
    }, [location.pathname]);

    // ----- Mobile Navigation Setup -----
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const linksRef = useRef([]);
    const tl = useRef(null);

    const topLetters = useRef([]);
    const bottomLetters = useRef([]);

    useEffect(() => {
        tl.current = gsap.timeline({ paused: true });

        tl.current
            .to(menuRef.current, {
                x: 0,
                duration: 0.3,
                ease: "power4.inOut",
            })
            .from(linksRef.current, {
                y: 60,
                opacity: 0,
                stagger: 0.1,
                duration: 0.3,
                ease: "power3.out",
            })
            .to(linksRef.current, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.3,
                ease: "power3.out",
            });
    }, []);

    useEffect(() => {
        if (open) {
            tl.current.play();
            document.body.style.overflow = "hidden";
        } else {
            tl.current.reverse();
            document.body.style.overflow = "auto";
        }
    }, [open]);

    const animateIn = (index) => {
        gsap.to(topLetters.current[index], {
            y: "-100%",
            stagger: 0.04,
            duration: 0.45,
            ease: "power3.out",
        });

        gsap.to(bottomLetters.current[index], {
            y: "-100%",
            stagger: 0.04,
            duration: 0.45,
            ease: "power3.out",
        });
    };

    const animateOut = (index) => {
        gsap.to(topLetters.current[index], {
            y: "0%",
            stagger: 0.04,
            duration: 0.45,
            ease: "power3.out",
        });

        gsap.to(bottomLetters.current[index], {
            y: "0%",
            stagger: 0.04,
            duration: 0.45,
            ease: "power3.out",
        });
    };

    return (
        <>
            {/* Main Navbar Container */}
            <nav className={`fixed h-20 top-0 left-0 w-full z-[60] pointer-events-none overflow-visible transition-colors duration-300`}>
                <div
                    ref={navbarRef}
                    className={`absolute inset-0 transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`}
                ></div>
                {/* Hamburger Button Container */}
                <div className="absolute top-6 right-6 md:top-8 md:right-20 z-[70] text-primary pointer-events-auto">
                    <div
                        onClick={() => { setOpen(!open) }}
                        className="flex gap-4 items-center cursor-pointer"
                    >
                        <span className={`hidden md:block font-bold tracking-widest ${open ? "text-brand" : "text-primary"}`}>{open ? "CLOSE" : "MENU"}</span>
                        <div className="w-8 h-6 flex flex-col justify-center items-center gap-1.5 relative">
                            <span
                                className={`block w-full h-[2px] transition-all duration-300 ${open ? "bg-brand rotate-45 translate-y-[8px]" : "bg-text-primary"
                                    }`}
                            />
                            <span
                                className={`block w-full h-[2px] transition-all duration-300 ${open ? "bg-brand opacity-0" : "bg-text-primary"
                                    }`}
                            />
                            <span
                                className={`block w-full h-[2px] transition-all duration-300 ${open ? "bg-brand -rotate-45 -translate-y-[8px]" : "bg-text-primary"
                                    }`}
                            />
                        </div>
                    </div>
                </div>

                {/* Floating Animated Brand Text */}
                <a
                    ref={brandRef}
                    href="/personal-portfolio"
                    className="inline-block text-text-primary! absolute z-50 tracking-tight pointer-events-auto font-bold uppercase items-end gap-2"
                    style={{ fontFamily: 'var(--font-helvetica)', lineHeight: 1 }}
                >
                    GAUTAM<sup className="text-[0.2em] ml-2">®</sup>
                </a>
            </nav>

            {/* Sliding Panel */}
            <div
                ref={menuRef}
                className="fixed top-0 right-0 h-screen w-full md:w-1/2 lg:w-1/3 bg-text-primary flex flex-col justify-between px-12 py-12 z-55 translate-x-full shadow-2xl"
            >
                {/* Nav Links */}
                <nav className="flex flex-col gap-6 mt-12 text-5xl md:text-5xl font-bold font-geist tracking-tight">
                    {navItems.map((link, index) => {
                        const isActive = location.pathname === link.link || (link.link !== '/' && location.pathname.startsWith(link.link));
                        return (
                            <HighlightReveal
                                key={index}
                                triggerState={open}
                                delay={0.3 + (index * 0.1)}
                                duration={0.5}
                                highlightColor="bg-dark-bg"
                                className={"w-full"}
                            >
                                <a
                                    href={link.link}
                                    ref={(el) => (linksRef.current[index] = el)}
                                    onMouseEnter={() => animateIn(index)}
                                    onMouseLeave={() => animateOut(index)}
                                    onClick={() => setOpen(false)}
                                    className={`relative w-fit overflow-hidden cursor-pointer flex items-baseline gap-4 transition-colors duration-300 ${isActive ? 'text-brand' : 'text-dark-surface'
                                        }`}
                                >
                                    {/* Text Wrapper */}
                                    <div className="group relative overflow-hidden h-[1.2em]">
                                        {/* TOP TEXT */}
                                        <div className="flex h-full items-center">
                                            {link.name.split("").map((char, i) => (
                                                <span
                                                    key={`top-${i}`}
                                                    ref={(el) => {
                                                        if (!topLetters.current[index])
                                                            topLetters.current[index] = [];
                                                        topLetters.current[index][i] = el;
                                                    }}
                                                    className={`inline-block transition-colors duration-300 ${isActive ? 'text-brand' : 'text-dark-surface'
                                                        }`}
                                                >
                                                    {char === " " ? "\u00A0" : char}
                                                </span>
                                            ))}
                                        </div>

                                        {/* BOTTOM TEXT */}
                                        <div className="absolute left-0 top-full flex h-full items-center">
                                            {link.name.split("").map((char, i) => (
                                                <span
                                                    key={`bottom-${i}`}
                                                    ref={(el) => {
                                                        if (!bottomLetters.current[index])
                                                            bottomLetters.current[index] = [];
                                                        bottomLetters.current[index][i] = el;
                                                    }}
                                                    className="inline-block text-brand"
                                                >
                                                    {char === " " ? "\u00A0" : char}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <span className={`text-sm font-medium opacity-50 transition-colors duration-300 group-hover:text-brand ${isActive ? 'text-brand' : 'text-dark-surface'
                                        }`}>
                                        0{index + 1}
                                    </span>
                                </a>
                            </HighlightReveal>
                        );
                    })}
                </nav>

                {/* Social Section */}
                <HighlightReveal
                    triggerState={open}
                    delay={0}
                    duration={0.5}
                    highlightColor="bg-dark-bg"
                    className={"w-full"}
                >
                    <div className="w-full flex justify-between items-center text-dark-surface border-t border-brand pt-10">
                        <div className="flex gap-6">
                            <a href="mailto:1mehetogautam@gmail.com" target="_blank" rel="noreferrer" className=" ">
                                <MdAlternateEmail size={22} className="hover:fill-brand transition-all hover:scale-110" />
                            </a>
                            <a href="https://github.com/GautamMehto" target="_blank" rel="noreferrer" className=" ">
                                <FaGithub size={22} className="hover:fill-brand transition-all hover:scale-110" />
                            </a>
                            <a href="https://www.linkedin.com/in/gautam-mehto" target="_blank" rel="noreferrer" className=" ">
                                <FaLinkedin size={22} className="hover:fill-brand transition-all hover:scale-110" />
                            </a>
                        </div>

                        <p className="font-semibold text-brand">© {new Date().getFullYear()}</p>
                    </div>
                </HighlightReveal>
            </div>

            {/* Backdrop overlay */}
            <div
                className={`fixed inset-0 bg-dark-bg/50 backdrop-blur-sm z-50 transition-opacity duration-500 pointer-events-none ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}
                onClick={() => setOpen(false)}
            ></div>

        </>
    );
};

export default Navbar;
