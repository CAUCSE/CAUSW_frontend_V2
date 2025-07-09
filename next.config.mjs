/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/',
        permanent: false,
        destination: '/redirectRoute',
      },
      {
        source: '/redirectRoute',
        permanent: false,
        destination: '/home',
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/.well-known/assetlinks.json',
        destination: '/public/.well-known/assetlinks.json',
      },
    ];
  },
  images: {
    domains: [
      'caucse-s3-bucket.s3.ap-northeast-2.amazonaws.com',
      'caucse-s3-bucket-prod.s3.ap-northeast-2.amazonaws.com',
    ], // S3 버킷 도메인 허용
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          net: false,
          dns: false,
          tls: false,
          assert: false,
          fs: false,
          child_process: false,
        },
      };
    }
    return config;
  },
};

export default nextConfig;
