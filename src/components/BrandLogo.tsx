type BrandLogoProps = {
  variant?: "light" | "dark";
  className?: string;
  priority?: boolean;
  /** Visual height in px (width auto) */
  height?: number;
};

const SRC = {
  light: "/images/brand/jonacart-logo.png",
  dark: "/images/brand/jonacart-logo-on-dark.png",
} as const;

export default function BrandLogo({
  variant = "light",
  className = "",
  priority = false,
  height = 48,
}: BrandLogoProps) {
  const width = Math.round(height * (462 / 706));

  return (
    // eslint-disable-next-line @next/next/no-img-element -- static brand asset, avoid next/image config
    <img
      src={SRC[variant]}
      alt="jonacart"
      width={width}
      height={height}
      className={`brand-logo ${className}`.trim()}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
    />
  );
}
