import path from "node:path";

/** @type {import('next').NextConfig} */
export default {
  output: "export",
  productionBrowserSourceMaps: true,
  webpack: (config) => {
    const imageLoader = config.module.rules.find(rule => rule.loader === "next-image-loader");
    imageLoader.loader = path.resolve("./webpack/image-loader.mjs");
    if (config.target[0] === "web") {
      config.target[1] = "es2022";
    }
    return config;
  }
}
