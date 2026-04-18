import { Link } from "react-router-dom";

export default function MarqueeButton({ label, icon: Icon, path, className, download, external }) {
  return (
    <a
      href={path}
      {...(download && { download: true })}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={` inline-block
        group w-fit relative overflow-hidden
        rounded-full border px-8 py-3
        tracking-wide
        font-semibold
        text-text-primary border-text-primary bg-dark-bg
        hover:border-brand
        ${className}
      `}
    >
      {/* STATIC TEXT */}
      <span
        className="
          absolute inset-0
          flex items-center text-text-primary justify-center gap-2
          transition-opacity duration-100 ease-linear
          group-hover:opacity-0
        "
      >
        {label}

        {Icon && <Icon className="size-5" />}
      </span>

      {/* MARQUEE TEXT */}
      <span
        aria-hidden
        className="
          relative block whitespace-nowrap
          opacity-0
          group-hover:opacity-100
          [--spacing:0em]
          [--start:-9em]
          [--end:9em]
          animate-[marquee_2s_linear_infinite]
          [animation-play-state:paused]
          group-hover:[animation-play-state:running]
          group-hover:text-brand
        "
      >
        {label}
      </span>
    </a>
  );
}
