import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ITEMS = [
  "网站开发", "3D 场景", "游戏设计", "项目发布", "AI 编程协作", "动效设计", "动画制作", "作品讲解", "团队协作", "比赛经验",
];

export default function GlassPanel() {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    const vh = window.innerHeight;
    const tween = gsap.fromTo(
      wrapper,
      { y: "100%" },
      {
        y: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: () => "+=" + vh * 6.5,
          end: () => "+=" + vh * 7.5,
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    const moveX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const moveY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    gsap.to(panel, {
      x: moveX * 20,
      y: moveY * 20,
      rotationY: moveX * 4,
      rotationX: -moveY * 4,
      duration: 1,
      ease: "power3.out",
    });
  };
  const handleMouseLeave = () => {
    const panel = panelRef.current;
    if (!panel) return;
    gsap.to(panel, {
      x: 0, y: 0, rotationY: 0, rotationX: 0,
      duration: 1, ease: "power3.out",
    });
  };

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 left-0 w-full h-screen"
      style={{ pointerEvents: "none" }}
    >
      <div
        ref={wrapperRef}
        className="w-full max-w-[1250px] mx-auto h-[900px] max-h-[85vh]"
        style={{ perspective: "1000px", pointerEvents: "auto" }}
      >
        <div
          ref={panelRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-full flex flex-col justify-between rounded-3xl relative overflow-hidden"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.16)",
            backdropFilter: "blur(160px)",
            WebkitBackdropFilter: "blur(160px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <div className="flex flex-col items-center justify-center px-6 md:px-12 text-center flex-1 pt-12">
            <p
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontStyle: "italic",
                color: "rgba(255,255,255,0.7)",
                fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)",
                marginBottom: 24,
              }}
            >
              关于我
            </p>
            <h2
              style={{
                fontFamily: '"Instrument Serif", serif',
                color: "#fff",
                fontSize: "clamp(1.6rem, 4.2vw, 4.2rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                maxWidth: 1000,
                margin: 0,
              }}
            >
              我是<span style={{ fontStyle: "italic" }}>骆沐辰</span>，一个马上 5 年级的
              <span style={{ fontStyle: "italic" }}>小创客</span>。
              我用 AI 编程做作品，喜欢<span style={{ fontStyle: "italic" }}>宇宙</span>、
              <span style={{ fontStyle: "italic" }}>机器人</span>和 3D 闯关游戏。
              我做过《宇宙探索者》，拿过 2025 宜昌机器人锦标赛
              <span style={{ fontStyle: "italic" }}>冠军</span>，还在参加电教馆信息素养提升活动。
              我想持续学 Vibe Coding，参加更多比赛，做出对学习和生活有帮助的应用。
            </h2>
          </div>

          <div className="border-t border-white/10 py-6 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-12 px-6 shrink-0">
                  {MARQUEE_ITEMS.map((name) => (
                    <span
                      key={`${i}-${name}`}
                      className="font-sans font-semibold text-sm tracking-widest uppercase text-white opacity-40 hover:opacity-100 transition-opacity duration-300"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}