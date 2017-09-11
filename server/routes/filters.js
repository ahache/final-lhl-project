const express = require('express');
const router  = express.Router();
// const bodyParser = require("body-parser");

// router.use(bodyParser.urlencoded({extended: true}));

module.exports = (knex) => {


  router.get("/", (req, res) => {


  console.log("can has cookie?", req.session.user);
    console.log("can has local?", res.locals.user);

    knex('users_filters')
      .join('filters', 'filters.id', '=', 'users_filters.filter_id')
      .join('users', 'users.id', '=', 'users_filters.user_id')
      .select('filters.name')
      .where('users.id', '=', '4')
      .then((results) => {
        console.log('results', results);
        res.json(results);
      });
  })

  router.post("/", (req, res) => {
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