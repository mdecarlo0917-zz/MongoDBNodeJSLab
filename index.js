const MongoClient = require('mongodb').MongoClient;

const vehicleRepo = require('./repos/vehicleRepo');
const data = require('./vehicles.json');

const url = '<ENTER_URL_HERE>';
const dbName = 'parking';

async function main() {
  const client = new MongoClient(url);
  await client.connect();

  try {
    
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}

main();