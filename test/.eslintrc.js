module.exports = {
  root: true,
  extends: [
    'muriki/jest',
    'muriki/es/latest',
  ],
  parser: 'babel-eslint',
  rules: {
    // for-await-of produces some bugs in eslint
    'require-await': 0,
    'node/no-unsupported-features': 0,
  }
};
