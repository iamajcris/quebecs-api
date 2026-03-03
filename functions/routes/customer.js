const {
  create,
  update,
  deletion,
  list,
  findOne,
} = require('../services').crud;

const { collection } = require('../db');

const createCustomer = create(collection.Customer);

const updateCustomer = update(collection.Customer);

const deleteCustomer = deletion(collection.Customer);

const listCustomers = list(collection.Customer);

const findCustomerByContactId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await findOne(collection.Customer, { contactId: id });

    res.send(data);
    return next();
  } catch (ex) {
    console.error(ex, 'Find Customer By Contact Id Error');
    return next(ex);
  }
};

module.exports = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  listCustomers,
  findCustomerByContactId,
};
