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
        source: '/:year(\\d{4})/:month(\\d{2})/:date(\\d{2})/:slug', // Match dates
        destination: '/posts/:slug',
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
