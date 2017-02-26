require('babel-polyfill');

// modules

const { MongoClient } = require('mongodb');

const fixtures = require('./fixtures.json');

const deregister = require('../register');

// tests

describe('register', () => {

  let db, col;

  beforeAll(async () => {
    db = await MongoClient.connect('mongodb://localhost:27017/test');
    col = db.collection('test');
    await col.remove({});
    await col.insertMany(fixtures);
  });

  it('should iterate over cursor', async () => {
    const models = [];
    for await (const model of col.find()) {
      models.push(model);
    }
    expect(models).toMatchObject(fixtures);
  });

  afterAll(async () => {
    await col.remove({});
    await db.close();
    deregister();
  });

});
