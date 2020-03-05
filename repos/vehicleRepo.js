const { MongoClient, ObjectID } = require('mongodb');

function vehicleRepo() {
  const url = 'mongodb+srv://mongoAdmin:Password_1@bus-3900-puppa.gcp.mongodb.net/test?retryWrites=true&w=majority';
  const dbName = 'parking';

  function get(query, limit) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);

        // .find() is just a cursor
        let items = db.collection('vehicles').find(query);

        if (limit > 0) {
          items = items.limit(limit);
        }

        resolve(await items.toArray());
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  function getById(id) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);
        const item = await db.collection('vehicles').findOne({ _id: ObjectID(id) });
        resolve(item);
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  function add(item) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);
        const addedItem = await db.collection('vehicles').insertOne(item);
        resolve(addedItem.ops[0]);
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  function update(id, newItem) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);

        const updatedItem = await db.collection('vehicles')
          .findOneAndReplace({ _id: ObjectID(id) }, newItem, { returnOriginal: false });

        resolve(updatedItem.value);
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  function loadData(data) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);

        results = await db.collection('vehicles').insertMany(data);
        resolve(results);
        // Must close the connection for Node to end process
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  function remove(id) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);
        const removed = await db.collection('newspapers').deleteOne({ _id: ObjectID(id) });

        resolve(removed.deletedCount === 1);
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  return { loadData, get, getById, add, update, remove }
}

module.exports = vehicleRepo();

function boilerPlate() {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(url);
    try {
      await client.connect();
      const db = client.db(dbName);
      resolve();
      client.close();
    } catch (error) {
      reject(error);
    }
  });
}
