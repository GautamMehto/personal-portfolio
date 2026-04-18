import { Link } from "react-router-dom";

export default function HoverButton({
  label,
  icon: Icon,
  path,
  className,
  onClick,
  type = "button",
  disabled,
}) {
  const commonClasses = `
    group relative isolate flex items-center justify-center gap-2 w-fit px-6 py-3
    font-semibold
    rounded-full border border-brand
    bg-brand
    overflow-hidden
    transition-colors duration-300
    hover:text-brand
    hover:border-text-primary
    before:absolute before:inset-y-0 before:left-[-100%]
    before:w-full before:aspect-square
    before:rounded-full before:bg-dark-bg
    before:transition-all before:duration-700
    hover:before:left-0 hover:before:scale-150
    before:-z-10
    disabled:opacity-50 disabled:cursor-not-allowed
    ${className}
  `;

  const content = (
    <>
      {/* Label */}
      <span className="relative z-10">{label}</span>

      {/* Icon */}
      <span
        className="
          relative z-10
          flex items-center justify-center 
          rounded-full
          group-hover:rotate-45
          transition-all duration-300 ease-linear
          group-hover:rotate-0
          group-hover:bg-(--the-white)
        "
      >
        {Icon && <Icon className="size-5" />}
      </span>
    </>
  );

  if (path) {
    return (
      <Link to={path} className={commonClasses} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={commonClasses}>
      {content}
    </button>
  );
}
