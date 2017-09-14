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
        res.json(results);
      });
  })

  router.post("/", (req, res) => {
    const decoded = jwt.verify(req.body.user, 'CBFC');
    const user_id = decoded.user;
    const filter = req.body.filter.toLowerCase();
    let filter_id;
    if (filter) {
      knex('filters')
      .select('id')
      .where('name', '=', filter)
      .then((result) => {
        // Filter does not exist, add it to filters table and users_filters table
        if (result.length === 0) {
          knex('filters')
          .returning('id')
          .insert({name: filter})
          .then((id) => {
            filter_id = id[0];
            knex('users_filters')
            .insert({user_id: user_id, filter_id: filter_id})
            .then(() => res.status(200).send("Added filter for user"))
            .catch(() => res.status(400).send("Failed to add filter for user"));
          })
          .catch(() => res.status(400).send("Failed to add filter"));
        } else {
          filter_id = result[0];
          knex('users_filters')
          .insert({user_id: user_id, filter_id: filter_id})
          .then(() => res.status(200).send("Added filter for user"))
          .catch(() => res.status(400).send("User already has filter"));
        }
      })
      .catch(() => res.status(400).send("Error accessing filters"))
    } else {
      res.status(400).send("No filter in request");
    }
  })
  return router;
}