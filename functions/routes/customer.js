const {
  create,
  update,
  deletion,
  list,
} = require('../services').crud;

const { collection } = require('../db');

const createCustomer = create(collection.Customer);

const updateCustomer = update(collection.Customer);

const deleteCustomer = deletion(collection.Customer);

const listCustomers = list(collection.Customer);

module.exports = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  listCustomers,
};
