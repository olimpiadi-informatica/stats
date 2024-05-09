import { FlatCompat } from "@eslint/eslintrc";
import configs from "@olinfo/eslint";

const compat = new FlatCompat();

export default [
  ...configs,
  ...compat.extends("plugin:@next/eslint-plugin-next/core-web-vitals"),
  {
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
];
