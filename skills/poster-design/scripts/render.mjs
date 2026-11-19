import { createRequire } from "node:module";
import { existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const usage = "usage: node render.mjs <poster.html or url> [out.png] [--size 1080x1080 | --size ig|portrait|fb] [--scale 2]";
const presets = { ig: [1080, 1080], portrait: [1080, 1350], fb: [1200, 630] };

const args = process.argv.slice(2);
const positionals = [];
let width = 1080;
let height = 1080;
let scale = 1;
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  const match = /^--(size|scale)(?:=(.*))?$/.exec(arg);
  if (match) {
    const value = match[2] ?? args[++i];
    if (value === undefined || value.startsWith("--")) {
      console.error(`--${match[1]} needs a value, like --size 1080x1350`);
      process.exit(1);
    }
    if (match[1] === "scale") {
      scale = Number(value);
      if (![1, 2, 3].includes(scale)) {
        console.error(`--scale must be 1, 2 or 3, got "${value}"`);
        process.exit(1);
      }
    } else {
      const preset = presets[value];
      const pair = preset ?? value.split(/[x×]/i).map(Number);
      if (pair.length !== 2 || pair.some((n) => !Number.isInteger(n) || n <= 0)) {
        console.error(`--size takes WxH or one of ${Object.keys(presets).join("/")}, got "${value}"`);
        process.exit(1);
      }
      [width, height] = pair;
    }
  } else if (!arg.startsWith("--")) {
    positionals.push(arg);
  }
}
const [input, outArg] = positionals;
if (!input) {
  console.error(usage);
  process.exit(1);
}
const out = resolve(outArg ?? input.replace(/\.html?$/i, "") + ".png");
const target = statSync(input, { throwIfNoEntry: false })?.isFile() ? pathToFileURL(resolve(input)).href : input;

async function browserKit() {
  for (const name of ["playwright", "playwright-core"]) {
    try {
      return await import(name);
    } catch {}
    try {
      return createRequire(join(process.cwd(), "package.json"))(name);
    } catch {}
  }
  console.error("Playwright is not installed. Run `npm install -D playwright` then `npx playwright install chromium`.");
  process.exit(1);
}

const chrome = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((path) => path && existsSync(path));

const { chromium } = await browserKit();
const browser = await chromium.launch(chrome ? { executablePath: chrome } : {});
try {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale });
  await page.goto(target, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    const pause = (ms) => new Promise((done) => setTimeout(done, ms));
    const loaded = (image) =>
      new Promise((done) => {
        image.addEventListener("load", done, { once: true });
        image.addEventListener("error", done, { once: true });
      });
    const pending = [...document.images].filter((image) => !image.complete);
    await Promise.race([Promise.all(pending.map(loaded)), pause(8000)]);
  });
  await page.waitForTimeout(300);

  // Warn when the poster canvas doesn't match the requested export size —
  // a mismatch means the PNG crops or letterboxes the design silently.
  const body = await page.evaluate(() => {
    const el = document.scrollingElement || document.documentElement;
    return { w: el.scrollWidth, h: el.scrollHeight };
  });
  if (body.w > width || body.h > height) {
    console.warn(`warning: page content is ${body.w}x${body.h} but export is ${width}x${height} — poster will be cropped`);
  }

  mkdirSync(dirname(out), { recursive: true });
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width, height } });
  console.log(`saved ${out} (${width * scale}x${height * scale})`);
} finally {
  await browser.close();
}
