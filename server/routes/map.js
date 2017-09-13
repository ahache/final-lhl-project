const express = require('express');
const router  = express.Router();
const request = require('request');
const jwt = require('jsonwebtoken');

const API = process.env['GOOGLE_API_KEY'];
const mapsClient = require('@google/maps').createClient({
  key: API
});

module.exports = (knex) => {

  router.post("/", (req, res) => {

    const decoded = jwt.verify(req.body.user, 'CBFC');
    const user_id = decoded.user;
    const destination = req.body.destination;

    const URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${destination}&key=${API}`

    request(URL, function (err, response, body) {
      if (err || response.statusCode !== 200) {
        return res.sendStatus(500);
      } else {
        const latLong = JSON.parse(body).results[0].geometry.location;
        const latLongArr = [latLong.lat, latLong.lng];
        mapsClient.places({query: 'tacos', radius: 500, type: 'restaurant', location: latLongArr}, (err, response) => {
          if (!err) {
            console.log('response');
            console.log(response.json.results);
          } else {
            console.log(err);
          }
        });
      }
    });
  });

  return router;

}