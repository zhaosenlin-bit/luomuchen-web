import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: string;
}

export default function ScrollFloat({ children }: ScrollFloatProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const chars = containerRef.current?.querySelectorAll<HTMLElement>(".char");
    if (!chars || chars.length === 0) return;

    const tween = gsap.fromTo(
      chars,
      { opacity: 1, yPercent: 0, scaleY: 1, scaleX: 1, transformOrigin: "50% 0%" },
      {
        opacity: 0,
        yPercent: 250,
        scaleY: 1.2,
        scaleX: 0.9,
        ease: "power2.inOut",
        duration: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=1000",
          scrub: 1.5,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const lines = children.split("\n");

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-10 flex flex-col justify-end p-4 md:p-8 pointer-events-none"
    >
      <h1
        className="scroll-float-text font-dirtyline text-white leading-[0.85] tracking-normal"
        style={{ fontSize: "clamp(4rem, 15vw, 317px)" }}
      >
        {lines.map((line, lineIdx) => (
          <span key={lineIdx} style={{ display: "block" }}>
            {line.split(" ").map((word, wordIdx, words) => (
              <span key={`${lineIdx}-${wordIdx}`} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                {Array.from(word).map((ch, chIdx) => (
                  <span key={`${lineIdx}-${wordIdx}-${chIdx}`} className="char">
                    {ch}
                  </span>
                ))}
                {wordIdx < words.length - 1 ? (
                  <>
                    <span className="char">&nbsp;</span>
                  </>
                ) : null}
              </span>
            ))}
          </span>
        ))}
      </h1>
    </div>
  );
}