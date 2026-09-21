import path from "node:path";

import type { NextConfig } from "next";

export default {
  output: "export",
  productionBrowserSourceMaps: true,
  turbopack: {
    root: path.resolve(".."),
  },
} satisfies NextConfig;
