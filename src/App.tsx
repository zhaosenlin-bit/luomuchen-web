import ScrollImage from "./components/ScrollImage";
import ScrollFloat from "./components/ScrollFloat";
import GlassPanel from "./components/GlassPanel";
import PillNav from "./components/PillNav";
import BrandBadge from "./components/BrandBadge";
import ScrollHint from "./components/ScrollHint";
import HeroSubtitle from "./components/HeroSubtitle";
import SkillsPanel from "./components/SkillsPanel";
import WorksPreview from "./components/WorksPreview";
import PhotoGallery from "./components/PhotoGallery";

export default function App() {
  return (
    <>
      <ScrollImage />
      <BrandBadge />
      <PillNav />
      <ScrollHint />
      <div style={{ position: "relative", height: "800vh" }}>
        <HeroSubtitle text="AI 编程 · 宇宙探索 · 机器人 · 2025 宜昌冠军" />
        <SkillsPanel />
        <WorksPreview />
        <ScrollFloat>{`大家好\n我叫骆沐辰`}</ScrollFloat>
        <GlassPanel />
      </div>
      <PhotoGallery />
    </>
  );
}