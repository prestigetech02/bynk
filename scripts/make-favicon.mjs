import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const src = path.resolve(
  process.env.USERPROFILE,
  ".cursor/projects/c-Users-USER-Desktop-Projects-bynk/assets",
  "c__Users_USER_AppData_Roaming_Cursor_User_workspaceStorage_1915fcb9700e7cc94820052b70f1c9e2_images_WhatsApp_Image_2026-10-15_at_5.38.05_PM__1_-1e2ae10f-ddb9-4d55-9b67-25bff6f57f0f.jpg",
);

const publicDir = path.resolve("public");
const appDir = path.resolve("src/app");

async function makeSquarePng(size, outPath, paddingRatio = 0.12) {
  const meta = await sharp(src).metadata();
  const maxInner = Math.round(size * (1 - paddingRatio * 2));
  const scale = Math.min(maxInner / meta.width, maxInner / meta.height);
  const w = Math.max(1, Math.round(meta.width * scale));
  const h = Math.max(1, Math.round(meta.height * scale));
  const left = Math.round((size - w) / 2);
  const top = Math.round((size - h) / 2);
  const resized = await sharp(src)
    .ensureAlpha()
    .resize(w, h, { fit: "inside" })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: resized, left, top }])
    .png()
    .toFile(outPath);

  console.log("wrote", outPath);
}

function createIcoFromPngs(items) {
  const count = items.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const parts = items.map((item) => {
    const part = { ...item, offset };
    offset += item.buf.length;
    return part;
  });

  const out = Buffer.alloc(offset);
  out.writeUInt16LE(0, 0);
  out.writeUInt16LE(1, 2);
  out.writeUInt16LE(count, 4);

  let ep = 6;
  for (const p of parts) {
    out.writeUInt8(p.w >= 256 ? 0 : p.w, ep);
    out.writeUInt8(p.h >= 256 ? 0 : p.h, ep + 1);
    out.writeUInt8(0, ep + 2);
    out.writeUInt8(0, ep + 3);
    out.writeUInt16LE(1, ep + 4);
    out.writeUInt16LE(32, ep + 6);
    out.writeUInt32LE(p.buf.length, ep + 8);
    out.writeUInt32LE(p.offset, ep + 12);
    ep += 16;
  }

  for (const p of parts) {
    p.buf.copy(out, p.offset);
  }

  return out;
}

const png16Path = path.join(publicDir, "favicon-16.png");
const png32Path = path.join(publicDir, "favicon-32.png");

await sharp(src).png().toFile(path.join(publicDir, "bynk-logo-light.png"));
await makeSquarePng(512, path.join(appDir, "icon.png"));
await makeSquarePng(180, path.join(appDir, "apple-icon.png"));
await makeSquarePng(32, png32Path, 0.1);
await makeSquarePng(16, png16Path, 0.08);

const png16 = await sharp(png16Path).png().toBuffer();
const png32 = await sharp(png32Path).png().toBuffer();
const s16 = await sharp(png16).metadata();
const s32 = await sharp(png32).metadata();

const ico = createIcoFromPngs([
  { w: s16.width, h: s16.height, buf: png16 },
  { w: s32.width, h: s32.height, buf: png32 },
]);

fs.writeFileSync(path.join(appDir, "favicon.ico"), ico);
console.log("wrote favicon.ico", ico.length);
