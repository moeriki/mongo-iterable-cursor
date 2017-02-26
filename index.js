/* eslint no-await-in-loop:0 */

async function* iterableCursor(cursor) {
  try {
    while (await cursor.hasNext()) {
      yield await cursor.next();
    }
  } finally {
    await cursor.close();
  }
}

module.exports = iterableCursor;
