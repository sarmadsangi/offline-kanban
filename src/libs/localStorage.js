import PouchDB from 'pouchdb';

// set revs to 2 to save space (since out data is not super critical here).
const db = new PouchDB('offline-kanban', {revs_limit: 2});

// add new doc or update if it exists
export function createOrUpdate(newDoc) {
  db
  .get(newDoc._id)
  .then((doc) => {
    return create({
      ...newDoc,
      _rev: doc._rev,
      updated_at: Date.now(),
    });
  })
  .then(response => console.log(response))
  .catch(err => {
    console.log(err);
    return create(newDoc);
  });
}

export function create(doc) {
  return db.put(doc);
}

export function get(doc) {
  db
  .get(doc._id)
  .then(doc => console.log(doc))
  .catch(err => console.log(err));
}

// getAll
// TODO: descending is not really working out well, in future will use .query
// to do proper position sorting of lists.
export function getAll(cb) {
  db
  .allDocs({
    include_docs: true,
    descending: true,
  })
  .then(response => cb(response.rows.map(row => row.doc)))
  .catch(err => console.log(err));
}
