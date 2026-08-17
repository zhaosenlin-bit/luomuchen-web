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

    const vh = window.innerHeight;
    // 默认隐藏,离开滚动范围立即消失,避免和技能面板重叠
    el.style.visibility = "hidden";
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: () => "+=" + vh * 0.8,
        end: () => "+=" + vh * 2.4,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(
      el,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }
    )
      .to(el, { opacity: 1, duration: 0.65 }, 0.15)
      .to(el, { opacity: 0, y: -20, duration: 0.2, ease: "power2.in" }, 0.8);

    // 非 scrub 触发器:进入面板范围立即可见,离开立即隐藏(无延迟)
    const showTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: () => "+=" + vh * 0.8,
      end: () => "+=" + vh * 0.8001,
      onEnter: () => { el.style.visibility = "visible"; },
      onLeaveBack: () => { el.style.visibility = "hidden"; },
    });
    const hideTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: () => "+=" + vh * 2.4,
      onEnter: () => { el.style.visibility = "hidden"; },
      onLeaveBack: () => { el.style.visibility = "visible"; },
    });
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      showTrigger.kill();
      hideTrigger.kill();
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
      <a
        href="http://127.0.0.1:8123/index.html"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          marginTop: 26,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.1em",
          padding: "11px 24px",
          borderRadius: 999,
          background: "rgba(91,140,255,0.2)",
          border: "1px solid rgba(91,140,255,0.5)",
          color: "#fff",
          textDecoration: "none",
          pointerEvents: "auto",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          transition: "background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(91,140,255,0.4)";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 10px 30px rgba(91,140,255,0.35)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(91,140,255,0.2)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        进入我的项目 →
      </a>
    </div>
  );
}