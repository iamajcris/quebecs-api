const functions = require('firebase-functions');
const packageJson = require('./package.json');

const express = require('express');
const cors = require('cors');
const {
  notFound,
  errorHandlerMiddleware,
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

app.put('/order', routes.order.createOrder);


// app.get('/order/:id', (req, res) => {
//   ( async () => {
//     try {
//       const {
//         id,
//       } = req.params;

//       const reqDoc = db.collection('orders').doc(id);
//       const order = await reqDoc.get();
//       const response = order.data();

//       return res.status(200).send(response);
//     } catch (error) {
//       console.log(error);
//       return res.status(500).send('fail');
//     }
//   })();
// });

// app.get('/orders/getAll', (req, res) => {
//   ( async () => {
//     try {
//       const query = db.collection('orders');
//       const response = [];

//       await query.get().then((data) => {
//         const docs = data.docs;

//         docs.map((doc) => {
//           const data = {
//             name: doc.data().name,
//           };

//           response.push(data);
//         });
//       });

//       return res.status(200).send(response);
//     } catch (error) {
//       console.log(error);
//       return res.status(500).send('fail');
//     }
//   })();
// });

// app.post('/order/:id', (req, res) => {
//   ( async () => {
//     try {
//       const {
//         id,
//       } = req.params;

//       const reqDoc = db.collection('orders').doc(id);
//       await reqDoc.update({...req.body});

//       return res.status(200).send('success');
//     } catch (error) {
//       console.log(error);
//       return res.status(500).send('fail');
//     }
//   })();
// });

// app.delete('/order/:id', (req, res) => {
//   ( async () => {
//     try {
//       const {
//         id,
//       } = req.params;

//       const reqDoc = db.collection('orders').doc(id);
//       await reqDoc.delete();

//       return res.status(200).send('success');
//     } catch (error) {
//       console.log(error);
//       return res.status(500).send('fail');
//     }
//   })();
// });
app.use(notFound);
app.use(errorHandlerMiddleware);

exports.app = functions.https.onRequest(app);
