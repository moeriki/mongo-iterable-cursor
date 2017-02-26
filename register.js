const Cursor = require('mongodb/lib/cursor');

const iterableCursor = require('./index');

if (Cursor.prototype[Symbol.asyncIterator]) {
  throw new Error('mongo cursor already has an asyncIterator');
}

Cursor.prototype[Symbol.asyncIterator] = function asyncIterator() {
  return iterableCursor(this);
};

module.exports = () => delete Cursor.prototype[Symbol.asyncIterator];
