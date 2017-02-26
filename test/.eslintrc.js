module.exports = {
  root: true,
  extends: [
    'muriki/presets/jest',
    'muriki/es/latest',
  ],
  parser: 'babel-eslint',
  rules: {
    // for-await-of produces some bugs in eslint
    'require-await': 0,
    'semi': 0,
  }
};
