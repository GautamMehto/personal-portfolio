import React, { useRef, useEffect, lazy } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
// import AnimatedButton from '../common/AnimatedButton';
// import HoverRevealText from '../common/HoverRevealText';

const AnimatedButton = lazy(() => import('../common/AnimatedButton'));
const HoverRevealText = lazy(() => import('../common/HoverRevealText'));

const Hero = () => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const isDesktop = window.innerWidth >= 768;

    useEffect(() => {
        const ctx = gsap.context(() => {

            gsap.set(imageRef.current, { width: "100%" });
            gsap.set(".Hero-Content", {
                y: 50,
            });

            gsap.to(imageRef.current, {
                width: "60%",
                duration: 1.5,
                delay: 1,
                ease: "power4.out",
            });

            gsap.to(".Hero-Content", {
                y: 0,
                opacity: 1,
                duration: 1.5,
                delay: 1,
                ease: "power4.out",
                stagger: 0.2,
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-dark-bg px-6 md:px-20 pt-20"
        >
            {/* Background Massive Text handled by Navbar scroll animation */}

            {/* Diagonal Image Cutout (placeholder for now) */}
            <div className="absolute inset-0 z-10 pointer-events-none flex justify-center items-center">
                {isDesktop ? (
                    <div
                        ref={imageRef}
                        className="w-full h-screen bg-cover bg-center"
                        style={{
                            clipPath: 'polygon(0% 100%, 50% 0%, 100% 0%, 50% 100%)'
                        }}
                    >
                        <video src="src/assets/images/BackgroundVideo.mp4" className='w-full h-full object-cover object-center' autoPlay loop muted></video>
                    </div>) : (
                    <div
                        ref={imageRef}
                        className="w-full  h-1/3 bg-cover bg-center"
                        style={{
                            clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)'
                        }}
                    >
                        <video src="src/assets/images/BackgroundVideo.mp4" className='w-full h-full object-cover object-center' autoPlay loop muted></video>
                    </div>)}
            </div>

            {/* Foreground Content */}
            <div className="relative z-20 container mx-auto h-full flex flex-col justify-between pb-12 pt-16">

                {/* Top spacing area to push content down */}
                <div className="hidden md:flex flex-1 "></div>

                {/* Bottom textual content */}
                <div className="w-full h-full flex flex-col md:flex-row justify-between items-end gap-16">
                    <div className="Hero-Content opacity-0 max-w-md">
                        <HoverRevealText
                            primaryText="I build brands, websites, and digital experiences with intention, clarity and care."
                            secondaryText="I Hide things, which are not meant to be seen in brands, websites, and digital experiences "
                            className="text-center md:text-left text-3xl md:text-5xl font-semibold tracking-tight leading-none text-text-primary! capitalize"
                        />
                    </div>

                    <div className="Hero-Content opacity-0 flex flex-col items-center md:items-end gap-0 text-right">
                        <div className="max-w-md text-4xl md:text-6xl font-semibold tracking-tight flex flex-col gap-0 leading-none">
                            <HoverRevealText
                                primaryText="Making Good Shits, Built with Passion."
                                secondaryText="Hiding Bad Shits, Removed with Passion."
                                className="text-center md:text-right text-text-primary!"
                            />
                        </div>
                        <AnimatedButton
                            label="START A PROJECT"
                            icon={ArrowRight}
                            path="/contact"
                            className="mt-4"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
