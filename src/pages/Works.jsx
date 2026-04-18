import React, { lazy, useEffect, useRef } from "react";
import gsap from "gsap";
// import WorksSection from "../components/Works/WorksSection";
// import HoverRevealText from "../components/common/HoverRevealText";
// import TechStack from "../components/sections/TechStack";

const WorksSection = lazy(() => import("../components/Works/WorksSection"));
const HoverRevealText = lazy(() => import("../components/common/HoverRevealText"));
const TechStack = lazy(() => import("../components/sections/TechStack"));

const Work = () => {
    const worksectionRef = useRef(null);
    const worktitleRef = useRef(null);
    const workgridRef = useRef(null);

    // Parallax: title vs grid
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(worktitleRef.current, {
                y: 200,
                ease: "none",
                scrollTrigger: {
                    trigger: worksectionRef.current,
                    start: "top 30%",
                    scrub: true,
                },
            });
        }, worksectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={worksectionRef} className="Work-section w-full h-fit px-6 md:px-12 lg:px-20 pt-32 mb-40">
            <div className="flex flex-col gap-5 items-center justify-center pt-10">
                <div className="w-full pb-10 border-b border-brand mb-12">
                    <div className="w-full md:w-2/3 flex">
                        <HoverRevealText
                            primaryText="Production Real Projects"
                            secondaryText="Crafting Unique Experiences"
                            className="font-helvetica text-7xl md:text-9xl font-semibold text-text-primary"
                        />
                    </div>
                </div>
            </div>
            <div className="">
                <WorksSection workgridRef={workgridRef} TabsActive={true} />
            </div>

            <TechStack otherClass="my-20! px-0!" />
        </section>
    );
};

export default Work;
