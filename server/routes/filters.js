const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');

module.exports = (knex) => {

  router.get("/", (req, res) => {

    const decoded = jwt.verify(req.query.user, 'CBFC');
    const user = decoded.user;

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
    const decoded = jwt.verify(req.body.user, 'CBFC');
    const user = decoded.user;
    const filter = req.body.filter;
    let filter_id;
    if (filter){
      knex('filters')
      .select('id')
      .where('name', '=', filter)
      .then((result) => {
        if (result.length === 0) {
          knex('filters')
          .returning('id')
          .insert({name: filter})
          .then((id) => {
            console.log(id);
            filter_id = id;
          })
          .catch((error) => {
            console.error(error);
          });
        } else {
          filter_id = result[0];
        }
        knex('users_filters')
        .insert({user_id: Number(user), filter_id: filter_id})
        .then(() => res.status(200).send("successfully"));
      })
    }

  })
  return router;
}