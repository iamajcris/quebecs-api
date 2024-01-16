const {
  create,
  update,
  retrieve,
  deletion,
} = require('../services').crud;

const { collection } = require('../db');

const createWidget = create(collection.Widget);

const updateWidget = update(collection.Widget);

const getWidget = retrieve(collection.Widget);

const deleteWidget = deletion(collection.Widget);

module.exports = {
  createWidget,
  updateWidget,
  getWidget,
  deleteWidget,
};
