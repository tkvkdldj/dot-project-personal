import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], 
    plugins: { js }, 
    extends: ["js/recommended","plugin:react/jsx-runtime", "plugin:react/recommended", "plugin:react-hooks/recommended"],
    rules: {
      "no-console": "warn",
      "react/prop-types": "off",
    }, 
  },  // js 기본 룰
  { files: ["**/*.{js,mjs,cjs,jsx}"], 
    languageOptions: { 
      globals: {...globals.browser, ...globals.node} } },
  pluginReact.configs.flat.recommended,   // React 추천 설정
]);