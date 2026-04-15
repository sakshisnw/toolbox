/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  // Redirects from old routes to new /tools/ routes for SEO
  async redirects() {
    return [
      { source: '/bmi-calculator', destination: '/tools/bmi-calculator', permanent: true },
      { source: '/age-calculator', destination: '/tools/age-calculator', permanent: true },
      { source: '/emi-calculator', destination: '/tools/emi-calculator', permanent: true },
      { source: '/percentage-calculator', destination: '/tools/percentage-calculator', permanent: true },
      { source: '/compound-interest', destination: '/tools/compound-interest', permanent: true },
      { source: '/compress-image', destination: '/tools/compress-image', permanent: true },
      { source: '/resize-image', destination: '/tools/resize-image', permanent: true },
      { source: '/convert-image', destination: '/tools/convert-image', permanent: true },
      { source: '/remove-bg', destination: '/tools/remove-bg', permanent: true },
    ];
  },
};

export default nextConfig;
