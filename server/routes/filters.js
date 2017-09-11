const express = require('express');
const router  = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended: true}));

module.exports = (knex) => {
  router.get("/:id", (req, res) => {
    knex('users_filters')
      .join('filters', 'filters.id', '=', 'users_filters.filter_id')
      .join('users', 'users.id', '=', 'users_filters.user_id')
      .select('filters.name')
      .where('users.email', '=', 'hi@gmail.com')
      .then((results) => {
        res.json(results);
      });
  })

  router.post("/:id", (req, res) => {
    knex('filters')
    .select('*')
    .where('name', '=', req.body.filter)
    .then((result) => {
      if (result.length === 0) {
        knex('filters')
        .insert({name: req.body.filter})
        .then((results) => {
        res.status(200).send("Filter Added");
      })
      .catch((error) => {
        console.error(error);
      });
      }
    })
  })
  return router;
}