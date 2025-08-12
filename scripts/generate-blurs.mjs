import fs from "fs";
import path from "path";
import sharp from "sharp";

// Generate 40px-wide blurred placeholders for all images in the project root.
// The resulting files can be used as low-res previews while the full hero
// images load.
const inDir = ".";
const outDir = ".";

for (const f of fs.readdirSync(inDir)) {
  if (!/\.(jpe?g|png|webp)$/i.test(f)) continue;
  if (/-blur-40w\.jpg$/i.test(f)) continue;
  const name = path.parse(f).name;
  const outPath = path.join(outDir, `${name}-blur-40w.jpg`);
  await sharp(path.join(inDir, f))
    .resize({ width: 40 })
    .jpeg({ quality: 38, progressive: true })
    .blur(8)
    .toFile(outPath);
  console.log(`Made ${path.basename(outPath)}`);
}
