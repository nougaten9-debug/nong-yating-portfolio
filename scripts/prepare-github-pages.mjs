import { cp, copyFile, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const outputDirectory = path.resolve('dist/client');
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];

if (!repositoryName) {
  throw new Error('GITHUB_REPOSITORY must be set for the GitHub Pages build.');
}

const basePath = '/' + repositoryName;
const textExtensions = new Set(['.css', '.html', '.js', '.json', '.rsc', '.svg', '.txt']);
const internalRoots = [
  '_next/',
  'assets/',
  'fonts/',
  'favicon.svg',
  'about',
  'content',
  'projects',
  'ai-lab',
  'resume-contact',
  'opening-preview',
  'ranova-case-study',
  'vivo-case-study',
  'liusimu-case-study',
];

const prefixedBuildDirectory = path.join(outputDirectory, repositoryName);
await cp(
  path.join(prefixedBuildDirectory, '_next'),
  path.join(outputDirectory, '_next'),
  { recursive: true },
);
await rm(prefixedBuildDirectory, { recursive: true });

function addBasePath(contents) {
  const rewritten = contents.replace(
    /([("'=:\s\x60])\/(?!\/)([^"'()<>\s\x60]*)/g,
    (match, prefix, target) => {
      if (target.startsWith(repositoryName + '/')) return match;
      if (!internalRoots.some((root) => target === root || target.startsWith(root))) return match;
      return prefix + basePath + '/' + target;
    },
  );

  return rewritten
    .replaceAll('href="/"', 'href="' + basePath + '/"')
    .replaceAll('href:\x60/\x60', 'href:\x60' + basePath + '/\x60')
    .replaceAll('href:"/"', 'href:"' + basePath + '/"');
}

async function rewriteTree(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await rewriteTree(fullPath);
    } else if (textExtensions.has(path.extname(entry.name))) {
      const original = await readFile(fullPath, 'utf8');
      const rewritten = addBasePath(original);
      if (rewritten !== original) await writeFile(fullPath, rewritten);
    }
  }
}

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
  const sourcePath = path.join(outputDirectory, source);
  const destinationPath = path.join(outputDirectory, destination);
  await mkdir(path.dirname(destinationPath), { recursive: true });
  await copyFile(sourcePath, destinationPath);
}

await rewriteTree(outputDirectory);
for (const caseStudy of ['ranova', 'vivo', 'liusimu']) {
  const caseStudyPath = path.join(outputDirectory, `${caseStudy}-case-study/index.html`);
  const contents = await readFile(caseStudyPath, 'utf8');
  await writeFile(
    caseStudyPath,
    contents.replace('class="back-projects"', 'target="_top" class="back-projects"'),
  );
}
await cp(
  path.join(outputDirectory, 'fonts'),
  path.join(outputDirectory, '_next/static/fonts'),
  { recursive: true },
);
await writeFile(path.join(outputDirectory, '.nojekyll'), '');

console.log('Prepared GitHub Pages artifact at ' + outputDirectory + ' with base path ' + basePath);
