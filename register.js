const Cursor = require('mongodb/lib/cursor');
const register = require('register-toggle');

const iterableCursor = require('./index');

module.exports = register({
  extend: Cursor.prototype,
  properties: {
    [Symbol.asyncIterator]() {
      return iterableCursor(this);
    },
  },
});
