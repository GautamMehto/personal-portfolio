
export default function AnimatedButton({ label, icon: Icon, path, className, download, external }) {

  return (
    <a
      href={path}
      {...(download && { download: true })}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={`
        group relative flex items-center justify-center gap-5
        px-7 py-3 text-base
        rounded-full
        w-fit
        border border-brand
        text-brand!
        bg-dark-bg
        cursor-pointer overflow-hidden
        transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]
        hover:text-text-primary!
        active:scale-95
        active:shadow-[0_0_0_4px_rgb(255,255,255)]
        font-semibold
        ${className}
      `}
    >
      {/* LEFT ICON (enters) */}
      <span
        className="
          absolute left-[-25%] z-10
          transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]
          group-hover:left-4
          group-hover:text-text-primary
        "
      >
        {Icon ? <Icon className="size-5" /> : null}
      </span>

      {/* TEXT */}
      <span
        className="
          relative z-10
          translate-x-[-12px]
          transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]
          group-hover:translate-x-[12px]
        "
      >
        {label}
      </span>

      {/* EXPANDING CIRCLE */}
      <span
        className="
          absolute top-1/2 left-1/2
          h-5 w-5
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-brand
          opacity-0
          transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]
          group-hover:h-[220px]
          group-hover:w-[220px]
          group-hover:opacity-100
        "
      />

      {/* RIGHT ICON (exits) */}
      <span
        className="
          absolute right-4 z-10
          transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]
          group-hover:right-[-25%]
        "
      >
        {Icon && <Icon className="size-5" />}
      </span>
    </a>
  );
}
