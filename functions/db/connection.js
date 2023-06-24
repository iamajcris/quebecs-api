const admin = require('firebase-admin');
const serviceAccount = require('../config/service-account-key.json');
const { database } = require('../config/default.json');

function connectDB() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: database.url,
  });
  return admin.firestore();
}

module.exports = {
  db: connectDB(),
};
