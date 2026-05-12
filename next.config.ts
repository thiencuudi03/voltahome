/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**", // Thêm dòng này để cho phép tất cả các đường dẫn ảnh từ Unsplash
      },
    ],
  },
};

module.exports = nextConfig;
