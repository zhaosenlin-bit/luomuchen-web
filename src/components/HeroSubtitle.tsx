import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroSubtitleProps {
  text: string;
}

// 滚动范围：300 → 1500（共 1200px）
//   0%   - 20%  (300 - 540)   淡入
//   20%  - 80%  (540 - 1260)  保持
//   80%  - 100% (1260 - 1500) 淡出
export default function HeroSubtitle({ text }: HeroSubtitleProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: "+=300 top",
        end: "+=1500 top",
        scrub: 1,
      },
    });

    tl.fromTo(
      el,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }
    )
      .to(el, { opacity: 1, duration: 0.6 }, 0.2)
      .to(el, { opacity: 0, y: -20, duration: 0.2, ease: "power2.in" }, 0.8);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: "12vh",
        zIndex: 9,
        textAlign: "center",
        pointerEvents: "none",
        padding: "0 24px",
        fontFamily: '"Manrope", sans-serif',
        color: "#fff",
        opacity: 0,
      }}
    >
      <p
        style={{
          fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          fontWeight: 500,
          color: "rgba(255,255,255,0.85)",
          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  );
}