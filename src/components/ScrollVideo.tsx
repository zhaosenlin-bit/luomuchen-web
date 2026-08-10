import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollVideoProps {
  src: string;
  className?: string;
}

export default function ScrollVideo({ src, className = "" }: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    let currentTarget = 0;
    let seekPending = false;

    const doSeek = () => {
      if (!video) return;
      if (video.seeking) {
        seekPending = true;
        return;
      }
      seekPending = false;
      try {
        video.currentTime = currentTarget;
      } catch {
        // ignore seek errors mid-load
      }
    };

    if (Hls.isSupported()) {
      hls = new Hls({
        maxBufferLength: 120,
        maxMaxBufferLength: 600,
        maxBufferSize: 200 * 1024 * 1024,
        startPosition: 0,
        capLevelToPlayerSize: false,
        startLevel: -1,
        autoStartLoad: true,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (hls) {
          const maxLevel = hls.levels.length - 1;
          hls.currentLevel = maxLevel;
          hls.startLevel = maxLevel;
        }
      });
      hls.on(Hls.Events.FRAG_BUFFERED, () => {
        const d = video.duration || 1;
        const bufferedEnd =
          video.buffered.length > 0 ? video.buffered.end(video.buffered.length - 1) : 0;
        setProgress(Math.min(100, Math.round((bufferedEnd / d) * 100)));
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }

    const onCanPlay = () => setCanPlay(true);
    const onSeeked = () => {
      if (seekPending) doSeek();
    };
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("seeked", onSeeked);

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const t = self.progress * (video.duration || 0);
        currentTarget = t;
        doSeek();
      },
    });

    const wrapper = wrapperRef.current;
    let onMouseMove: ((e: MouseEvent) => void) | null = null;
    if (wrapper) {
      onMouseMove = (e: MouseEvent) => {
        const rect = wrapper.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const moveX = (e.clientX - cx) / (rect.width / 2);
        const moveY = (e.clientY - cy) / (rect.height / 2);
        gsap.to(wrapper, {
          x: moveX * -30,
          y: moveY * -30,
          duration: 1.5,
          ease: "power2.out",
        });
      };
      window.addEventListener("mousemove", onMouseMove);
    }

    return () => {
      if (onMouseMove) window.removeEventListener("mousemove", onMouseMove);
      trigger.kill();
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("seeked", onSeeked);
      if (hls) hls.destroy();
    };
  }, [src]);

  return (
    <>
      {/* Starfield fallback (visible behind/under the video so the page is never pure black) */}
      <div className="starfield" aria-hidden="true">
        <div className="stars stars-1" />
        <div className="stars stars-2" />
        <div className="stars stars-3" />
      </div>

      <div
        ref={wrapperRef}
        className={`fixed top-0 left-0 w-full h-full z-0 scale-[1.05] origin-center ${className}`}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover scale-[1.35]"
          muted
          playsInline
          crossOrigin="anonymous"
        />
      </div>

      {!canPlay && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black gap-6">
          <svg width="48" height="48" viewBox="0 0 100 100" fill="white">
            <path d="m50,50c0,18.2,14.77,32.98,32.97,32.98,0-18.2-14.77-32.98-32.97-32.98Z" />
            <path d="m17.02,82.98c18.2,0,32.98-14.77,32.98-32.98-18.2,0-32.98,14.77-32.98,32.98Z" />
            <path d="m82.98,17.02c-18.2,0-32.97,14.77-32.97,32.97,18.2,0,32.97-14.77,32.97-32.97Z" />
            <path d="m17.02,17.02c0,18.2,14.77,32.97,32.98,32.97,0-18.2-14.77-32.97-32.98-32.97Z" />
          </svg>
          <p
            className="text-white font-sans"
            style={{ fontSize: 14, letterSpacing: "0.3em", textTransform: "uppercase" }}
          >
            正在进入骆沐辰的个人站
          </p>
          <div
            style={{
              width: 220,
              height: 2,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "linear-gradient(90deg, #5B8CFF, #9AB8FF)",
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: "0.2em" }}>
            {progress}%
          </p>
        </div>
      )}
    </>
  );
}