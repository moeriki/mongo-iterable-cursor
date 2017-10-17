<p align="center">
  <h3 align="center">mongo-iterable-cursor</h3>
  <p align="center">Turn your <a href="https://github.com/mongodb/node-mongodb-native">mongodb</a> cursor into an <a href="https://github.com/tc39/proposal-async-iteration">async iterable</a>.<p>
  <p align="center">
    <a href="https://www.npmjs.com/package/mongo-iterable-cursor">
      <img src="https://img.shields.io/npm/v/mongo-iterable-cursor.svg" alt="npm version">
    </a>
    <a href="https://travis-ci.org/Moeriki/mongo-iterable-cursor">
      <img src="https://travis-ci.org/Moeriki/mongo-iterable-cursor.svg?branch=master" alt="Build Status"></img>
    </a>
    <a href="https://coveralls.io/github/Moeriki/mongo-iterable-cursor?branch=master">
      <img src="https://coveralls.io/repos/github/Moeriki/mongo-iterable-cursor/badge.svg?branch=master" alt="Coverage Status"></img>
    </a>
    <a href="https://david-dm.org/moeriki/mongo-iterable-cursor">
      <img src="https://david-dm.org/moeriki/mongo-iterable-cursor/status.svg" alt="dependencies Status"></img>
    </a>
  </p>
</p>

Async iteration is a stage-3 proposal. Use with caution!

## Without babel

You'll need Node.js 4 or above.

```js
const { MongoClient } = require('mongodb');
const iterable = require('mongo-iterable-cursor');

MongoClient.connect('mongodb://localhost:27017/test')
    .then((db) => {
        const users = db.collection('users');

        for (const pendingUser of iterable(users.find())) {
            pendingUser.then((user) => {
                // handle user
            });
        }
    })
;
```

You can use [for-await](https://www.npmjs.com/package/for-await) to handle your items serially.

```js
const forAwait = require('for-await');
const { MongoClient } = require('mongodb');
const iterable = require('mongo-iterable-cursor');

MongoClient.connect('mongodb://localhost:27017/test')
    .then((db) => {
        const users = db.collection('users');
        return forAwait((user) => {
          // handle user
        }).of(iterable(users.find()));
    })
;
```

## With babel

Your setup needs to support async generator functions. If you are using Babel you'll need at least the following config.

```js
{
  "presets": ["es2017"], // or use Node.js v8 which includes async/await
  "plugins": [
    "transform-async-generator-functions"
  ]
}
```

```js
const iterable = require('mongo-iterable-cursor');
const { MongoClient } = require('mongodb');

(async () => {
  const db = await MongoClient.connect('mongodb://localhost:27017/test');
  const users = db.collection('users');

  for await (const user of iterable(users.find())) {
    //
  }
})();
```

## Register

Requiring `mongo-iterable-cursor/register` adds `[Symbol.asyncIterator]` to the [mongodb cursor](http://mongodb.github.io/node-mongodb-native/2.2/api/Cursor.html) `Cursor.prototype`.

```js
require('mongo-iterable-cursor/register');

const { MongoClient } = require('mongodb');

(async () => {
  const db = await MongoClient.connect('mongodb://localhost:27017/test');
  const users = db.collection('users');

  for await (const user of users.find()) {
    //
  }
})();
```
