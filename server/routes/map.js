const express = require('express');
const router  = express.Router();
const request = require('request');

router.post("/", (req, res) => {
  console.log("in map");
  const destination = req.body.destination;
  const URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${destination}&key=AIzaSyBR9a87huIRF93xhp5VcW57S7mBjfFGEKk`
  request(URL, function (err, response, body) {
    if (err || response.statusCode !== 200) {
      return res.sendStatus(500);
    } else {
      res.json(body["results"]);
    }
  });
});

let array = [];
for (result in results) {
  mapsClient.places({...}, (err, res) => {
    array.append(res.json.results[0])
  })
}

module.exports = router;
