# luomuchen-web — 骆沐辰 · 个人站（2D 滚动版）

骆沐辰的个人站 2D 滚动版本。基于 React 19 + Vite + Tailwind v4 + GSAP 的滚动驱动 hero 页面。

## 技术栈

- **前端**：React 19 + Vite 6 + TypeScript
- **样式**：Tailwind CSS v4（`@tailwindcss/vite`）
- **动画**：GSAP + ScrollTrigger + ScrollToPlugin
- **路由**：`react-router-dom`（`BrowserRouter`）
- **字体**：Dirtyline 36 Days of Type 2022（自托管 woff2）+ Manrope + Instrument Serif（Google Fonts）

## 页面结构（5 段滚动）

```
滚动 0   ─────── 500vh 容器 ───────  5000
│                                       │
│ 0 ─ 300        Hero 大字漂浮          │
│ 300 ─ 1500     副标题 (淡入/淡出)     │
│ 1500 ─ 3000    我会什么 (技能卡)      │
│ 3000 ─ 4500    我做过的 (作品卡)      │
│ 4500 ─ 5000    关于我 (玻璃面板)      │
```

每段都是独立组件，`position: fixed` + GSAP scrub 控制淡入 / 保持 / 淡出。

## 本地开发

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # 输出到 dist/
npm run preview      # 预览构建产物
```

## 内容来源

全部内容来自骆沐辰的 AI 学习知识库：`D:\my lon\my-ai-learning`

## 隐私红线

按知识库 AGENTS.md 规则：

- 不写真实手机号、家庭住址、身份证号、学校全名 / 班级
- 不编造经历（作品 / 比赛 / 成绩）
- 比赛只写「2025 宜昌机器人锦标赛冠军」，赛项细节待用户确认