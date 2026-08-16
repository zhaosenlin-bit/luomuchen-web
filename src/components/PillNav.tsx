import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

interface NavItem {
  label: string;
  onClick?: () => void;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "首页",
    onClick: () => gsap.to(window, { duration: 3, scrollTo: 0, ease: "power3.inOut" }),
  },
  {
    label: "关于",
    onClick: () => gsap.to(window, { duration: 3, scrollTo: document.body.scrollHeight, ease: "power3.inOut" }),
  },
  { label: "作品" },
  {
    label: "相册",
    onClick: () => gsap.to(window, { duration: 2.5, scrollTo: "#photos", ease: "power3.inOut" }),
  },
  { label: "联系" },
];

function Pill({ label, onClick }: NavItem) {
  const pillRef = useRef<HTMLButtonElement | null>(null);
  const circleRef = useRef<HTMLSpanElement | null>(null);
  const labelStackRef = useRef<HTMLSpanElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const layout = () => {
    const pill = pillRef.current;
    const circle = circleRef.current;
    if (!pill || !circle) return;
    const rect = pill.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const R = (w * w / 4 + h * h) / (2 * h);
    const D = 2 * R + 2;
    const delta = R - Math.sqrt(R * R - (w * w) / 4) + 1;
    circle.style.width = `${D}px`;
    circle.style.height = `${D}px`;
    circle.style.left = `${w / 2 - D / 2}px`;
    circle.style.bottom = `-${delta}px`;
    circle.style.transformOrigin = `50% ${D - delta}px`;
  };

  useEffect(() => {
    layout();
    window.addEventListener("resize", layout);
    return () => window.removeEventListener("resize", layout);
  }, []);

  const onEnter = () => {
    const circle = circleRef.current;
    const labelStack = labelStackRef.current;
    if (!circle || !labelStack) return;
    if (tlRef.current) tlRef.current.kill();
    const tl = gsap.timeline();
    tl.to(circle, { scale: 3, duration: 0.3, ease: "power2.out" }, 0);
    tl.to(labelStack.querySelector(".pill-label"), { y: "-100%", duration: 0.3, ease: "power2.out" }, 0);
    tl.to(labelStack.querySelector(".pill-label-hover"), { y: "-100%", duration: 0.3, ease: "power2.out" }, 0);
    tlRef.current = tl;
  };
  const onLeave = () => {
    const circle = circleRef.current;
    const labelStack = labelStackRef.current;
    if (!circle || !labelStack) return;
    if (tlRef.current) tlRef.current.kill();
    const tl = gsap.timeline();
    tl.to(circle, { scale: 0, duration: 0.2, ease: "power2.out" }, 0);
    tl.to(labelStack.querySelector(".pill-label"), { y: "0%", duration: 0.2, ease: "power2.out" }, 0);
    tl.to(labelStack.querySelector(".pill-label-hover"), { y: "0%", duration: 0.2, ease: "power2.out" }, 0);
    tlRef.current = tl;
  };

  return (
    <li>
      <button
        ref={pillRef}
        type="button"
        className="pill"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={onClick}
      >
        <span ref={circleRef} className="hover-circle" />
        <span ref={labelStackRef} className="label-stack">
          <span className="pill-label">{label}</span>
          <span className="pill-label-hover">{label}</span>
        </span>
      </button>
    </li>
  );
}

export default function PillNav() {
  const logoRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLDivElement | null>(null);
  const logoSvgRef = useRef<SVGSVGElement | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.6, ease: "power2.out", delay: 0.1 }
      );
    }
    if (itemsRef.current) {
      gsap.fromTo(
        itemsRef.current,
        { width: 0 },
        { width: "auto", duration: 0.6, ease: "power2.out", delay: 0.2 }
      );
    }
  }, []);

  const rotateLogo = () => {
    if (!logoSvgRef.current) return;
    gsap.to(logoSvgRef.current, { rotation: 360, duration: 0.2, ease: "power2.out" });
  };
  const resetLogo = () => {
    if (!logoSvgRef.current) return;
    gsap.to(logoSvgRef.current, { rotation: 0, duration: 0.2, ease: "power2.out" });
  };

  return (
    <div className="pill-nav-container">
      <div className="pill-nav">
        <div
          ref={logoRef}
          className="pill-logo"
          onMouseEnter={rotateLogo}
          onMouseLeave={resetLogo}
        >
          <div className="logo-svg-container">
            <svg
              ref={logoSvgRef}
              width="24"
              height="24"
              viewBox="0 0 100 100"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m50,50c0,18.2,14.77,32.98,32.97,32.98,0-18.2-14.77-32.98-32.97-32.98Z" />
              <path d="m17.02,82.98c18.2,0,32.98-14.77,32.98-32.98-18.2,0-32.98,14.77-32.98,32.98Z" />
              <path d="m82.98,17.02c-18.2,0-32.97,14.77-32.97,32.97,18.2,0,32.97-14.77,32.97-32.97Z" />
              <path d="m17.02,17.02c0,18.2,14.77,32.97,32.98,32.97,0-18.2-14.77-32.97-32.98-32.97Z" />
            </svg>
          </div>
        </div>

        {/* Desktop nav items */}
        <div ref={itemsRef} className="pill-nav-items desktop-only overflow-hidden">
          <ul className="pill-list">
            {NAV_ITEMS.map((item) => (
              <Pill key={item.label} label={item.label} onClick={item.onClick} />
            ))}
          </ul>
        </div>

        {/* Mobile hamburger */}
        <div className="mobile-only pill-nav-items" style={{ position: "relative" }}>
          <button
            type="button"
            className="mobile-menu-button"
            aria-label="menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span
              className="hamburger-line"
              style={{
                transform: mobileOpen ? "translateY(3px) rotate(45deg)" : "none",
                transition: "transform 0.2s ease",
              }}
            />
            <span
              className="hamburger-line"
              style={{
                transform: mobileOpen ? "translateY(-3px) rotate(-45deg)" : "none",
                transition: "transform 0.2s ease",
              }}
            />
          </button>
          {mobileOpen && (
            <div className="mobile-menu-popover" style={{ visibility: "visible" }}>
              <ul className="mobile-menu-list">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <a
                      href="#"
                      className="mobile-menu-link"
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileOpen(false);
                        item.onClick?.();
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}