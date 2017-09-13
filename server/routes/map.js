const express = require('express');
const router  = express.Router();

router.post("/", (req, res) => {
  const destination = req.body.destination;
  res.json(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${destination}&key=AIzaSyBR9a87huIRF93xhp5VcW57S7mBjfFGEKk`);
})

module.exports = router;