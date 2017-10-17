module.exports = {
  root: true,
  extends: [
    'muriki/node',
    'muriki/es/latest',
  ],
  parser: 'babel-eslint',
  rules: {
    'no-await-in-loop': 0,
    'node/no-unsupported-features': 0,
  }
};
