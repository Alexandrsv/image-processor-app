## 🇬🇧 **Image Processor App**

A **plugin-style image playground** built with **Vite + React + Tailwind** that runs **100 % in the browser**. Ship it to GitHub Pages (ready-made CI included) so anyone can drag-and-drop images, test effects, and download results—no local installs, no server, no CORS.

| Feature                 | What it gives you                                        |
|-------------------------|----------------------------------------------------------|
| **Сlient-side**         | Works in your browser                                    |
| **Module registry**     | Each effect lives in its own folder and auto-registers.  |
| **Dark / Light theme**  | `next-themes` toggle + Tailwind `dark:` utilities.       |

🔗 **Live playground:** <https://alexandrsv.github.io/image-processor-app/>

---

### ✨ Built-in module — **Squircle Mask**

Need iOS-style, smooth rounded-rectangle avatars, stickers or UI previews? Open the Squircle playground:

<https://alexandrsv.github.io/image-processor-app/squircle>

#### What’s a squircle 🤔
A **squircle** (“square + circle”) blends straight edges into curves with Bézier math, avoiding the abrupt switch of plain CSS `border-radius`. Popularised by Apple’s iOS icons, squircles feel softer and **reduce visual aliasing** at small sizes.

#### Why use it?
* **Looks better than hard `border-radius`**—no “flat” edge before the curve.
* **No jagged edges**—Bézier smoothing yields crisp anti-aliased corners, even on retina.
* **Zero extra markup**—canvas mask only; forget nested `<div>`s or SVG clips.
* **Any image & resolution**—photos, transparent PNGs, UI mock-ups… it just works.
* **Instant download**—one click saves a PNG with alpha transparency.

#### Key features
* **Preserves original resolution & aspect ratio**—your 4 K photo stays 4 K.
* **Corner radius in px *or* %** (`0.25` = 25 % of the shorter side).
* **Adjustable smoothing**—from ultra-sharp to super-round vibes.
* **PNG export with transparency**—ready for avatars, Telegram/Discord stickers, marketing shots, etc.

<details>
<summary>Module layout</summary>

```
src/modules/squircle/
├── SquircleView.tsx   # React UI: upload → tweak radius/smoothing → save PNG
├── config.ts          # Metadata for auto-registry
└── (math)             # Bézier helpers in src/lib/canvasUtils.ts
```
</details>

---

## 🚀 Quick start

```bash
git clone https://github.com/<you>/image-processor-app.git
cd image-processor-app

bun install      # or npm ci / bun i
bun run dev      # → http://localhost:5173
```

Production build & local preview:

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
│   ├── modules/           # <— Drop your image-processing modules here
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
4. Restart the dev server—the module auto-appears in the sidebar & routing.

```ts
// src/modules/myfilter/config.ts
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

* **Product demos**—share a live URL instead of screenshots.
* **Hackathons / R&D**—prototype multiple effects in one repo.
* **Teaching**—each folder is a self-contained Canvas/WebGL example.
* **Design tokens**—preview radii, palettes on real images.
* **Vibe coding**—just for fun in the browser.

---
