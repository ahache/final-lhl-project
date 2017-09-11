const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');


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
          req.session.user = results[0].id;
          res.json(results);
        } else {
          res.status(400).send("Wrong Password");
        }
      });
  })
  return router;
}