const express = require('express');
const router  = express.Router();

router.post("/", (req, res) => {
  console.log("in map");
  const destination = req.body.destination;
  res.json(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${destination}&key=AIzaSyBR9a87huIRF93xhp5VcW57S7mBjfFGEKk`);
})

module.exports = router;
// module.exports = () => {


//   // router.get("/map/:destination", (req, res) => {
//   //   const destination = req.params.destination;
//   //   res.json(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${destination}&key=AIzaSyBR9a87huIRF93xhp5VcW57S7mBjfFGEKk`);
//   // })

//   return router;
// }