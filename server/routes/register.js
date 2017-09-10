const express = require('express');
const router  = express.Router();
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({extended: true}));
router.use(cookieSession({
  secret: 'Wing got a wing'
}));

module.exports = (knex) => {
  router.post("/", (req, res) => {
    console.log(req.body);
    const { first, last, email, password } = req.body;
    knex
      .select("*")
      .from("users")
      .where({email: email})
      .then((result) => {
        if (result.length > 0) {
          // Not sure how to get react client to receive error
          res.status(400).send("Email is already registered");
          return;
        }
      });
    const hashedPassword = bcrypt.hashSync(password, 10);
    knex("users")
      .insert({
        first_name: first,
        last_name: last,
        email: email,
        password: hashedPassword
      })
      .then((results) => {
        res.status(200).send("Successfully Registered");
      })
      .catch((error) => {
        console.error(error);
      });
  })
  return router;
}