import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDirectory = path.join(root, 'public');
const files = ['ranova-case-study.html', 'vivo-case-study.html', 'liusimu-case-study.html'];

for (const file of files) {
  const filePath = path.join(publicDirectory, file);
  let html = await readFile(filePath, 'utf8');
  const tags = [...html.matchAll(/<img\b[^>]*\bsrc="(\/assets\/projects\/[^"?]+\.webp)"[^>]*>/g)];
  for (const match of tags.reverse()) {
    const [tag, url] = match;
    if (tag.includes('srcset=') || tag.includes('data-full=')) continue;
    const source = path.join(publicDirectory, ...url.split('/').filter(Boolean));
    const metadata = await sharp(source).metadata();
    const portrait = metadata.height > metadata.width * 1.15;
    const candidateWidths = portrait ? [480, 960] : [640, 1280];
    const candidates = [];
    for (const width of candidateWidths) {
      if (metadata.width <= width) continue;
      const parsed = path.posix.parse(url.replace('/assets/', ''));
      candidates.push(`/assets/responsive/${parsed.dir}/${parsed.name}-${width}.webp ${width}w`);
    }
    if (!candidates.length) continue;
    candidates.push(`${url} ${metadata.width}w`);
    const smallest = candidates[0].split(' ')[0];
    const isHero = tag.includes('hero-project-image');
    const isPlanning = tag.includes('planning-image');
    const sizes = isHero
      ? '(max-width: 760px) 92vw, 579px'
      : isPlanning
        ? '(max-width: 760px) 92vw, (max-width: 1400px) 800px, 1100px'
        : '(max-width: 760px) 92vw, 260px';
    const enhanced = tag
      .replace(`src="${url}"`, `src="${smallest}" srcset="${candidates.join(', ')}" sizes="${sizes}" data-full="${url}"`);
    html = html.slice(0, match.index) + enhanced + html.slice(match.index + tag.length);
  }

  html = html
    .replaceAll('lightboxImage.src = image.src;', "lightboxImage.src = image.dataset.full || image.currentSrc || image.src;")
    .replaceAll('openZoom(img.src, img.alt);', "openZoom(img.dataset.full || img.currentSrc || img.src, img.alt);")
    .replaceAll('openZoom(heroImg.src, heroImg.alt);', "openZoom(heroImg.dataset.full || heroImg.currentSrc || heroImg.src, heroImg.alt);")
    .replaceAll('lightboxImage.src = image.src;', "lightboxImage.src = image.dataset.full || image.currentSrc || image.src;");
  await writeFile(filePath, html);
  console.log(`${file}: ${tags.length} project images checked`);
}
