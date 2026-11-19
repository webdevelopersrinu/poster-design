<div align="center">

# 🎨 Poster Design

**Social media posters that look made by a human designer.**

A Claude Code plugin that designs promo graphics the way a working designer makes them for a real small business — bold flat brand colors, asymmetric photo-dominant layouts, shaped buttons, real contact details — instead of the AI-default look of purple gradients, glow, centered heroes, and emoji copy.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Claude Code Plugin](https://img.shields.io/badge/Claude%20Code-Plugin-blueviolet)](https://docs.claude.com/en/docs/claude-code)
[![Node](https://img.shields.io/badge/Node-%E2%89%A518-brightgreen)](https://nodejs.org)
[![Tests](https://img.shields.io/badge/tests-passing-success)](test/)

[Why](#-why-poster-design) · [Install](#-installation) · [Quick Start](#-quick-start) · [How It Works](#-how-it-works) · [Tooling](#-tooling) · [Layout Recipes](#-layout-recipes) · [Contributing](#-contributing)

</div>

---

## 🎯 Why Poster Design

Every AI-generated poster fails the same ways:

| # | AI tell | Poster Design rule |
|---|---------|--------------------|
| 1 | Purple-to-blue gradients, glow, glassmorphism | **One flat brand color + white + one accent.** Banned outright. |
| 2 | Everything centered and symmetric | Asymmetric layout — photo on one side (50–70%), color block on the other |
| 3 | Abstract shapes instead of real imagery | A real photo dominates and bleeds off at least one edge |
| 4 | Inter/system-ui everywhere, gradient text | Heavy condensed display headline + small clean body sans, 2–3 fonts max |
| 5 | Emoji icons (☎ 🌐 ✨) that render as tofu | Inline SVG icons, always |
| 6 | "Unlock ✨ Elevate your journey" copy | Shop-owner copy: *"Message us to order."* |
| 7 | Floating decoration behind text | Dot grids and stickers in corners/edges only — never behind text |
| 8 | No business identity | Logo tab, phone, website, address, checkmark lists, price badges, pill CTAs |

> **Self-check rule:** if the finished poster would stand out next to the reference designs for the wrong reason, it gets redone.

## 📦 Installation

```bash
# In a terminal — available in every project
claude plugin install poster-design --marketplace webdevelopersrinu/poster-design
```

On an older Claude Code without `--marketplace`:

```bash
claude plugin marketplace add webdevelopersrinu/poster-design
claude plugin install poster-design@webdevelopersrinu
```

<details>
<summary><b>Per-project install, team setup, and other agents</b></summary>

**Single project only** — run from the project root and add `--scope local`.

**Whole team** — add `--scope project`, commit `.claude/settings.json`, then each teammate runs once:

```bash
claude plugin marketplace add webdevelopersrinu/poster-design
claude plugin install poster-design@webdevelopersrinu --scope project
```

Start a new session or run `/reload-plugins`. Update later with
`claude plugin update poster-design@webdevelopersrinu`.

**Other agents** (Codex, Google Antigravity) — copy the skill folder:

```bash
git clone https://github.com/webdevelopersrinu/poster-design
cp -r poster-design/skills/poster-design ~/.agents/skills/        # Codex
cp -r poster-design/skills/poster-design ~/.gemini/config/skills/ # Antigravity
```
</details>

## 🚀 Quick Start

Type `/poster-design` with what you want, or just ask in your own words:

```
/poster-design an Instagram post for my laundry service, brand color blue
/poster-design a 20% off sale banner for wireless headphones
/poster-design a house-for-sale listing post, green brand, 3BHK with pool
/poster-design an engagement post asking followers for their hot take
```

It asks for (or infers) three things — **business type · one brand color ·
poster goal** — picks the matching layout recipe, and builds at the right
canvas: 1080×1080 feed, 1080×1350 portrait, 1080×1920 story, or 1200×630 banner.

### Export the poster to PNG

```bash
node skills/poster-design/scripts/render.mjs poster.html out.png --size ig
```

```
saved out.png (1080x1080)
```

Sizes: `ig` · `portrait` · `fb` · any `WxH`. Add `--scale 2` for retina. It
warns if the page overflows the canvas — fix the layout, don't ship a crop.

## ⚙️ How It Works

```
 Request ──▶ Three questions  (business type · brand color · goal)
                 │
                 ▼
           Layout recipe      (7 recipes from real template designs)
                 │
                 ▼
           Fonts + photo      (condensed display + clean body ·
                 │             bright people-in-action photography)
                 ▼
           HTML/CSS poster    (fixed canvas · flex column · SVG icons ·
                 │             business furniture · echo-stripe on cuts)
                 ▼
           Self-check vs. references/refs/  →  redo if it looks AI
                 │
                 ▼
           render.mjs ──▶ export-ready PNG
```

## 🛠 Tooling

| Tool | What it does |
|------|--------------|
| [`render.mjs`](skills/poster-design/scripts/render.mjs) | Renders a poster HTML to a pixel-exact PNG via Playwright/system Chrome — waits for fonts and images, warns on canvas overflow, supports preset sizes and retina scale. |

```bash
npm test   # renders a real poster and verifies the PNG dimensions
```

## 🖼 Layout Recipes

Seven skeletons taken from real template designs, each with its reference image in [`references/refs/`](skills/poster-design/references/refs/):

| Recipe | For |
|--------|-----|
| Property listing | Real-estate posts — photo, price badge, feature checklist |
| Service promo | Laundry, salons, repair — person-doing-the-thing photo |
| Product sale | Hero product, rotated discount sticker, shaped CTA |
| Two-tone announcement | Bold split-color opening/launch posts |
| Engagement post | Giant stacked one-word-per-line questions |
| Testimonial card | Review + phone mockup framing |
| Elegant dark listing | Luxury hotels, resorts, high-end property |

**Render-tested build rules** — each added after testing real rendered output:
headlines sized to fit 2–3 lines, collision-free flex layouts with explicit
gaps, SVG icons over emoji, bright well-lit photo selection, and a 10–16px
accent stripe echoing every diagonal cut.

## 📁 Project Structure

```
poster-design/
├── .claude-plugin/
│   └── plugin.json                 # plugin manifest
├── skills/poster-design/
│   ├── SKILL.md                    # designer brain: the look + build rules
│   ├── references/
│   │   ├── layouts.md              # the 7 layout recipes
│   │   ├── refs.md                 # reference catalog by category
│   │   └── refs/                   # 13 template-grade example posters
│   └── scripts/
│       └── render.mjs              # HTML → PNG exporter
└── test/
    └── render.test.mjs             # node --test suite
```

## 🤝 Contributing

Issues and PRs welcome — especially new layout recipes with reference images,
and build rules discovered from real render testing. Run `npm test` before
submitting.

## 📄 License

[MIT](LICENSE) © [Srinu Desetti](https://github.com/webdevelopersrinu) — use it, change it and share it, including commercially.

---

<div align="center">
<sub>Built for small businesses that want posters that don't look AI-generated.</sub>
</div>
