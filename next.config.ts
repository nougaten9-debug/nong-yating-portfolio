import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const githubPagesAssetPrefix = isGitHubPages && repositoryName ? '/' + repositoryName : '';

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: 'export',
      assetPrefix: githubPagesAssetPrefix,
    }
  : {};

export default nextConfig;
