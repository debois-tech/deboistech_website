/**
 * Renders a Heroicons outline glyph from its raw path data.
 *
 * The vanilla widgets injected these as HTML strings; passing the path
 * data as props keeps the same icon set without dangerouslySetInnerHTML.
 * Accepts an array for multi-path glyphs (e.g. the DevOps gear).
 */
export function Icon({
  d,
  className = "h-6 w-6",
  strokeWidth = 1.5,
}: {
  d: string | string[];
  className?: string;
  strokeWidth?: number;
}) {
  const paths = Array.isArray(d) ? d : [d];

  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      aria-hidden="true"
    >
      {paths.map((path) => (
        <path
          key={path}
          strokeLinecap="round"
          strokeLinejoin="round"
          d={path}
        />
      ))}
    </svg>
  );
}
