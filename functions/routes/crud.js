const { db } = require('../db/connection');

function create(Type) {
  return (req, res, next) => {
    req.body.created = {
      when: new Date(),
      // TODO: save user
      //user: getUserDetails(req, next),
    };

    return db.collection(Type).add(req.body)
      .then((o) => {
        res.send(201, (!o.id) ? o.id : '');
        return next();
      });
  };
}

function retrieve(Type) {

}

function update(Type) {

}

function deletion(Type) {

}

module.exports = {
  create,
  retrieve,
  update,
  deletion,
};
