const {
  create,
  update,
  retrieve,
  deletion,
  list,
} = require('../services').crud;

const { collection } = require('../db');
const { findByFieldValue } = require('../services/crud');

const createMenu = create(collection.Menu);

const updateMenu = update(collection.Menu);

const getMenu = retrieve(collection.Menu);

const deleteMenu = deletion(collection.Menu);

const listMenus = list(collection.Menu);

const findMenusByFieldValue = findByFieldValue(collection.Menu);

module.exports = {
  createMenu,
  updateMenu,
  getMenu,
  deleteMenu,
  listMenus,
  findMenusByFieldValue,
};
