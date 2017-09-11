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
    knex
      .select("*")
      .from("users")
      .where({email: req.body.email})
      .then((results) => {
        if (results.length === 0) {
          res.status(400).send("User is not registered");
          return;
        }
        if (bcrypt.compareSync(req.body.password, results[0].password)) {
          req.session.user = req.body.email;
          res.json(results);
        } else {
          res.status(400).send("Wrong Password");
        }
      });
  })
  return router;
}