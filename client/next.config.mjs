/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/posts/:id(\\d{1,3})/:slug', // Match only numeric IDs
        destination: '/posts/:slug',
        permanent: true,
      },
      {
        source: '/:id(\\d{1,3})/:slug', // Match only numeric IDs outside "posts"
        destination: '/posts/:slug',
        permanent: true,
      },
      {
        source: '/:year(\\d{4})/:month(\\d{1,2})/:date(\\d{1,2})/:slug', // Match dates
        destination: '/posts/:slug',
        permanent: true,
      },
    ];
  },
  images: {
    localPatterns: [
      {
        pathname: '/assets/**',
        search: '',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.gamesetblog.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
