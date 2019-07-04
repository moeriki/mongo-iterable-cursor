require('babel-polyfill');

const { MongoClient } = require('mongodb');

const deregister = require('../register');

const fixtures = require('./fixtures.json');

// tests

describe('register', () => {
  let db;
  let col;

  beforeAll(async () => {
    db = await MongoClient.connect('mongodb://localhost:27017/test-register');
    col = db.collection('test');
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
