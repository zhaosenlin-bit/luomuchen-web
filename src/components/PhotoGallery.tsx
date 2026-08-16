import { useEffect, useState } from "react";

const PHOTO_COUNT = 49;

const photoSrc = (i: number) => `photos/photo-${String(i).padStart(2, "0")}.jpg`;

export default function PhotoGallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = active !== null ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  const photos = Array.from({ length: PHOTO_COUNT }, (_, i) => i + 1);

  return (
    <section
      id="photos"
      style={{
        position: "relative",
        zIndex: 5,
        minHeight: "100vh",
        padding: "14vh 6vw 12vh",
        fontFamily: '"Manrope", sans-serif',
        color: "#fff",
      }}
    >
      <p
        style={{
          fontFamily: '"Instrument Serif", serif',
          fontStyle: "italic",
          fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)",
          opacity: 0.7,
          marginBottom: 16,
        }}
      >
        我的照片
      </p>
      <h2
        style={{
          fontSize: "clamp(2rem, 5vw, 4rem)",
          fontWeight: 700,
          lineHeight: 1.05,
          margin: "0 0 12px",
          maxWidth: "18ch",
        }}
      >
        生活里的 <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "italic" }}>我</span>
      </h2>
      <p style={{ margin: "0 0 40px", fontSize: "0.95rem", opacity: 0.65 }}>
        点击照片可以看大图
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: 12,
        }}
      >
        {photos.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setActive(n)}
            style={{
              padding: 0,
              border: "none",
              borderRadius: 14,
              overflow: "hidden",
              aspectRatio: "1 / 1",
              cursor: "zoom-in",
              background: "rgba(255,255,255,0.06)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <img
              src={photoSrc(n)}
              alt={`照片 ${n}`}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          onClick={() => setActive(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
            padding: "4vh 4vw",
          }}
        >
          <img
            src={photoSrc(active)}
            alt={`照片 ${active}`}
            style={{
              maxWidth: "92vw",
              maxHeight: "88vh",
              objectFit: "contain",
              borderRadius: 12,
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            }}
          />
        </div>
      )}
    </section>
  );
}