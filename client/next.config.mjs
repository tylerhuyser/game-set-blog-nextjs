/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/posts/:id/:slug',
        destination: '/posts/:slug',
        permanent: true
      },
      {
        source: '/:id/:slug',
        destination: '/posts/:slug',
        permanent: true
      },
      {
        source: '/:year/:month/:date/:slug',
        destination: '/posts/:slug',
        permanent: true
      },
    ]
  }
};

export default nextConfig;
