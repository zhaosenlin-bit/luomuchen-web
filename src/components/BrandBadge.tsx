import { useEffect, useState } from "react";
import gsap from "gsap";

export default function BrandBadge() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 28,
        left: 24,
        zIndex: 90,
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontFamily: '"Manrope", sans-serif',
        color: "#fff",
        opacity: scrolled ? 0.85 : 1,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
      }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 100 100"
        fill="white"
        style={{ flexShrink: 0 }}
      >
        <path d="m50,50c0,18.2,14.77,32.98,32.97,32.98,0-18.2-14.77-32.98-32.97-32.98Z" />
        <path d="m17.02,82.98c18.2,0,32.98-14.77,32.98-32.98-18.2,0-32.98,14.77-32.98,32.98Z" />
        <path d="m82.98,17.02c-18.2,0-32.97,14.77-32.97,32.97,18.2,0,32.97-14.77,32.97-32.97Z" />
        <path d="m17.02,17.02c0,18.2,14.77,32.97,32.98,32.97,0-18.2-14.77-32.97-32.98-32.97Z" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.04em" }}>
          骆沐辰
        </span>
        <span style={{ fontSize: 10, opacity: 0.55, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          AI 编程小创客
        </span>
      </div>
    </div>
  );
}