const express = require('express');
const router  = express.Router();
const request = require('request');
const jwt = require('jsonwebtoken');

const API = process.env['API_KEY'];
const mapsClient = require('@google/maps').createClient({
  key: API
});

module.exports = (knex) => {

  const getGeocodePromise = (destination) => {
    return new Promise((resolve, reject) => {
      mapsClient.geocode({address: destination}, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const latLong = response.json.results[0].geometry.location;
          const latLongArr = [latLong.lat, latLong.lng];
          resolve(latLongArr);
        }
      });
    });
  }

  async function getGeocode(destination) {
    const latLong = await getGeocodePromise(destination);
    return latLong;
  }

  const getFiltersPromise = (user_id) => {
    return new Promise((resolve, reject) => {
      knex('users_filters')
      .join('filters', 'filters.id', '=', 'users_filters.filter_id')
      .join('users', 'users.id', '=', 'users_filters.user_id')
      .select('filters.name')
      .where('users.id', '=', user_id)
      .then((filters) => {
        resolve(filters);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }

  async function getFilters(user_id) {
    const filters = await getFiltersPromise(user_id);
    return filters;
  }

  // async function getFavoritePromise(user_id) {
  //   knex('users')
  //   .select('favorite_search')
  //   .where('id', user_id)
  //   .then((result) => {
  //     favorite_id = result[0];
  //     knex('favorites')
  //     .returning('id')
  //     .insert({
  //         place_id: req.body.place_id,
  //         address: req.body.address,
  //         name: req.body.name,
  //         price_level: price_level,
  //         rating: rating,
  //         latitude: req.body.latitude,
  //         longitude: req.body.longitude
  //       })

  //   knex('users_favorites')
  //   .join('favorites', 'favorites.id', '=', 'users_favorites.favorite_id')
  //   .join('users', 'users.id', '=', 'users_favorites.user_id')
  //   .where('users.id', '=', user_id)
  //   .andWhere('favorites.place_id', '=', 'users.favorite_search')
  //   .then((result) => {
  //     return result;
  //   })
  //   .catch(() => res.status(400).send("Failed to add fav for user"));
  // }

  // async function getFavorite(user_id) {
  //   const favorite = await getFavoritePromise(user_id);
  //   return favorite;
  // }

  const getPlacesPromise = (filter, latLong) => {
    return new Promise((resolve, reject) => {
      mapsClient.places({query: filter.name, location: latLong}, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.json.results);
        }
      });
    });
  }

  async function getPlaces(filter, latLong) {
    const places = await getPlacesPromise(filter, latLong);
    return places;
  }

  const insertIntoLastSearchPromise = (destination, user_id) => {
    return new Promise((resolve, reject) => {
      knex('users')
        .update('last_search', destination)
        .where('id', user_id)
        .then(() => {
          resolve('1');
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async function insertIntoLastSearch(destination, user_id) {
    const result = await insertIntoLastSearchPromise(destination, user_id);
    return result;
  }

  const getLastSearchPromise = (user_id) => {
    return new Promise((resolve, reject) => {
      knex('users')
        .select('last_search')
        .where('id', user_id)
        .then((destination) => {
          resolve(destination);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async function getLastSearch(user_id) {
    const destination = await getLastSearchPromise(user_id);
    return destination;
  }

  router.post("/", async (req, res) => {

    const { destination, user } = req.body;

    const decoded = jwt.verify(user, 'CBFC');
    const user_id = decoded.user;

    const result = await insertIntoLastSearch(destination, user_id);

    if (result==='1') {
      res.send(result);
    }
  });

  router.get("/", async (req, res) => {
    const user = req.query.user;
    const decoded = jwt.verify(user, 'CBFC');
    const user_id = decoded.user;

    const getSearch = await getLastSearch(user_id);
    const destination = getSearch[0].last_search;
    let mapResults = {};

    const latLong = await getGeocode(destination);

    const filters = await getFilters(user_id);

    for (filter of filters) {
      const places = await getPlaces(filter, latLong);
      mapResults[filter.name] = places;
    }

    //// Jeremy thought this was faster.  He seems to have been wrong.  Who knew?
    // var placesPromises = filters.map(f => getPlacesPromise(f, latLong));
    // var promiseOfPlaceArrays = Promise.all(placesPromises);
    // promiseOfPlaceArrays
    // .then(placeArrayArray => {
    //   for (var idx in filters) {
    //     mapResults[filters[idx].name] = placeArrayArray[idx];
    //   }
    //   console.log(mapResults);
    //   const results = [latLong, destination, mapResults];
    //   res.json(results);
    // });

    const results = [latLong, destination, mapResults];
    res.json(results);
  });

  router.get("/favorites", async (req, res) => {
    const user = req.query.user;
    const decoded = jwt.verify(user, 'CBFC');
    const user_id = decoded.user;
    knex('users')
    .select('favorite_search')
    .where('id', user_id)
    .then((result) => {
      favorite_id = result[0].favorite_search;
      knex('favorites')
      .join('users_favorites', 'users_favorites.favorite_id', '=', 'favorites.id')
      .where('place_id', favorite_id)
      .then((result) => {
        res.json(result);
      })
        .catch(() => res.status(400).send("Failed to add fav for user"));
    })
  });

  router.get("/last", async (req, res) => {
    const user = req.query.user;
    const decoded = jwt.verify(user, 'CBFC');
    const user_id = decoded.user;

    const last_search = await getLastSearch(user_id);
    res.json(last_search);
  });

  return router;

}
