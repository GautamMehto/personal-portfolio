import React, { useEffect, useRef } from 'react';
import HoverRevealText from '../components/common/HoverRevealText';
import gsap from 'gsap';
import { ArrowRight, Download } from 'lucide-react';
import AnimatedButton from '../components/common/AnimatedButton';
import MarqueeButton from '../components/common/MarqueeButton';
import CharacterTraitsMarquee from '../components/sections/CharacterTraitsMarquee';
import Stats from '../components/sections/Stats';
import ExperienceTable from '../components/sections/Experience-Table';

const About = () => {

    const imageRef = useRef(null);
    const statsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                imageRef.current,
                {
                    y: 40,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 1.5,
                    ease: "power3.out",
                }
            );

            statsRef.current.forEach((stat) => {
                gsap.fromTo(
                    stat,
                    {
                        y: 40,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: stat,
                            start: "top 80%",
                            end: "bottom 20%",
                            scrub: 1,
                        },
                    }
                );
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <main className="min-h-screen bg-dark-bg text-white">
            <section className="px-6 md:px-20 flex flex-col items-center justify-center pt-20">
                <div className='w-full flex flex-col md:flex-row justify-between items-center'>
                    <div className='w-full md:w-[60%] flex flex-col items-center justify-center'>
                        <HoverRevealText
                            primaryText="Hello! I am Gautam Mehto"
                            secondaryText="A Human behind the Codes"
                            className="text-7xl md:text-9xl font-helvetica font-semibold leading-none text-text-primary! text-center md:text-left"
                        />

                        <p className="text-text-secondary text-center md:text-left text-xl mt-5">
                            Frontend Developer and UI/UX Designer. Crafting cinematic digital experiences with surgical precision and unyielding passion for the craft.
                        </p>

                        <div className="w-full flex flex-col md:flex-row justify-center md:justify-start items-center md:items-start gap-3 mt-8">
                            <div className="animate-up">
                                <AnimatedButton
                                    label="Download CV"
                                    icon={Download}
                                    path={"/personal-portfolio/Gautam-Mehto-Resume.pdf"}
                                    download
                                    external
                                />
                            </div>
                            <div className="animate-up">
                                <MarqueeButton
                                    label="Explore Work"
                                    icon={ArrowRight}
                                    path={"/works"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="relative w-[90%] sm:w-[80%] md:w-[500px] mx-auto mt-10 md:mt-0">
                        <img
                            ref={imageRef}
                            src="./images/Profile.png"
                            alt="profile"
                            className="w-full h-full rounded-xl object-cover"
                        />
                    </div>
                </div>
                <Stats />
            </section>
            <ExperienceTable />
            <CharacterTraitsMarquee />
        </main>
    );
};

export default About;
