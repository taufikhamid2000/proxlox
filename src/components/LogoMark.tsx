export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <circle cx="16" cy="16" r="15" className="fill-primary" />
      <path
        d="M11 9h5.5a7 7 0 0 1 0 14H11a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1Zm2 2.6v10.8h3.5a5.4 5.4 0 0 0 0-10.8H13Z"
        fill="#ffffff"
      />
    </svg>
  );
}
