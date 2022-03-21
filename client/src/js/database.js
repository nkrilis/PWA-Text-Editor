import { openDB } from 'idb';

const initdb = async () =>
  openDB('nate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('nate')) {
        console.log('nate database already exists');
        return;
      }
      db.createObjectStore('nate', { keyPath: 'id', autoIncrement: true });
      console.log('nate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => 
{
  console.log('PUT to the database');
  const nateDB = await openDB('nate', 1);
  const tx = nateDB.transaction('nate', 'readwrite');
  const store = tx.objectStore('nate');
  const request = store.put({ nate: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => 
{
  console.log('GET all from the database');
  const nateDB = await openDB('nate', 1);
  const tx = nateDB.transaction('nate', 'readonly');
  const store = tx.objectStore('nate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
};

initdb();