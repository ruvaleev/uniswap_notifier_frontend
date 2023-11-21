module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "ignorePatterns": [
    "dist/", "node_modules/"
  ],
  "overrides": [
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "no-console": "warn",
    "no-trailing-spaces": "warn"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
