import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Work {
  title: string;
  subtitle: string;
  description: string;
  status: string;
  tags: string[];
  link?: string;
  linkText?: string;
}

const WORKS: Work[] = [
  {
    title: "宇宙探索者",
    subtitle: "网站 · 5 阶段闯关游戏",
    description:
      "一个宇宙探索主题的网站 + 5 阶段闯关游戏。包含 3D 太阳系、行星档案、宇宙影像画廊和完整的游戏流程：收集材料 → 建造火箭 → 飞船对接 → 躲避陨石 → 返回地球。",
    status: "已发布上线",
    tags: ["React", "Vite", "TypeScript", "Three.js", "动效"],
    link: "https://zhaosenlin-bit.github.io/luomuchen-web/",
    linkText: "进入宇宙探索者 →",
  },
  {
    title: "电教馆信息素养提升活动",
    subtitle: "心理健康 × 科技",
    description:
      "参加心理健康与科技方向的展示项目。把科技用在让人更舒服的事情上——这是我一直在想的。",
    status: "进行中",
    tags: ["项目策划", "讲解", "调研"],
    link: "https://zhaosenlin-bit.github.io/luomuchen-web/",
    linkText: "进入项目 →",
  },
  {
    title: "世界机器人大赛项目",
    subtitle: "团队 · 2025 宜昌",
    description:
      "2025 宜昌锦标赛冠军作品。和队友一起搭建、编程、操控机器人，比到冠军。",
    status: "已获奖",
    tags: ["机器人", "团队", "比赛"],
  },
];

// 滚动范围：3000 → 4500（共 1500px）
//   0%   - 20%  (3000 - 3300)   淡入
//   20%  - 80%  (3300 - 4200)   保持
//   80%  - 100% (4200 - 4500)   淡出
export default function WorksPreview() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: "+=3000 top",
        end: "+=4500 top",
        scrub: 1,
      },
    });
    tl.fromTo(
      el,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }
    )
      .to(el, { opacity: 1, duration: 0.6 }, 0.2)
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
        我做过的
      </p>
      <h2
        style={{
          fontSize: "clamp(2rem, 5vw, 4.5rem)",
          fontWeight: 700,
          lineHeight: 1.05,
          margin: 0,
          marginBottom: 36,
          maxWidth: "18ch",
        }}
      >
        从 <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "italic" }}>想法</span> 到 <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "italic" }}>真的能玩</span>。
      </h2>
      <div
        style={{
          display: "grid",
          gap: 16,
          maxWidth: 980,
          pointerEvents: "auto",
        }}
      >
        {WORKS.map((w, idx) => (
          <article
            key={w.title}
            style={{
              display: "grid",
              gridTemplateColumns: "60px 1fr auto",
              alignItems: "start",
              gap: 22,
              padding: "22px 26px",
              borderRadius: 22,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontStyle: "italic",
                fontSize: "1.6rem",
                opacity: 0.5,
              }}
            >
              {String(idx + 1).padStart(2, "0")}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
                <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700 }}>{w.title}</h3>
                <span style={{ fontSize: 12, opacity: 0.5, letterSpacing: "0.08em" }}>
                  {w.subtitle}
                </span>
              </div>
              <p style={{ margin: "0 0 12px 0", fontSize: "0.92rem", opacity: 0.75, lineHeight: 1.55 }}>
                {w.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {w.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.05em",
                      padding: "4px 10px",
                      borderRadius: 999,
                      border: "1px solid rgba(255,255,255,0.18)",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              {w.link && (
                <a
                  href={w.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: 14,
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    padding: "8px 16px",
                    borderRadius: 999,
                    background: "rgba(91,140,255,0.18)",
                    border: "1px solid rgba(91,140,255,0.45)",
                    color: "#B9CCFF",
                    textDecoration: "none",
                    transition: "background 0.25s ease, transform 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(91,140,255,0.35)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(91,140,255,0.18)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {w.linkText || "进入项目 →"}
                </a>
              )}
            </div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.12em",
                padding: "5px 10px",
                borderRadius: 999,
                background: "rgba(91,140,255,0.15)",
                color: "#9AB8FF",
                fontWeight: 600,
                whiteSpace: "nowrap",
                alignSelf: "start",
              }}
            >
              {w.status}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}