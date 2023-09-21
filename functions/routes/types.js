const {
  create,
  deletion,
  retrieveByFieldValue,
} = require('../services').crud;

const { collection } = require('../db');

const createTypes = create(collection.Types);

const getTypes = retrieveByFieldValue(collection.Types);

const deleteTypes = deletion(collection.Types);

module.exports = {
  createTypes,
  getTypes,
  deleteTypes,
};
