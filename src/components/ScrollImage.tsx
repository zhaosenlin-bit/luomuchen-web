import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollImageProps {
  className?: string;
}

export default function ScrollImage({ className = "" }: ScrollImageProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const starsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const stars = starsRef.current;
    if (!wrapper || !stars) return;

    // 滚动驱动的轻微放大
    const zoom = gsap.fromTo(
      wrapper,
      { scale: 1 },
      {
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      }
    );

    // 鼠标视差（只移动星层，渐变保持不动）
    const onMouseMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const moveX = (e.clientX - cx) / (rect.width / 2);
      const moveY = (e.clientY - cy) / (rect.height / 2);
      gsap.to(stars, {
        x: moveX * -40,
        y: moveY * -40,
        duration: 1.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      zoom.scrollTrigger?.kill();
      zoom.kill();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`fixed top-0 left-0 w-full h-full z-0 will-change-transform ${className}`}
    >
      {/* 底层径向渐变：深紫 → 深蓝 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #5B2B8C 0%, #2A1670 30%, #0F1450 65%, #06081F 100%)",
        }}
      />
      {/* 顶部紫色光晕 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 70% 20%, rgba(139, 92, 246, 0.35) 0%, transparent 45%)",
        }}
      />
      {/* 底部蓝色光晕 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 90%, rgba(59, 130, 246, 0.25) 0%, transparent 50%)",
        }}
      />
      {/* 星点层（视差目标） */}
      <div
        ref={starsRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 15% 25%, rgba(255,255,255,0.7), transparent)," +
            "radial-gradient(1px 1px at 65% 15%, rgba(200,210,255,0.6), transparent)," +
            "radial-gradient(1.5px 1.5px at 85% 45%, rgba(255,255,255,0.5), transparent)," +
            "radial-gradient(1px 1px at 35% 70%, rgba(220,200,255,0.7), transparent)," +
            "radial-gradient(1px 1px at 50% 90%, rgba(255,255,255,0.5), transparent)," +
            "radial-gradient(2px 2px at 10% 50%, rgba(180,160,255,0.6), transparent)," +
            "radial-gradient(1px 1px at 90% 80%, rgba(255,255,255,0.5), transparent)," +
            "radial-gradient(1.5px 1.5px at 25% 40%, rgba(200,220,255,0.6), transparent)",
          backgroundRepeat: "repeat",
          backgroundSize: "500px 500px",
        }}
      />
      {/* 顶部暗角 */}
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 100%)",
        }}
      />
      {/* 底部暗角 */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.55) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}