const _ = require('lodash');
const {
  create,
  deletion,
} = require('../services').crud;

const { collection } = require('../db');

const createTypes = create(collection.Types);

function getTypes(req, res, next) {
  res.status(200).send(_.head(req.preload.types));
  next();
}

const deleteTypes = deletion(collection.Types);

module.exports = {
  createTypes,
  getTypes,
  deleteTypes,
};
