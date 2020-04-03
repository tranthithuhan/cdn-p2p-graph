module.exports = {
  env: {
    browser: true,
    es6: true,
  "jest": true
  },
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-hooks"
  ],
  "rules": {
    "indent": [
      "error",
      2,
      { "SwitchCase": 1 }
    ],
    "linebreak-style": ["error", "unix"],
    "semi": ["error", "never"], // no semicolon
    "quotes": ["error", "single"], // always prefer single quotes
    "no-console": "warn", // warn on console.log(...)
    "comma-dangle": ["error", "never"],
    "arrow-parens": ["error", "as-needed"], // enforces no braces where they can be omitted
    "space-before-function-paren": ["error", "always"], // always require a space between function name and its args
    "react-hooks/rules-of-hooks": "error", // checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // checks effect dependencies
    "react/forbid-prop-types": "off", // disable forbidden propType 'any', 'array', 'object'
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }], // allow JSX in .js file
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}], // no error when importing a devDependency
    "react/jsx-props-no-spreading": "off", // disable no spreading rule
    "no-underscore-dangle": ["error", { "allow": ["_id", "__typename"] }] // disallow dangling underscores in identifiers except for "_id"
  }
};
