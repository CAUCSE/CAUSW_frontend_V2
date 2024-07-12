/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        permanent: false,
        destination: "/redirectRoute",
      },
      {
        source: "/redirectRoute",
        permanent: false,
        destination: "/home",
      },
    ];
  },
};

export default nextConfig;
