import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    rules: {
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            // Shared cannot import from any FSD layer
            {
              target: "./src/shared/**/*",
              from: "./src/(entities|features|widgets|pages|app)/**/*",
            },
            // Entities can only import from shared
            {
              target: "./src/entities/**/*",
              from: "./src/(features|widgets|pages|app)/**/*",
            },
            // Features can only import from entities and shared
            {
              target: "./src/features/**/*",
              from: "./src/(widgets|pages|app)/**/*",
            },
            // Widgets can only import from features, entities, and shared
            {
              target: "./src/widgets/**/*",
              from: "./src/(pages|app)/**/*",
            },
            // App Router can only import from pages
            {
              target: "./app/**/*",
              from: "./src/(widgets|features|entities|shared)/**/*",
            },
            // Prevent direct segment imports from other slices (force Public API usage)
            {
              target: "./src/(entities|features|widgets|pages|app)/**/*",
              from: "./src/shared/(ui|api|model|lib|config)/**/*",
              message: "Import from slice's public API (index.ts) instead of internal segments"
            },
            {
              target: "./src/(features|widgets|pages|app)/**/*", 
              from: "./src/entities/*/(ui|api|model|lib|config)/**/*",
              message: "Import from slice's public API (index.ts) instead of internal segments"
            },
            {
              target: "./src/(widgets|pages|app)/**/*",
              from: "./src/features/*/(ui|api|model|lib|config)/**/*", 
              message: "Import from slice's public API (index.ts) instead of internal segments"
            },
            {
              target: "./src/(pages|app)/**/*",
              from: "./src/widgets/*/(ui|api|model|lib|config)/**/*",
              message: "Import from slice's public API (index.ts) instead of internal segments"
            },
            {
              target: "./app/**/*",
              from: "./src/pages/*/(ui|api|model|lib|config)/**/*",
              message: "Import from slice's public API (index.ts) instead of internal segments"
            }
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
