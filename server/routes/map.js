const express = require('express');
const router  = express.Router();
const request = require('request');
const jwt = require('jsonwebtoken');

const API = process.env['GOOGLE_API_KEY'];
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

    const { user } = req.query;

    const decoded = jwt.verify(user, 'CBFC');
    const user_id = decoded.user;

    const destination = await getLastSearch(user_id);

    let mapResults = {};

    const latLong = await getGeocode(destination);

    const filters = await getFilters(user_id);

    for (filter of filters) {
      const places = await getPlaces(filter, latLong);
      mapResults[filter.name] = places;
    }
    const results = [destination, mapResults];

    res.json(results);
  });

  return router;

}
