const { db } = require('../db');

function create(Type) {
  return (req, res, next) => {
    req.body.created = {
      when: new Date(),
      // TODO: save user
      //user: getUserDetails(req, next),
    };

    return db.collection(Type).add(req.body)
      .then((rec) => {
        console.log('Added document with ID: ', rec.id);
        res.status(201).send(rec.id ? rec.id : '');
        return next();
      });
  };
}

function retrieve(Type) {
  return (req, res, next) => {
    const {
      id,
    } = req.params;

    return db.collection(Type).doc(id).get()
      .then((rec) => {
        if (!rec.exists) {
          return next(res.status(404));
        }
        res.status(200).send(rec.data());
        return next();
      });
  };
}

function update(Type) {
  return (req, res, next) => {
    req.body.updated = {
      when: new Date(),
      // TODO: save user
      //user: getUserDetails(req, next),
    };

    return db.collection(Type).doc(req.params.id)
      .update({...req.body})
      .then((rec) => {
        if (!rec) {
          return next(res.status(404));
        }

        res.status(200).send();
        return next();
      })
      .catch(next(res.status(404)));
  };
}

function deletion(Type) {
  return (req, res, next) => {
    req.body.updated = {
      when: new Date(),
      // TODO: save user
      //user: getUserDetails(req, next),
    };

    return db.collection(Type).doc(req.params.id)
      .delete({...req.body})
      .then((rec) => {
        res.status(200).send();
        return next();
      })
      .catch(next(res.status(404)));
  };
}

module.exports = {
  create,
  retrieve,
  update,
  deletion,
};
