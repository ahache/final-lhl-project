const express = require('express');
const router  = express.Router();
const request = require('request');

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

  const getPlacesPromise = (filter, latLong, radius) => {
    return new Promise((resolve, reject) => {
      mapsClient.places({query: filter.name, location: latLong, radius: Number(radius)}, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.json.results);
        }
      });
    });
  }

  async function getPlaces(filter, latLong, radius) {
    const places = await getPlacesPromise(filter, latLong, radius);
    return places;
  }

  router.post("/", async (req, res) => {

    const { destination, radius, user } = req.body;
    const decoded = jwt.verify(user, 'CBFC');
    const user_id = decoded.user;
    let mapResults = {};

    const latLong = await getGeocode(destination);

    const filters = await getFilters(user_id);

    for (filter of filters) {
      const places = await getPlaces(filter, latLong, radius);
      mapResults[filter.name] = places;
    }

    res.json(mapResults);
  });
});

let array = [];
for (result in results) {
  mapsClient.places({...}, (err, res) => {
    array.append(res.json.results[0])
  })
}

module.exports = router;
