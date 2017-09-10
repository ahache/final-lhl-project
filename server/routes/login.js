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
    knex
      .select("*")
      .from("users")
      .where({email: req.body.email})
      .then((results) => {
        console.log(results);
        // res.status(200).send("Working");
        res.json(results);
      });
  })
  return router;
}