const {
  create,
  update,
  retrieve,
  deletion,
} = require('../services').crud;

const { collection } = require('../db');

const createOrder = create(collection.Order);

const updateOrder = update(collection.Order);

const getOrder = retrieve(collection.Order);

const deleteOrder = deletion(collection.Order);

module.exports = {
  createOrder,
  updateOrder,
  getOrder,
  deleteOrder,
};
