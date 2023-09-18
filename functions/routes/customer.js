const {
  create,
  update,
  deletion,
} = require('../services').crud;

const { collection } = require('../db');

const createCustomer = create(collection.Customer);

const updateCustomer = update(collection.Customer);

const deleteCustomer = deletion(collection.Customer);

module.exports = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
