import sharp from "sharp";
import { writeFile } from "fs/promises";

const lightPath = "public/images/brand/jonacart-logo-light.png";
const markPath = "public/images/brand/jonacart-mark.png";

const base = await sharp(lightPath).png().toBuffer();
const m = await sharp(base).metadata();
const gap = Math.round(m.height * 0.02);
const cartH = Math.round(m.height * 0.18);
const fontSize = Math.round(m.width * 0.22);
const totalH = m.height + gap + cartH;
const w = m.width;

function cartSvg(fill, dot) {
  const y = m.height + gap + fontSize * 0.78;
  const cartWidth = fontSize * 3.35;
  const startX = w / 2 - cartWidth / 2;
  const dotX = w / 2 + cartWidth / 2 + fontSize * 0.08;
  return Buffer.from(`<svg width="${w}" height="${totalH}" xmlns="http://www.w3.org/2000/svg">
  <text x="${startX}" y="${y}"
    font-family="Arial Black, Impact, Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="900"
    fill="${fill}" letter-spacing="2">CART</text>
  <circle cx="${dotX}" cy="${y - fontSize * 0.12}" r="${fontSize * 0.12}" fill="${dot}" />
</svg>`);
}

async function composite(fill, dot, outPath) {
  const buf = await sharp({
    create: { width: w, height: totalH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      { input: base, top: 0, left: 0 },
      { input: cartSvg(fill, dot), top: 0, left: 0 },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
  await sharp(buf).toFile(outPath);
  return buf;
}

const light = await composite("#1a1a1a", "#6b142f", "public/images/brand/jonacart-logo.png");
await sharp(light).resize({ height: 160 }).toFile("public/images/brand/jonacart-logo@2x.png");
await sharp(light).resize({ height: 80 }).toFile("public/images/brand/jonacart-logo-sm.png");
await sharp(light).webp({ quality: 92 }).toFile("public/images/brand/jonacart-logo.webp");
await composite("#d0d0d0", "#8b1e45", "public/images/brand/jonacart-logo-on-dark.png");

const mark = await sharp(markPath)
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

await sharp(mark).resize(32).png().toFile("public/favicon-32.png");
await sharp(mark).resize(48).png().toFile("public/favicon-48.png");
await sharp(mark).resize(64).png().toFile("public/icon.png");

const appleBg = Buffer.from(
  `<svg width="180" height="180" xmlns="http://www.w3.org/2000/svg"><rect width="180" height="180" rx="40" fill="#6b142f"/></svg>`,
);
const mark180 = await sharp(mark)
  .resize(140, 140, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();
await sharp(appleBg)
  .composite([{ input: mark180, gravity: "centre" }])
  .png()
  .toFile("public/apple-touch-icon.png");

// Favicon SVG wrapping PNG (crisp in modern browsers)
const markB64 = (await sharp(mark).resize(128).png().toBuffer()).toString("base64");
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <image href="data:image/png;base64,${markB64}" width="64" height="64" />
</svg>`;
await writeFile("public/icon.svg", iconSvg);
await writeFile("src/app/icon.svg", iconSvg);

const meta = await sharp(light).metadata();
console.log("done", meta.width, meta.height);
