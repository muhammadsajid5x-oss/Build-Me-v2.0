import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.turbo/**",
      "**/coverage/**",
      "**/storybook-static/**"
    ]
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended
);
