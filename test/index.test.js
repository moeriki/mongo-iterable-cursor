const { MongoClient } = require('mongodb');

const iterable = require('../index');

const fixtures = require('./fixtures.json');

// tests

describe('iterableCursor', () => {

  let db, col;

  beforeAll(async () => {
    db = await MongoClient.connect('mongodb://localhost:27017/test-index');
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
    await db.close();
  });

});
