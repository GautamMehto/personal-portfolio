import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

export default function FlowingMenu({
  items,
  speed = 12,
  className,
  textColor,
  bgColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
}) {
  return (
    <div className={`w-full h-full overflow-hidden ${bgColor} ${className}`}>
      <nav className="flex flex-col h-full">
        {items.map((item, i) => (
          <MenuItem
            key={i}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            isFirst={i === 0}
          />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({
  link,
  title,
  image,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  isFirst,
}) {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const animationRef = useRef(null);
  const [repetitions, setRepetitions] = useState(4);

  const animationDefaults = { duration: 0.6, ease: "expo.out" };

  // Detect closest vertical edge
  const findClosestEdge = (mouseY, height) => {
    return mouseY < height / 2 ? "top" : "bottom";
  };

  // Calculate required repetitions dynamically
  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;
      const part = marqueeInnerRef.current.querySelector(".marquee-part");
      if (!part) return;

      const contentWidth = part.offsetWidth;
      const viewportWidth = window.innerWidth;

      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };

    calculateRepetitions();
    window.addEventListener("resize", calculateRepetitions);

    return () => window.removeEventListener("resize", calculateRepetitions);
  }, [title, image]);

  // Horizontal infinite animation
  useEffect(() => {
    if (!marqueeInnerRef.current) return;

    const part = marqueeInnerRef.current.querySelector(".marquee-part");
    if (!part) return;

    const contentWidth = part.offsetWidth;
    if (!contentWidth) return;

    animationRef.current?.kill();

    animationRef.current = gsap.to(marqueeInnerRef.current, {
      x: -contentWidth,
      duration: speed,
      ease: "none",
      repeat: -1,
    });

    return () => animationRef.current?.kill();
  }, [repetitions, speed, title]);

  const handleEnter = (e) => {
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(e.clientY - rect.top, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" });
  };

  const handleLeave = (e) => {
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(e.clientY - rect.top, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" });
  };

  return (
    <div
      ref={itemRef}
      className={`work-card h-fit! relative flex-1 overflow-hidden text-center border-t ${!isFirst ? borderColor : "border-transparent"
        }`}
    >
      <Link
        to={link}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={`text-2xl md:text-4xl flex items-center justify-center h-[200px] uppercase ${textColor} tracking-wide`}
      >
        {title}
      </Link>
      <div style={{ backgroundImage: `url(${image})` }} className="w-fit object-cover" />

      <div
        ref={marqueeRef}
        className={`absolute inset-0 overflow-hidden pointer-events-none translate-y-[101%] ${marqueeBgColor}`}
      >
        <div ref={marqueeInnerRef} className="flex w-fit h-[200px]">
          {[...Array(repetitions)].map((_, i) => (
            <div
              key={i}
              className={`marquee-part flex items-center shrink-0 ${marqueeTextColor}`}
            >
              <span className="text-4xl whitespace-nowrap uppercase leading-none px-[1vw]">
                {title}
              </span>

              <img
                className="w-40 h-1/2 mx-[2vw] rounded-full bg-cover bg-center object-top object-cover"
                src={image}
                alt={title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
