import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const assets = path.join(root, 'public', 'assets');
const output = path.join(assets, 'responsive');

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else if (entry.name.endsWith('.webp')) files.push(fullPath);
  }
  return files;
}

const projectFiles = await walk(path.join(assets, 'projects'));
const homeFiles = (await readdir(assets))
  .filter((name) => name.startsWith('home-') && name.endsWith('.webp'))
  .map((name) => path.join(assets, name));
const records = [];

for (const source of [...projectFiles, ...homeFiles].sort()) {
  const metadata = await sharp(source).metadata();
  const portrait = metadata.height > metadata.width * 1.15;
  const widths = portrait ? [480, 960] : [640, 1280];
  for (const width of widths) {
    if (metadata.width <= width) continue;
    const relative = path.relative(assets, source);
    const parsed = path.parse(relative);
    const destination = path.join(output, parsed.dir, `${parsed.name}-${width}.webp`);
    await mkdir(path.dirname(destination), { recursive: true });
    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 84, alphaQuality: 100, effort: 6 })
      .toFile(destination);
    records.push({
      source: path.relative(root, source).replaceAll('\\', '/'),
      output: path.relative(root, destination).replaceAll('\\', '/'),
      width,
      bytes: (await stat(destination)).size,
    });
  }
}

const report = {
  count: records.length,
  bytes: records.reduce((total, item) => total + item.bytes, 0),
  images: records,
};
await writeFile(
  path.join(root, 'reports', 'responsive-images.json'),
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify({ count: report.count, bytes: report.bytes }, null, 2));
