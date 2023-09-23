const { collection } = require('../db');
const common = require('./common');

function preloadOrder() {
  return async function _preloadOrder(req, res, next) {
    return common.preloadEntity(collection.Order, 'order', req, res, next);
  };
}

function preloadTypes() {
  return async function _preloadOrder(req, res, next) {
    return common.preloadEntity(collection.Types, 'types', req, res, next);
  };
}

module.exports = {
  preloadOrder,
  preloadTypes,
};
