var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = (knex) => {

  router.get("/",  async (req, res) => {
    const decoded = jwt.verify(req.query.user, 'CBFC');
    const user_id = decoded.user;

    knex('users').select(['first_name', 'last_name', 'email']).where('id', user_id).then((results) => {
      res.json(results);
    }).
    catch((error) => {
      res.send(error);
    })
  });

  router.put("/", async (req, res) => {
    const decode = jwt.verify(req.body.user, 'CBFC');
    const user_id = decode.user;

    knex('users').select('*').where('id', user_id).then((user_info) => {
      knex('users').where('id', user_id)
      .update({first_name: req.body.first_name || user_info[0].first_name,
        last_name: req.body.last_name || user_info[0].last_name,
        email: req.body.email || user_info[0].email,
        password: bcrypt.hashSync(req.body.password, 10) || user_info[0].password}).
        returning("*")
      .then((results) => {
        res.json(results);
      });
    });
  });

  return router;
}
