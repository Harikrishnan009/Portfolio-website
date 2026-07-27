/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isGitHubPages ? '/Portfolio-website' : '',
  assetPrefix: isGitHubPages ? '/Portfolio-website/' : '',
};

module.exports = nextConfig;
