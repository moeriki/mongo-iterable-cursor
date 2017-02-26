// modules

const { MongoClient } = require('mongodb');

const fixtures = require('./fixtures.json');

const iterable = require('../index');

// tests

describe('iterableCursor', () => {

  let db, col;

  beforeAll(async () => {
    db = await MongoClient.connect('mongodb://localhost:27017/test');
    col = db.collection('test');
    await col.insertMany(fixtures);
  });

  it('should iterate over cursor', async () => {
    const models = [];
    for await (const model of iterable(col.find())) {
      models.push(model);
    }
    expect(models).toMatchObject(fixtures);
  });

  afterAll(async () => {
    await col.remove({});
    await db.disconnect();
  });

});
