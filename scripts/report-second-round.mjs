import { readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const publicDirectory = path.join(root, 'public');
const firstRound = JSON.parse(await readFile(path.join(root, 'reports', 'image-audit-after.json')));

async function bytesForUrl(url) {
  return (await stat(path.join(publicDirectory, ...url.split('/').filter(Boolean)))).size;
}

async function project(name) {
  const html = await readFile(path.join(publicDirectory, `${name}-case-study.html`), 'utf8');
  const tags = [...html.matchAll(/<img\b[^>]*(?:data-full|src)="(\/assets\/projects\/[^"?]+\.webp)"[^>]*>/g)].map((match) => match[0]);
  const fullUrls = [...new Set(tags.map((tag) => tag.match(/data-full="([^"]+)"/)?.[1] ?? tag.match(/src="([^"]+)"/)?.[1]).filter(Boolean))];
  const fullBytes = await Promise.all(fullUrls.map(bytesForUrl));
  const selectedUrls = tags.map((tag) => {
    if (tag.includes('loading="eager"')) return tag.match(/src="([^"]+)"/)?.[1];
    const srcset = tag.match(/data-srcset="([^"]+)"/)?.[1];
    if (!srcset) return tag.match(/data-src="([^"]+)"/)?.[1];
    const candidates = srcset.split(',').map((item) => item.trim().split(/\s+/));
    const target = tag.includes('planning-image') ? 1280 : 480;
    return candidates.find(([, width]) => Number.parseInt(width) >= target)?.[0] ?? candidates.at(-1)?.[0];
  }).filter(Boolean);
  const selectedBytes = await Promise.all([...new Set(selectedUrls)].map(bytesForUrl));
  const hero = tags.find((tag) => tag.includes('loading="eager"'));
  const heroUrl = hero?.match(/src="([^"]+)"/)?.[1];
  const initialBytes = heroUrl ? await bytesForUrl(heroUrl) : 0;
  return {
    images: fullUrls.length,
    original_bytes: fullBytes.reduce((a, b) => a + b, 0),
    effective_desktop_bytes: selectedBytes.reduce((a, b) => a + b, 0),
    initial_bytes: initialBytes,
    deferred_bytes: selectedBytes.reduce((a, b) => a + b, 0) - initialBytes,
    largest_original_bytes: Math.max(...fullBytes),
  };
}

const responsiveFiles = JSON.parse(await readFile(path.join(root, 'reports', 'responsive-images.json')));
const currentRecords = [];
for (const record of firstRound.records) {
  try {
    currentRecords.push({ ...record, bytes: (await stat(path.join(root, record.path))).size });
  } catch {}
}
const primaryBytes = currentRecords.reduce((sum, item) => sum + item.bytes, 0);
const homeUrls = ['/assets/home-base-bw.webp', ...['about', 'projects', 'content', 'ai-lab', 'resume'].map((name) => `/assets/home-${name}-color.webp`), ...['plant', 'pencilcase', 'coffee-set', 'lamp', 'laptop'].map((name) => `/assets/home-decor-${name}-color.webp`)];
const homeBytes = (await Promise.all(homeUrls.map(bytesForUrl))).reduce((a, b) => a + b, 0);
const report = {
  primary_images_before_bytes: firstRound.total_bytes,
  primary_images_after_bytes: primaryBytes,
  responsive_derivatives_bytes: responsiveFiles.bytes,
  deployed_image_inventory_bytes: primaryBytes + responsiveFiles.bytes,
  home_images_bytes: homeBytes,
  home_initial_desktop_before_bytes: homeBytes,
  home_initial_desktop_after_bytes: await bytesForUrl('/assets/home-base-bw.webp'),
  home_requests_before: 11,
  home_requests_after: 1,
  projects: {
    ranova: await project('ranova'),
    vivo: await project('vivo'),
    liusimu: await project('liusimu'),
  },
  largest_before: firstRound.records.slice(0, 10).map(({ path: file, bytes }) => ({ file, bytes })),
  largest_after: currentRecords.sort((a, b) => b.bytes - a.bytes).slice(0, 10).map(({ path: file, bytes }) => ({ file, bytes })),
};
await writeFile(path.join(root, 'reports', 'second-round-performance.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
