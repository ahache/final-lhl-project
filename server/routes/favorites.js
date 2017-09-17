const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');

module.exports = (knex) => {

  router.get("/", (req, res) => {
    const decoded = jwt.verify(req.query.user, 'CBFC');
    const user = decoded.user;
    const location = req.query.place_id;
    knex
      .from('users_favorites')
      .join('favorites', 'favorites.id', '=', 'users_favorites.favorite_id')
      .countDistinct('users_favorites.user_id')
      .where('users_favorites.user_id', '=', user)
      .andWhere('favorites.place_id', '=', location)
      .then((results) => {
        res.json(results);
      });
  })

  router.get("/all", (req, res) => {
    const decoded = jwt.verify(req.query.user, 'CBFC');
    const user = decoded.user;
    knex
      .select('*')
      .from('users_favorites')
      .join('favorites', 'favorites.id', '=', 'users_favorites.favorite_id')
      .where('users_favorites.user_id', '=', user)
      .orderBy('query', 'asc')
      .then((results) => {
        console.log(results);
        res.json(results)
      })
  })

  router.post("/add", (req, res) => {
    const decoded = jwt.verify(req.body.user, 'CBFC');
    const user_id = Number(decoded.user);
    const place_id = req.body.place_id;
    const price_level = req.body.price_level || -1
    const rating = req.body.rating || -1.0
    knex('favorites')
    .select('id')
    .where('place_id', place_id)
    .then((result) => {
      if (result.length === 0) {
        knex('favorites')
        .returning('id')
        .insert({
          place_id: req.body.place_id,
          address: req.body.address,
          name: req.body.name,
          price_level: price_level,
          rating: rating,
          latitude: req.body.latitude,
          longitude: req.body.longitude
        })
        .then((id) => {
          favorite_id = id[0];
          knex('users_favorites')
          .insert({user_id: user_id, favorite_id: favorite_id, query: req.body.query })
          .then(() => res.status(200).send("Added favorite for user"))
          .catch(() => res.status(400).send("Failed to add fav for user"));
        })
        } else {
        knex('users_favorites')
        .join('favorites', 'favorites.id', '=', 'users_favorites.favorite_id')
        .where('users_favorites.user_id', user_id)
        .andWhere('favorites.place_id', place_id)
        .select('favorites.id')
        .then((result) => {
          if (result.length === 0) {
             knex('favorites')
             .select('id')
             .where('place_id', place_id)
             .then((result) => {
                favorite_id = result[0].id
                knex('users_favorites')
                  .insert({user_id: user_id, favorite_id: favorite_id, query: req.body.query })
                  .then(() => res.status(200).send("Added favorite for user"))
                  .catch(() => res.status(400).send("Failed to add fav for user"));
          })
          }
        })
      }
    })
  })


  router.delete("/remove/", (req, res) => {
    const decoded = jwt.verify(req.query.user, 'CBFC');
    const user_id = Number(decoded.user);
    knex('users_favorites')
      .where('user_id', user_id)
      .whereIn('favorite_id', function() {
      this.select('id')
          .from('favorites')
          .where('place_id', req.query.place_id);
      })
      .del()
      .then(() => res.status(200).send("Added favorite for user"))
      .catch(() => res.status(400).send("Failed to add fav for user"));
  });

  return router;
}