const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (knex) => {
  router.post("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .where({email: req.body.email})
      .then((results) => {
        if (results.length === 0) {
          res.status(400).send("User is not registered");
          // res.status(400).json({error: "User is not registered"});
          return;
        }
        if (bcrypt.compareSync(req.body.password, results[0].password)) {
          const token = jwt.sign({ user: results[0].id }, 'CBFC');
          res.status(200).json(token);
        } else {
          res.status(400).send("Wrong Password");
        }
      }).catch((error) => {
        res.send(error.responseText);
      });
  })
  return router;
}
