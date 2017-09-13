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
      console.log(body.results);
      // for (result of body['results']) {
      //   console.log(result.geometry.location);
      // }
    }
  });
});

module.exports = router;
// module.exports = () => {


//   // router.get("/map/:destination", (req, res) => {
//   //   const destination = req.params.destination;
//   //   res.json(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${destination}&key=AIzaSyBR9a87huIRF93xhp5VcW57S7mBjfFGEKk`);
//   // })

//   return router;
// }
