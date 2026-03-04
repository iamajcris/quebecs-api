const { db } = require('../db');
const { collection } = require('../db');
const { util } = require('../common');

async function getLatestMenu() {
  try {
    let query = db.collection(collection.Menu)
      .orderBy('createdAt', 'desc')
      .limit(1);

    const snapshot = await query.get();

    if (snapshot.empty) {
      throw new Error('No latest menu found');
    }

    const doc = snapshot.docs[0];
    return util.formatSnapshot(doc.data());
  } catch (ex) {
    console.error(ex, 'Get Latest Menu Error');
    throw ex;
  }
}

module.exports = {
  getLatestMenu,
};
