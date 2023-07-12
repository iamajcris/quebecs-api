const {
  create,
  update,
  retrieve,
  deletion,
  list,
} = require('../services').crud;

const { collection } = require('../db');

const createMenu = create(collection.Menu);

const updateMenu = update(collection.Menu);

const getMenu = retrieve(collection.Menu);

const deleteMenu = deletion(collection.Menu);

const listMenus = list(collection.Menu);

module.exports = {
  createMenu,
  updateMenu,
  getMenu,
  deleteMenu,
  listMenus,
};
