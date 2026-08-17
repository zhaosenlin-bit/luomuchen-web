import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  status: string;
  description: string;
  statusColor: string;
}

const SKILLS: Skill[] = [
  {
    name: "AI 编程",
    status: "学习中",
    description: "用自然语言和 AI 协作做网站、游戏、修 bug",
    statusColor: "#5B8CFF",
  },
  {
    name: "网站开发",
    status: "学习中",
    description: "React + Vite + TypeScript，做过多页面项目",
    statusColor: "#5B8CFF",
  },
  {
    name: "3D 场景",
    status: "已发布",
    description: "Three.js 做过太阳系、飞船躲避陨石、星球交互",
    statusColor: "#7CFFB2",
  },
  {
    name: "游戏设计",
    status: "已发布",
    description: "5 阶段闯关游戏：收集 → 建造 → 对接 → 躲避 → 返回",
    statusColor: "#7CFFB2",
  },
  {
    name: "项目发布",
    status: "已发布",
    description: "Cloudflare Pages 上线，移动端也能顺畅打开",
    statusColor: "#7CFFB2",
  },
  {
    name: "比赛与讲解",
    status: "已获奖",
    description: "2025 宜昌机器人锦标赛冠军，能上台讲项目",
    statusColor: "#FFCB6B",
  },
];

// 滚动范围：1500 → 3000（共 1500px）
//   0%   - 20%  (1500 - 1800)   淡入
//   20%  - 80%  (1800 - 2700)   保持
//   80%  - 100% (2700 - 3000)   淡出
export default function SkillsPanel() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const vh = window.innerHeight;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: () => "+=" + vh * 2.4,
        end: () => "+=" + vh * 4.4,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
    tl.fromTo(
      el,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }
    )
      .to(el, { opacity: 1, duration: 0.65 }, 0.15)
      .to(el, { opacity: 0, y: -40, duration: 0.2, ease: "power2.in" }, 0.8);
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
        inset: 0,
        zIndex: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 6vw",
        pointerEvents: "none",
        fontFamily: '"Manrope", sans-serif',
        color: "#fff",
        opacity: 0,
      }}
    >
      <p
        style={{
          fontFamily: '"Instrument Serif", serif',
          fontStyle: "italic",
          fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)",
          opacity: 0.7,
          marginBottom: 24,
        }}
      >
        我会什么
      </p>
      <h2
        style={{
          fontSize: "clamp(2rem, 5vw, 4.5rem)",
          fontWeight: 700,
          lineHeight: 1.05,
          margin: 0,
          marginBottom: 36,
          maxWidth: "16ch",
        }}
      >
        从 <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "italic" }}>想法</span> 到 <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "italic" }}>能玩</span>，
        我能独立做完整个流程。
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          maxWidth: 980,
          pointerEvents: "auto",
        }}
      >
        {SKILLS.map((s) => (
          <div
            key={s.name}
            style={{
              padding: "20px 22px",
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: "1.05rem", fontWeight: 600 }}>{s.name}</span>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "3px 8px",
                  borderRadius: 999,
                  background: `${s.statusColor}22`,
                  color: s.statusColor,
                  fontWeight: 600,
                }}
              >
                {s.status}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.7, lineHeight: 1.5 }}>
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}