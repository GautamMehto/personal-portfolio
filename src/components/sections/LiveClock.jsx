import { useEffect, useRef } from "react";

export default function LiveClock({ dial, hour, minute, second }) {
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      // Degrees
      const secDeg = seconds * 6;
      const minDeg = minutes * 6 + seconds * 0.1;
      const hourDeg = (hours % 12) * 30 + minutes * 0.5;

      if (secondRef.current)
        secondRef.current.style.transform = `rotate(${secDeg}deg)`;

      if (minuteRef.current)
        minuteRef.current.style.transform = `rotate(${minDeg}deg)`;

      if (hourRef.current)
        hourRef.current.style.transform = `rotate(${hourDeg}deg)`;
    };

    updateClock(); // initial
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative aspect-square w-4/6">
      {/* Dial */}
      <img src={dial} alt="" className="absolute inset-0 w-full h-full" />

      {/* Hour */}
      <img
        ref={hourRef}
        src={hour}
        alt=""
        className="absolute inset-0 w-full h-full origin-center"
      />

      {/* Minute */}
      <img
        ref={minuteRef}
        src={minute}
        alt=""
        className="absolute inset-0 w-full h-full origin-center"
      />

      {/* Second */}
      <img
        ref={secondRef}
        src={second}
        alt=""
        className="absolute inset-0 w-full h-full origin-center"
      />
    </div>
  );
}
