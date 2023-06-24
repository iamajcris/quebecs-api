const {
  create,
  update,
} = require('./crud');

const collection = 'orders';

const createOrder = create(collection);

module.exports = {
  createOrder,
};
