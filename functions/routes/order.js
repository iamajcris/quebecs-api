const _ = require('lodash');
const {
  create,
  update,
  retrieve,
  deletion,
  list,
  findByFieldValue,
} = require('../services').crud;

const { collection } = require('../db');

const createOrder = create(collection.Order);

const updateOrder = update(collection.Order);

const getOrder = retrieve(collection.Order);

const deleteOrder = deletion(collection.Order);

function retrieveOrder(req, res, next) {
  res.status(200).send(_.head(req.preload.order));
  next();
}

const listOrders = list(collection.Order);

const findOrdersByFieldValue = findByFieldValue(collection.Order);

module.exports = {
  createOrder,
  updateOrder,
  getOrder,
  deleteOrder,
  retrieveOrder,
  listOrders,
  findOrdersByFieldValue,
};
