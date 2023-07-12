const {
  reference,
} = require('../services');

const generateRefs = (entity) =>
  async (req, res, next) => {
    const createOrderEntities = () => reference.create(entity)
      .then(async (ident) => {
        req.body.orderId = ident.serial;
        return Promise.resolve(req.body);
      });

    const createMenuEntities = () => reference.create(entity)
      .then(async (ident) => {
        req.body.menuId = ident.serial;
        return Promise.resolve(req.body);
      });

    const mapper = {
      order: createOrderEntities,
      menu: createMenuEntities,
    };

    if (mapper[entity]) {
      return mapper[entity]()
        .then(() => {
          return next();
        });
    }
    return next(new Error());
  };

module.exports = {
  generateRefs,
};
