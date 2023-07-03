const { db } = require('../db');
const _ = require('lodash');

const queryByPath = (path, id) => {
  switch (path) {
  case 'order':
    return ['orderId', '==', id];
  case 'customer':
    return ['customerId', '==', id];
  default:
    return null;
  }
};

async function preloadEntity(Type, path, req, res, next) {
  try {
    const { id } = req.params;

    const query = queryByPath(path, id);

    if (!query) {
      return next(res.status(400));
    }

    const snapshot = await db.collection(Type).where(...query).get();
    const data = [];
    snapshot.forEach((doc) => {
      data.push({
        _id: doc.id,
        ...doc.data(),
      });
    });

    req.preload = {};
    req.preload[path] = data;

    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  preloadEntity,
};
