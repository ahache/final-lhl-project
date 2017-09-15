var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

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

return router;
}
