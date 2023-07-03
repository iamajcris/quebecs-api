const { collection } = require('../db');
const common = require('./common');

function preloadOrder() {
  return async function _preloadOrder(req, res, next) {
    return common.preloadEntity(collection.Order, 'order', req, res, next);
  };
}

module.exports = {
  preloadOrder,
};
