
const {
  crud,
  menu: menuService,
} = require('../services');

const {
  create,
  update,
  retrieve,
  deletion,
  list,
  findByFieldValue
  } = crud;

const { collection } = require('../db');

const createMenu = create(collection.Menu);

const updateMenu = update(collection.Menu);

const getMenu = retrieve(collection.Menu);

const deleteMenu = deletion(collection.Menu);

const listMenus = list(collection.Menu);

const findMenusByFieldValue = findByFieldValue(collection.Menu);

const getLatestMenu = async (req, res, next) => {
  try {
    const data = await menuService.getLatestMenu();
    
    res.send(data);
    return next();
  } catch (ex) {
    console.error(ex, 'Get Latest Menu Error');
    return next(ex);
  } 
}

module.exports = {
  createMenu,
  updateMenu,
  getMenu,
  deleteMenu,
  listMenus,
  findMenusByFieldValue,
  getLatestMenu,
};
