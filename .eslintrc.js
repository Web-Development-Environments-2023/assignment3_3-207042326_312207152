module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "plugin:vue/strongly-recommended",
    "eslint:recommended",
    "standard",
    "@vue/prettier",
    "prettier"
  ],
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2020, // Enable parsing of dynamic imports

  },
  extends: ["plugin:vue/essential"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": process.env.NODE_ENV === "production" ? "warn" : "off"

  }
};
