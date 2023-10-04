const { db } = require('../db');
const _ = require('lodash');
const { Timestamp } = require('firebase-admin/firestore');
const { util } = require('../common');
const { formatDataValues } = require('../common/util');

function create(Type) {
  return (req, res, next) => {
    req.body.createdAt = util.getDateNow();
    req.body.updatedAt = util.getDateNow();

    return db.collection(Type)
      .add(formatDataValues(req.body))
      .then((rec) => {
        console.log('Added document with ID: ', rec.id);
        res.status(201).send(rec.id ? { id: rec.id } : '');
        return next();
      });
  };
}

function retrieve(Type) {
  return (req, res, next) => {
    const {
      id,
    } = req.params;

    return db.collection(Type)
      .doc(id)
      .get()
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
    req.body.updatedAt = util.getDateNow();

    return db.collection(Type)
      .doc(req.params.id)
      .update({...req.body})
      .then((rec) => {
        if (!rec) {
          return next(res.status(404));
        }

        res.status(200).send();
        return next();
      })
      .catch((err) => next(res.status(404).send(err)));
  };
}

function deletion(Type) {
  return (req, res, next) => {
    req.body.deletedAt = util.getDateNow();

    return db.collection(Type)
      .doc(req.params.id)
      .delete()
      .then(() => {
        res.status(200).send();
        return next();
      })
      .catch(next(res.status(404)));
  };
}

function list(Type) {
  return (req, res, next) => {
    const {
      p,
      ps,
      s,
      sd,
    } = req.query;

    const page = p || 0;
    const pageSize = ps || 20;
    const sortDir = (parseInt(sd, 10) || 1) < 1 ? 'desc' : 'asc';
    const sortBy = s || 'createdAt';

    return db.collection(Type)
      .offset(Number(page) * Number(pageSize))
      .limit(Number(pageSize))
      .orderBy(sortBy, sortDir)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          res.status(200).send([]);
          return next();
        }
        const recs = [];
        snapshot.forEach((doc) => {
          const data = util.formatSnapshot(doc.data());

          recs.push({
            id: doc.id,
            ...data,
          });
        });

        res.status(200).send(recs);
        return next();
      });
  };
}

function findByFieldValue(Type) {
  return (req, res, next) => {
    const {
      field,
      val,
    } = req.params;

    const {
      p,
      ps,
    } = req.query;

    const page = p || 0;
    const pageSize = ps || 20;

    return db.collection(Type)
      .offset(Number(page) * Number(pageSize))
      .limit(Number(pageSize))
      .orderBy(field)
      .startAt(val)
      .endAt(val + '\uf8ff')
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          res.status(200).send([]);
          return next();
        }
        const recs = [];
        snapshot.forEach((doc) => {
          console.log(doc.data());
          const data = util.formatSnapshot(doc.data());

          recs.push({
            id: doc.id,
            ...data,
          });
        });

        res.status(200).send(recs);
        return next();
      });
  };
}

function findByFieldQuery(Type) {
  return (req, res, next) => {
    let {
      equal,
      start,
      end,
    } = req.query;

    const {
      field,
    } = req.params;

    const isDateParam = (fd) => {
      const dateFields = ['createdAt', 'updatedAt', 'date'];
      return dateFields.some((dt) => _.toLower(fd).includes(dt));
    };

    let query = db.collection(Type).orderBy(field, 'desc');

    if (equal) {
      query = query.where(field, '==', equal);
    }

    if (start) {
      if (isDateParam(field)) {
        start = Timestamp.fromDate(new Date(new Date(start).setHours(0, 0, 0, 0)));
      }

      query = query.startAt(start);
    }

    if (end) {
      if (isDateParam(field)) {
        // set end of day to 23:59
        end = Timestamp.fromDate(new Date(new Date(end).setHours(23, 59, 59, 999)));
      }

      query = query.endAt(end);
    }

    return query
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          res.status(200).send([]);
          return next();
        }

        const recs = [];
        snapshot.forEach((doc) => {
          console.log(doc.data());
          const data = util.formatSnapshot(doc.data());

          recs.push({
            id: doc.id,
            ...data,
          });
        });

        res.status(200).send(recs);
        return next();
      });
  };
}

module.exports = {
  create,
  retrieve,
  update,
  deletion,
  list,
  findByFieldValue,
  findByFieldQuery,
};
