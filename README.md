# poster-design

Created by Srinu Desetti ([@webdevelopersrinu](https://github.com/webdevelopersrinu)).

poster-design is a skill for Claude Code that designs social media posters the way a working designer makes them for a real small business — one bold flat brand color, asymmetric photo-dominant layouts cut by diagonals and curves, condensed display headlines, shaped buttons, rotated discount stickers and real contact details — instead of the AI-default look of purple gradients, glow, centered symmetric heroes and emoji copy. It covers product promos, service offers, property listings, sale banners, engagement posts and testimonial cards, built as export-ready HTML/CSS at real canvas sizes or as prompts for an image generation tool.

## Install

For Claude Code, install it as a plugin. Run this in a terminal to get it in every project:

```bash
claude plugin install poster-design --marketplace webdevelopersrinu/poster-design
```

On an older Claude Code without `--marketplace`, the same in two steps:

```bash
claude plugin marketplace add webdevelopersrinu/poster-design
claude plugin install poster-design@webdevelopersrinu
```

To get it in a single project only, run the install from that project's root folder, the one you start Claude Code in, and add `--scope local`. To turn it on for everyone who works in the project, add `--scope project` instead and commit `.claude/settings.json`. Each teammate then runs this once in their own copy of the project:

```bash
claude plugin marketplace add webdevelopersrinu/poster-design
claude plugin install poster-design@webdevelopersrinu --scope project
```

Then start a new Claude Code session, or run `/reload-plugins` in one that is already open.

To update, run `claude plugin update poster-design@webdevelopersrinu`, or turn on auto-update for the webdevelopersrinu marketplace under Marketplaces in `/plugin`.

For other agents that support skills (Codex, Google Antigravity), copy the skill folder into their skills directory:

```bash
git clone https://github.com/webdevelopersrinu/poster-design
cp -r poster-design/skills/poster-design ~/.agents/skills/        # Codex
cp -r poster-design/skills/poster-design ~/.gemini/config/skills/ # Antigravity
```

## Use

In Claude Code, type `/poster-design` with what you want, or just ask in your own words and the agent picks the skill up by itself.

```
/poster-design an Instagram post for my laundry service, brand color blue
/poster-design a 20% off sale banner for wireless headphones
/poster-design a house-for-sale listing post, green brand, 3BHK with pool
/poster-design an engagement post asking followers for their hot take
```

It asks for (or infers) three things before designing — your business type, your one brand color and the poster's goal — then picks the matching layout recipe and builds the poster at the right canvas size: 1080×1080 for a feed post, 1080×1350 portrait, 1080×1920 story, or 1200×630 banner.

## What it does

- **Human look, enforced.** One flat brand color plus one accent, asymmetric layouts where the photo fills 50–70% of the canvas, condensed display fonts with at most one script accent word, and shop-owner copy with no emoji. Gradients, glow, glassmorphism and centered-everything are banned outright.
- **Seven layout recipes.** Property listing, service promo, product sale, bold two-tone announcement, engagement post, testimonial card and elegant dark listing — each with the exact skeleton taken from real template designs.
- **Real-business furniture.** Logo tab, phone and website with inline SVG icons, address, checkmark feature lists, price badges and rotated discount stickers, pill-shaped CTAs.
- **Render-tested build rules.** Headlines sized to fit two or three lines, collision-free flex layouts, SVG icons instead of emoji that break in renders, bright people-in-action photo selection, and an accent stripe echoing every diagonal cut — each rule added after testing actual rendered output against the reference designs.
- **Reference-driven.** The skill studies the example posters in `skills/poster-design/references/refs/` before every design and self-checks the result against them: if the poster would stand out next to those references for the wrong reason, it redoes it.
- **Image-tool ready.** When generating with an image service instead of HTML/CSS, it writes prompts that name the layout, fonts and furniture explicitly and exclude gradient, glow, bokeh and 3D-render looks.

## License

[MIT](LICENSE). Use it, change it and share it, including commercially.
