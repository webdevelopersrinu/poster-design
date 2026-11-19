import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(new URL("../skills/poster-design/scripts/render.mjs", import.meta.url));

const png = (file) => {
  const buf = readFileSync(file);
  assert.equal(buf.readUInt32BE(1), 0x504e470d); // "PNG\r"
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
};

test("renders a poster html to a png at the requested size", { timeout: 60_000 }, () => {
  const dir = mkdtempSync(join(tmpdir(), "poster-"));
  const poster = join(dir, "poster.html");
  writeFileSync(poster, `<!doctype html><body style="margin:0"><div style="width:1080px;height:1350px;background:#1b4332;color:#fff;font:700 80px sans-serif">OPEN HOUSE</div>`);
  const out = join(dir, "poster.png");
  const stdout = execFileSync("node", [script, poster, out, "--size", "portrait"], { encoding: "utf8" });
  assert.match(stdout, /saved .*poster\.png \(1080x1350\)/);
  assert.deepEqual(png(out), { width: 1080, height: 1350 });
});

test("rejects a bad --size", () => {
  assert.throws(() => execFileSync("node", [script, "x.html", "--size", "huge"], { encoding: "utf8" }));
});
