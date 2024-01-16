const _ = require('lodash');
const {
  create,
  deletion,
  update,
} = require('../services').crud;

const { collection } = require('../db');

const createTypes = create(collection.Types);

function getTypes(req, res, next) {
  const data = _.head(req.preload.types);

  res.status(200).send(data.values);
  next();
}

const deleteTypes = deletion(collection.Types);

const updateTypes = update(collection.Types);

module.exports = {
  createTypes,
  getTypes,
  deleteTypes,
  updateTypes,
};
