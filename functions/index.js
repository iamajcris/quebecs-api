const functions = require('firebase-functions');
const packageJson = require('./package.json');

const express = require('express');
const cors = require('cors');

const {
  generateRefs,
  preloadOrder,
} = require('./middleware');

const routes = require('./routes');
const { preloadTypes } = require('./middleware/order');

const app = express();
app.use(cors({ origin: true }));

app.get('/ver', (req, res, next) => {
  req.ext = {};

  res.send({
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
  });

  return next();
});

app.post('/order', generateRefs('order'), routes.order.createOrder);
app.put('/order/:id', routes.order.updateOrder);
app.get('/order/:id', routes.order.getOrder);
app.delete('/order/:id', routes.order.deleteOrder);
app.get('/order/:id', preloadOrder(), routes.order.retrieveOrder);
app.get('/orders', routes.order.listOrders);
app.get('/orders/:field/:val', routes.order.findOrdersByFieldValue);
app.get('/orders/:field', routes.order.findOrdersByFieldQuery);

app.post('/menu', generateRefs('menu'), routes.menu.createMenu);
app.put('/menu/:id', routes.menu.updateMenu);
app.get('/menu/:id', routes.menu.getMenu);
app.delete('/menu/:id', routes.menu.deleteMenu);
app.get('/menus', routes.menu.listMenus);

app.post('/customer', generateRefs('customer'), routes.customer.createCustomer);
app.put('/customer/:id', routes.customer.updateCustomer);
app.delete('/customer/:id', routes.customer.deleteCustomer);
app.get('/customers', routes.customer.listCustomers);

app.post('/types', routes.types.createTypes);
app.get('/types/:id', preloadTypes(), routes.types.getTypes);
app.delete('/customer/:id', routes.types.deleteTypes);

exports.app = functions.https.onRequest(app);
