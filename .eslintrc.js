module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "ecmaFeatures": {
    "jsx": true
  },
  "plugins": [
    "react"
  ],
  "extends": [
    "eslint-config-airbnb"
  ],
  "rules": {
    "comma-dangle": 0,
    "no-console": 0,
    "id-length": 0,
    "react/prop-types": 0,
    "arrow-body-style": ["error", "always"]
  }
};
