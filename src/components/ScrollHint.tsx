import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollHint() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tween = gsap.fromTo(
      el,
      { opacity: 1, y: 0 },
      {
        opacity: 0,
        y: 20,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "+=400",
          scrub: true,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        bottom: 32,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 60,
        color: "#fff",
        fontFamily: '"Manrope", sans-serif',
        fontSize: 12,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        opacity: 0.75,
        pointerEvents: "none",
      }}
    >
      <span>向下滚动</span>
      <span
        style={{
          width: 1,
          height: 28,
          background: "linear-gradient(180deg, #fff 0%, transparent 100%)",
        }}
      />
    </div>
  );
}