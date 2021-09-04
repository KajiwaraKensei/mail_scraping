module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2019,
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.eslint.json"],
  },
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {},
  overrides: [
    {
      // TypeScript 用に設定を上書く
      files: ["*.ts", "*.tsx"],
      rules: {},
    },
    {
      // import を sort するため、AutoFix をかける範囲で設定を上書く
      files: ["src/**/*.{js,jsx,ts,tsx}"],
      rules: {
        "import/order": [
          "error",
          {
            groups: [
              "builtin",
              "external",
              "parent",
              "sibling",
              "index",
              "object",
              "type",
            ],
            pathGroups: [
              {
                pattern: "@alias/**",
                group: "parent",
                position: "before",
              },
            ],
            alphabetize: {
              order: "asc",
            },
            "newlines-between": "always",
          },
        ],
      },
    },
  ],
};
