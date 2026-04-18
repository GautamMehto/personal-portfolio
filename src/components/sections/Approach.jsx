import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ApproachData } from "../../data";
import { BsFillCursorFill } from "react-icons/bs";
import dialImg from "/images/Clock Dial.png";
import hourImg from "/images/Hour Hand.png";
import minuteImg from "/images/Minute Hand.png";
import secondImg from "/images/Second Hand.png";
import LiveClock from "./LiveClock";

gsap.registerPlugin(ScrollTrigger);

export default function Approach() {
    const ApproachsectionRef = useRef(null);

    useEffect(() => {
        if (!ApproachsectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(".approach-card", {
                opacity: 0,
                y: 60,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.15,
                scrollTrigger: {
                    trigger: ApproachsectionRef.current,
                    start: "top 75%"
                }
            });
        }, ApproachsectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={ApproachsectionRef} className="relative bg-dark-bg text-text-primary px-6 md:px-20 mb-20">
            <div className="pb-10 border-b border-brand mb-6 md:mb-12">
                <h2 className="font-helvetica text-5xl md:text-9xl font-semibold text-text-primary">
                    My Approach
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 auto-rows-[400px] md:auto-rows-[500px]">
                {ApproachData.map((item, i) => {
                    if (item.type === "scroll-carousel") return <DiscoveryCarouselCard key={i} {...item} />;
                    if (item.type === "research") return <ResearchCard key={i} {...item} />;
                    if (item.type === "floating-mobiles") return <MobileFloatingCard key={i} {...item} />;
                    if (item.type === "conversion") return <ConversionDrivenCard key={i} {...item} />;
                    if (item.type === "figma-cursors") return <FigmaCursorCard key={i} {...item} />;
                    if (item.type === "clock") return <FutureClockCard key={i} {...item} />;
                    return null;
                })}
            </div>
        </div>
    );
}

function DiscoveryCarouselCard({ title, description, images, span }) {
    const trackRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const track = trackRef.current;
            const container = containerRef.current;
            let currentX = 0;
            const maxShift = () => track.scrollWidth - container.offsetWidth;

            const tween = gsap.to(track, { x: () => currentX, ease: "power3.out", duration: 0.6, paused: true });

            ScrollTrigger.create({
                trigger: container,
                start: "top 100%",
                end: "bottom top",
                onUpdate(self) {
                    currentX -= self.direction * 8;
                    currentX = gsap.utils.clamp(-maxShift(), 0, currentX);
                    tween.invalidate().restart();
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={`approach-card relative overflow-hidden  bg-[url('./images/Background.png')] bg-top-left bg-no-repeat  ${span} border border-border-dark`}>
            <div className="w-full h-full bg-dark-bg/10 backdrop-blur-sm absolute inset-0" />
            <div className="w-full h-fit relative z-10 p-6 ">
                <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                <p className="text-sm text-text-primary line-clamp-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
            <div className="relative bottom-0 left-0 w-full h-full overflow-hidden">
                <div ref={trackRef} className="flex gap-4 px-6 will-change-transform">
                    {images && images.map((src, i) => (
                        <div key={i} className="w-full flex-shrink-0 rounded-xl overflow-hidden">
                            <img src={src} alt="" className="w-full h-[900px] object-fill md:object-contain object-top" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ResearchCard({ title, description, image, span }) {

    return (
        <div className={`approach-card relative overflow-hidden  bg-[url('./images/Background.png')] bg-top-left bg-no-repeat  ${span} border border-border-dark`}>
            <div className="w-full h-full bg-dark-bg/10 backdrop-blur-sm absolute inset-0" />
            <div className="relative z-10 p-6">
                <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                <p className="text-sm text-text-primary line-clamp-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
            <div className="relative w-full h-full overflow-hidden hover:-translate-y-2 transition-all duration-300">
                <img src={image} alt="" className="w-full h-full object-left object-cover" />
            </div>
        </div>
    );
}

function MobileFloatingCard({ title, description, images, span }) {
    const phone1Ref = useRef(null);
    const phone2Ref = useRef(null);

    useEffect(() => {
        if (!phone1Ref.current || !phone2Ref.current) return;

        const ctx = gsap.context(() => {
            gsap.to(phone1Ref.current, { y: -18, rotate: -1.5, duration: 3, ease: "sine.inOut", repeat: -1, yoyo: true });
            gsap.to(phone2Ref.current, { y: 28, rotate: 1.5, duration: 5, ease: "sine.inOut", repeat: -1, yoyo: true });
        }, phone1Ref);

        return () => ctx.revert();
    }, []);

    return (
        <div className={`approach-card relative overflow-hidden  bg-[url('./images/Background.png')] bg-top-right bg-no-repeat  ${span} border border-border-dark`}>
            <div className="w-full h-full bg-dark-bg/10 backdrop-blur-sm absolute inset-0" />
            <div className="relative z-10 p-6">
                <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                <p className="text-sm text-text-primary line-clamp-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
            <div className="w-full h-full relative">
                {images && images[0] && <img ref={phone1Ref} src={images[0]} alt="" className="w-[75%] md:w-2/3 left-0 md:left-4 absolute pointer-events-none rounded-xl -translate-y-15.5" />}
                {images && images[1] && <img ref={phone2Ref} src={images[1]} alt="" className="w-[75%] md:w-2/3 right-0 md:right-4 absolute pointer-events-none rounded-xl -translate-y-15.5" />}
            </div>
        </div>
    );
}

function FigmaCursorCard({ title, description, image, span }) {
    const cursor1 = useRef(null);
    const cursor2 = useRef(null);

    useEffect(() => {
        if (!cursor1.current || !cursor2.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, yoyo: true });
            tl.to(cursor1.current, { y: -12, duration: 1.6, ease: "sine.inOut" }, 0);
            tl.to(cursor2.current, { y: 12, duration: 1.6, ease: "sine.inOut" }, 0);
        }, cursor1);

        return () => ctx.revert();
    }, []);

    return (
        <div className={`approach-card relative overflow-hidden  bg-[url('./images/Background.png')] bg-bottom-left bg-no-repeat ${span} border border-border-dark`}>
            <div className="w-full h-full bg-dark-bg/10 backdrop-blur-sm absolute inset-0" />
            <div className="relative z-10 p-6">
                <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                <p className="text-sm text-text-primary line-clamp-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
            <div className="w-full h-full relative">
                <div className="absolute inset-x-6 rounded-xl overflow-hidden"><img src={image} alt="Figma workspace" className="w-full h-[250px] md:h-auto object-cover" /></div>
                <div ref={cursor1} className="absolute md:top-[35%] top-[10%] left-[10%] z-20"><Cursor name="Gautam Mehto" /></div>
                <div ref={cursor2} className="absolute md:top-[65%] top-[30%] left-[60%] z-20"><Cursor name="Client" /></div>
            </div>
        </div>
    );
}

function Cursor({ name }) {
    return (
        <div className="flex items-center gap-2">
            <BsFillCursorFill size={20} className="rotate-280 text-brand fill-current" />
            <div className="text-xs backdrop-blur px-2 py-1 rounded-full bg-text-primary/10 border border-text-primary text-text-primary shadow-lg">{name}</div>
        </div>
    );
}

function FutureClockCard({ title, description, span }) {
    return (
        <div className={`approach-card relative overflow-hidden  bg-[url('./images/Background.png')] bg-bottom-right bg-no-repeat ${span} border border-border-dark`}>
            <div className="w-full h-full bg-dark-bg/10 backdrop-blur-sm absolute inset-0" />
            <div className="relative z-10 p-6">
                <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                <p className="text-sm text-text-primary line-clamp-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
            <div className="w-full h-fit flex justify-center">
                <LiveClock dial={dialImg} hour={hourImg} minute={minuteImg} second={secondImg} />
            </div>
        </div>
    );
}
