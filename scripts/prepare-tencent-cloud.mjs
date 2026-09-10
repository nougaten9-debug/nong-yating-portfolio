import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

if (process.env.TENCENT_CLOUD !== 'true') {
  throw new Error('TENCENT_CLOUD=true is required for the Tencent Cloud build.');
}

const outputDirectory = path.resolve('dist/client');
const routeFiles = [
  ['about.html', 'about/index.html'],
  ['content.html', 'content/index.html'],
  ['projects.html', 'projects/index.html'],
  ['projects/ranova.html', 'projects/ranova/index.html'],
  ['projects/vivo.html', 'projects/vivo/index.html'],
  ['projects/liusimu.html', 'projects/liusimu/index.html'],
  ['ai-lab.html', 'ai-lab/index.html'],
  ['resume-contact.html', 'resume-contact/index.html'],
  ['opening-preview.html', 'opening-preview/index.html'],
  ['ranova-case-study.html', 'ranova-case-study/index.html'],
  ['vivo-case-study.html', 'vivo-case-study/index.html'],
  ['liusimu-case-study.html', 'liusimu-case-study/index.html'],
];

for (const [source, destination] of routeFiles) {
  const destinationPath = path.join(outputDirectory, destination);
  await mkdir(path.dirname(destinationPath), { recursive: true });
  await copyFile(path.join(outputDirectory, source), destinationPath);
}

console.log('Prepared Tencent Cloud artifact at ' + outputDirectory + ' with root path /.');
