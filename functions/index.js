const functions = require("firebase-functions");

const admin = require("firebase-admin");
const serviceAccount = require("./config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quebecs-system-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const express = require("express");
const cors = require("cors");
const db = admin.firestore();

const app = express();
app.use(cors({origin: true}));

app.get("/", (req, res) => {
  return res.status(200).send("hello");
});

app.post("/order/create", (req, res) => {
  ( async () => {
    try {
      await db.collection("orders").doc(`/${Date.now()}`).create({
        id: Date.now(),
        name: req.body.name,
      });

      return res.status(200).send("success");
    } catch (error) {
      console.log(error);
      return res.status(500).send("fail");
    }
  })();
});

app.get("/order/:id", (req, res) => {
  ( async () => {
    try {
      const {
        id,
      } = req.params;

      const reqDoc = db.collection("orders").doc(id);
      const order = await reqDoc.get();
      const response = order.data();

      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send("fail");
    }
  })();
});

app.get("/orders/getAll", (req, res) => {
  ( async () => {
    try {
      const query = db.collection("orders");
      const response = [];

      await query.get().then((data) => {
        const docs = data.docs;

        docs.map((doc) => {
          const data = {
            name: doc.data().name,
          };

          response.push(data);
        });
      });

      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send("fail");
    }
  })();
});

app.post("/order/:id", (req, res) => {
  ( async () => {
    try {
      const {
        id,
      } = req.params;

      const reqDoc = db.collection("orders").doc(id);
      await reqDoc.update({...req.body});

      return res.status(200).send("success");
    } catch (error) {
      console.log(error);
      return res.status(500).send("fail");
    }
  })();
});

app.delete("/order/:id", (req, res) => {
  ( async () => {
    try {
      const {
        id,
      } = req.params;

      const reqDoc = db.collection("orders").doc(id);
      await reqDoc.delete();

      return res.status(200).send("success");
    } catch (error) {
      console.log(error);
      return res.status(500).send("fail");
    }
  })();
});

exports.app = functions.https.onRequest(app);
