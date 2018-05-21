module.exports = {
  extends: "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module"
  },
  globals: {
    angular: false,
    $: false,
    jQuery: false,
    echart: false,
    _: false,
    moment: false,
    window: false,
    WebControl: false,
    console: false,
    document: false,
    require: false
  },
  rules: {
    // enable additional rules
    indent: ["error", 2],
    quotes: 1,
    semi: 1,
    ignoreChainWithDepth: 4,
    "dot-location": ["error", "property"],
    "multiline-ternary": ["error", "never"],
    "one-var-declaration-per-line": "off",

    // 未使用
    "no-unused-vars": 1,

    // disable
    "no-undef": "off",

    // disable rules from base configurations
    "no-console": "off"
  }
};
