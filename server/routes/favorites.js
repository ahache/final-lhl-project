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

  router.post("/add", (req, res) => {
    const decoded = jwt.verify(req.body.user, 'CBFC');
    const user_id = decoded.user;
    knex('favorites')
    .select('id')
    .where('place_id', '=', req.body.place_id)
    .then((result) => {
      if (result.length === 0) {
        knex('favorites')
        .returning('id')
        .insert({
          place_id: req.body.place_id,
          address: req.body.address,
          name: req.body.name,
          price_level: req.body.price_level,
          rating: req.body.rating,
          query: req.body.query,
          latitude: req.body.latitude,
          longitude: req.body.longitude
        })
        .then((id) => {
          favorite_id = id[0];
          knex('users_favorites')
          .insert({user_id: user_id, favorite_id: favorite_id})
          .then(() => res.status(200).send("Added favorite for user"))
          .catch(() => res.status(400).send("Failed to add fav for user"));
        })
        .catch(() => res.status(400).send("Failed to add fav"))
        } else {
          favorite_id = result[0];
          knex('users_favorites')
          .insert({user_id: user_id, favorite_id: favorite_id})
          .then(() => res.status(200).send("Added favorite for user"))
          .catch(() => res.status(400).send("User already has favorite"));
        }
      })
      .catch(() => res.status(400).send("Error accessing favorites"))
  })

  router.post("/remove", (req, res) => {
    console.log("Success!");
    res.json({works: true});
  });

  // router.post("/", (req, res) => {
  //   const decoded = jwt.verify(req.body.user, 'CBFC');
  //   const user_id = decoded.user;
  //   const favorite_place = req.body.location;
  //   let filter_id;
  //   if (filter) {
  //     knex('filters')
  //     .select('id')
  //     .where('name', '=', filter)
  //     .then((result) => {
  //       // Filter does not exist, add it to filters table and users_filters table
  //       if (result.length === 0) {
  //         knex('filters')
  //         .returning('id')
  //         .insert({name: filter})
  //         .then((id) => {
  //           filter_id = id[0];
  //           knex('users_filters')
  //           .insert({user_id: user_id, filter_id: filter_id})
  //           .then(() => res.status(200).send("Added filter for user"))
  //           .catch(() => res.status(400).send("Failed to add filter for user"));
  //         })
  //         .catch(() => res.status(400).send("Failed to add filter"));
  //       } else {
  //         filter_id = result[0];
  //         knex('users_filters')
  //         .insert({user_id: user_id, filter_id: filter_id})
  //         .then(() => res.status(200).send("Added filter for user"))
  //         .catch(() => res.status(400).send("User already has filter"));
  //       }
  //     })
  //     .catch(() => res.status(400).send("Error accessing filters"))
  //   } else {
  //     res.status(400).send("No filter in request");
  //   }
  // })
  return router;
}