import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const files = ['ranova-case-study.html', 'vivo-case-study.html', 'liusimu-case-study.html'];
const loader = `
<script>
(function () {
  var images = document.querySelectorAll('img[data-src]');
  function load(image) {
    if (image.dataset.srcset) image.srcset = image.dataset.srcset;
    image.src = image.dataset.src;
    image.removeAttribute('data-src');
    image.removeAttribute('data-srcset');
  }
  if (!('IntersectionObserver' in window)) {
    images.forEach(load);
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      load(entry.target);
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '600px 0px' });
  images.forEach(function (image) { observer.observe(image); });
})();
</script>
`;

for (const file of files) {
  const filePath = path.join(root, 'public', file);
  let html = await readFile(filePath, 'utf8');
  html = html.replace(/<img\b[^>]*loading="lazy"[^>]*>/g, (tag) => {
    if (tag.includes('data-src=')) return tag;
    return tag
      .replace(/\bsrc="([^"]+)"/, 'data-src="$1"')
      .replace(/\bsrcset="([^"]+)"/, 'data-srcset="$1"');
  });
  if (!html.includes("rootMargin: '600px 0px'")) html = html.replace('</body>', loader + '</body>');
  await writeFile(filePath, html);
}
