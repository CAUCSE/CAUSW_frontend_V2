/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/.well-known/assetlinks.json",
        permanent: false,
        destination: "/.well-known/assetlinks.json", // 안드로이드 배포 검토
      },
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
  images: {
    domains: ["caucse-s3-bucket.s3.ap-northeast-2.amazonaws.com"], // S3 버킷 도메인 허용
  },
};

export default nextConfig;
