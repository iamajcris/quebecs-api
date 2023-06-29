const _ = require('lodash');
const { db, collection } = require('../db');
const { FieldValue } = require('firebase-admin/firestore');

const transform = {
  order: (serial) => `Q1${_.padStart(serial, 6, '0')}`,
  customer: (serial) => `1${_.padStart(serial, 6, '0')}`,
};

const increment = (serial) => _.parseInt(serial) + 1;

async function create(Type) {
  const ref = db.collection(collection.Reference).doc(Type);
  const res = await ref.get();

  if (res.exists) {
    const { serial } = res.data();

    await ref.update({ serial: FieldValue.increment(1) });

    const nextSerial = transform[Type](increment(serial));

    return Promise.resolve({ serial: nextSerial });
  }
}

module.exports = {
  create,
};
