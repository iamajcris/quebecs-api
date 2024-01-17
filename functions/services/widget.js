const _ = require('lodash');
const { collection } = require('../db');
const { util } = require('../common');
const { findOne } = require('./crud');

async function getBrandWidget(brand, slug) {
  return findOne(collection.Widget, { brand, slug });
}

module.exports = {
  getBrandWidget,
};
