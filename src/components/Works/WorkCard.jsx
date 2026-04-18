import { useRef, useEffect } from "react";
import gsap from "gsap";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import MarqueeButton from "../common/MarqueeButton";

export function WorkCard({ work }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const marqueeInnerRef = useRef(null);

  const hoverTL = useRef(null);
  const marqueeTL = useRef(null);

  useEffect(() => {
    // Create reusable timeline
    hoverTL.current = gsap.timeline({ paused: true });

    hoverTL.current
      .to(cardRef.current, {
        scale: 1.03,
        duration: 0.35,
        ease: "power3.out",
      })
      .to(
        imageRef.current,
        {
          scale: 1.06,
          duration: 0.35,
          ease: "power3.out",
        },
        0,
      )
      .to(
        overlayRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          pointerEvents: "auto",
        },
        0,
      );

    // Create marquee timeline
    marqueeTL.current = gsap.to(marqueeInnerRef.current, {
      xPercent: -50,
      duration: 10,
      ease: "none",
      repeat: -1,
      paused: true,
    });

    return () => {
      hoverTL.current.kill();
      if (marqueeTL.current) marqueeTL.current.kill();
    };
  }, []);

  const handleEnter = () => {
    hoverTL.current.play();
    marqueeTL.current.play();
  };
  const handleLeave = () => {
    hoverTL.current.reverse();
    marqueeTL.current.pause();
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="work-card block p-3 rounded-2xl border border-text-secondary/30 hover:border-brand/50 transition-colors duration-300"
    >
      <div
        ref={cardRef}
        className="relative rounded-2xl overflow-hidden bg-dark-bg"
      >
        {/* Image */}
        <div className="relative aspect-4/3 overflow-hidden">
          <img
            ref={imageRef}
            src={work.thumbnailImage}
            alt={work.title}
            className="w-full h-full flex justify-center items-center object-cover object-top will-change-transform"
          />

          {/* Overlay */}
          <Link
            to={`/work/${work.title}`}
            ref={overlayRef}
            className="absolute inset-0 flex items-center justify-center flex-col backdrop-blur-sm bg-dark-bg/40 opacity-0 scale-95 pointer-events-none overflow-hidden"
          >
            <div ref={marqueeInnerRef} className="flex w-max">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center shrink-0 px-[2vw]">
                  <span className="text-2xl uppercase whitespace-nowrap text-text-primary flex items-center gap-4">
                    {work.title} <BsArrowRight className="text-2xl text-text-primary" />
                  </span>
                </div>
              ))}
            </div>
          </Link>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-3 justify-between items-start">
          <div className="w-full flex justify-between items-baseline gap-3">
            <h3 className="text-2xl md:text-4xl font-semibold line-clamp-1">
              {work.title}
            </h3>
            <p className="text-sm md:text-base w-fit capitalize text-text-secondary">
              {work.category.website ? "Website" : "Design"}
            </p>
          </div>

          <p className="text-sm md:text-base w-full text-text-secondary line-clamp-2">
            {work.about}
          </p>
          <MarqueeButton
            label="View Project"
            icon={BsArrowRight}
            path={`/work/${work.title}`}
            className="text-sm! rounded-xl!"
          />
        </div>
      </div>
    </div>
  );
}
