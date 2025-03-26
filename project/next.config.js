/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { 
    // unoptimized: true,  // Není potřeba pro serverové renderování
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // trailingSlash: true,  // Není potřeba pro serverové renderování
  experimental: {
    appDir: true,
  },
  // Povolení generování sitemap
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
};

module.exports = nextConfig;