const functions = require('firebase-functions');
const packageJson = require('./package.json');

const express = require('express');
const cors = require('cors');

const {
  generateRefs,
  preloadOrder,
} = require('./middleware');

const routes = require('./routes');

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

app.get('/orders/:id', preloadOrder(), routes.order.retrieveOrder);
app.get('/orders', routes.order.listOrders);

exports.app = functions.https.onRequest(app);
