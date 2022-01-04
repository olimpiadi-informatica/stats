const withOptimizedImages = require("next-optimized-images");

/** @type {import('next').NextConfig} */
module.exports = withOptimizedImages({
  handleImages: ["jpeg", "png", "webp"],
  optimizeImages: true,
  optimizeImagesInDev: true,
  pngquant: false,
  webp: {
    preset: "default",
  },
  responsive: {
    adapter: require("responsive-loader/sharp"),
  },
  devIndicators: {
    autoPrerender: false,
  },
  compress: false,

  reactStrictMode: true,
  images: {
    disableStaticImages: true,
  },
  trailingSlash: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };

    return config;
  },
});
