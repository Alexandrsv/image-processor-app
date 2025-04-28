# 🖼️ Image Processor App 
image-processor-app Vite + React + Tailwind

A **plugin-style image playground** that runs 100 % in the browser.  
Ship it to GitHub Pages (workflow included) and let anyone test image-processing ideas without local installs.

[https://alexandrsv.github.io/image-processor-app/
](https://alexandrsv.github.io/image-processor-app/)


| Feature | What it gives you |
|---------|------------------|
| **Pure client-side** | Drag-and-drop images, zero server / CORS pain. |
| **Module registry** | Each effect lives in its own folder and auto-registers. |
| **Dark / Light theme** | `next-themes` toggle + Tailwind `dark:` utilities. |
| **Bun-first toolchain** | Blazing-fast install/build, still npm-compatible. |
| **1-Click deploy** | GitHub Actions → GitHub Pages. |

---

## ✨ Built-in module — **Squircle mask**

> **Need rounded-rectangle avatars, stickers or UI previews? Start here.**

| Demo | Link |
|------|------|
| Squircle Playground | **<https://alexandrsv.github.io/image-processor-app/squircle>** |

### What’s a squircle 🤔?

A **squircle** (“square + circle”) is a smooth rounded-rectangle whose
corner curvature gradually changes instead of the abrupt switch you get with
plain `border-radius`. Popularised by Apple’s iOS app icons, squircles feel
softer, more organic and **reduce visual aliasing** at small sizes.

**Why use it?**

* **Looks better than hard `border-radius`** — no “flat” edge before the curve.
* **No jagged edges** — the Bézier curve produces crisp antialiased corners,
  especially on high-DPI screens.
* **Zero extra markup** — it’s a canvas mask, not nested divs/SVG clips.
* **Any image & resolution** — photographs, UI mock-ups, transparent PNGs…
* **Instant download** — one click to save the processed PNG (with alpha).

### Key features

* **Preserves original resolution & aspect ratio** — your 4 K photo will stay 4 K.  
* **Corner radius in px *or* %** (`0.25` = 25 % of the shorter side).  
* **Adjustable smoothing** for ultra-sharp or ultra-round vibes.  
* **PNG export with transparency** — ready for avatars, Telegram/Discord
  stickers, marketing shots, etc.

<details>
<summary>Module layout</summary>

```
src/modules/squircle/
├── SquircleView.tsx   # React UI: upload → tweak radius/smoothing → save PNG
├── config.ts          # Metadata for auto-registry
└── (math)             # Squircle Bézier math lives in src/lib/canvasUtils.ts
```
</details>

---

## 🚀 Quick start

```bash
git clone https://github.com/<you>/image-processor-app.git
cd image-processor-app

bun install      # or npm ci / bun i
bun run dev      # -> http://localhost:5173
```

Production build & preview:

```bash
bun run build
bun run preview
```

Push to **main** → GitHub Pages auto-deploys (see `.github/workflows/deploy.yml`).

---

## 📦 Repository layout

```
.
├── src/
│   ├── modules/           # <── Drop your image-processing modules here
│   │   └── squircle/      # Example “smooth rounded rectangle” mask
│   ├── components/        # Shared UI (Layout, ThemeToggle, shadcn/ui wrappers)
│   ├── lib/               # Canvas & helper utilities
│   └── App.tsx            # Router + ThemeProvider
├── public/                # Static assets
├── tailwind.config.ts     # Tailwind “darkMode: class”
├── vite.config.ts         # BASE_PATH injection for GitHub Pages
└── ...
```

---

## ➕ Write your own module

1. **Scaffold** `src/modules/<id>/` with `View.tsx` and `config.ts`.
2. `config.ts` exports `{ id, title, path, component, icon }`.
3. Build UI in `View.tsx`, import shared buttons/toasts.
4. Restart dev server — the module auto-appears in sidebar & routing.

Example `config.ts`:

```ts
import { MyFilterView } from "./MyFilterView";
import { ImageIcon } from "lucide-react";

export default {
  id: "myfilter",
  title: "My cool filter",
  path: "/myfilter",
  component: MyFilterView,
  icon: ImageIcon,
};
```

---

## 🙋‍♂️ Why use this repo?

* **Product demos** — share a static URL instead of screenshots.
* **Hackathons / R&D** — prototype multiple effects in one repo.
* **Teaching** — each folder is a self-contained Canvas/WebGL example.
* **Design tokens** — preview radii, palettes on real images.
* **Vibe coding**

---

Enjoy & contribute!
