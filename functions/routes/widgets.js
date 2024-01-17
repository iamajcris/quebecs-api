const {
  crud,
  widget,
} = require('../services')

const {
  create,
  update,
  retrieve,
  deletion,
} = crud;

const { collection } = require('../db');

const createWidget = create(collection.Widget);

const updateWidget = update(collection.Widget);

const getWidget = retrieve(collection.Widget);

const deleteWidget = deletion(collection.Widget);

async function getBrandWidget(req, res, next) {
  try {
    const {
      brand,
      slug
    } = req.params;

    const data = await widget.getBrandWidget(brand, slug);

    res.send(data);
    return next();
  } catch (ex) {
    console.error(ex, 'Get Brand Widget Error');
    return next(ex);
  }
}

module.exports = {
  createWidget,
  updateWidget,
  getWidget,
  deleteWidget,
  getBrandWidget
};
