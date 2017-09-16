const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (knex) => {
  router.post("/", (req, res) => {
    const { first, last, email, password } = req.body;
    knex
      .select("*")
      .from("users")
      .where({email: email})
      .then((result) => {
        if (result.length > 0) {
          res.status(400).send("Email is already registered");
          return;
        }
      });
    const hashedPassword = bcrypt.hashSync(password, 10);
    knex("users")
      .returning('id')
      .insert({
        first_name: first,
        last_name: last,
        email: email,
        password: hashedPassword,
        last_search: 'Vancouver'
      })
      .then((id) => {
        const token = jwt.sign({ user: id[0] }, 'CBFC');
        res.status(200).json(token);
      })
      .catch((error) => {
        console.error(error);
      });
  })
  return router;
}