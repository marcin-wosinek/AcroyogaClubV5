
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: "module",
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // React rules
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    
    // TypeScript rules
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/prefer-const": "error",
    "@typescript-eslint/no-var-requires": "off",
    
    // General rules
    "no-unused-vars": "off", // Use TypeScript version instead
    "no-console": "warn",
    "prefer-const": "error",
    "no-var": "error",
    
    // Accessibility
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/no-static-element-interactions": "warn",
  },
  ignorePatterns: [
    "dist/", 
    "node_modules/", 
    "build/",
    "*.config.js",
    "*.config.ts",
    ".eslintrc.js"
  ],
  overrides: [
    {
      files: ["server/**/*"],
      env: {
        node: true,
        browser: false,
      },
      rules: {
        "no-console": "off", // Allow console in server code
      },
    },
    {
      files: ["client/**/*"],
      env: {
        browser: true,
        node: false,
      },
    },
  ],
};
