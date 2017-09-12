const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');

module.exports = (knex) => {

  router.get("/", (req, res) => {

    const decoded = jwt.verify(req.query.user, 'CBFC');
    const user = decoded.user;
    console.log(decoded.user);

    knex('users_filters')
      .join('filters', 'filters.id', '=', 'users_filters.filter_id')
      .join('users', 'users.id', '=', 'users_filters.user_id')
      .select('filters.name')
      .where('users.id', '=', user)
      .then((results) => {
        console.log('results', results);
        res.json(results);
      });
  })

  router.post("/", (req, res) => {
    const filter = req.body.filter;
    if (filter){
      knex('filters')
      .select('*')
      .where('name', '=', filter)
      .then((result) => {
        if (result.length === 0) {
          knex('filters')
          .insert({name: filter})
          .then((results) => {
          res.status(200).send("Filter Added");
        })
        .catch((error) => {
          console.error(error);
        });
        }
      })
    }

  })
  return router;
}