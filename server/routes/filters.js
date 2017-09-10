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
  return router;
}