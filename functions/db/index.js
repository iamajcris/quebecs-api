const { connectDB } = require('./connection');
const collection = require('./collection');

module.exports = {
  db: connectDB(),
  collection,
};
