const router = require("express").Router();
const { API_KEY } = require("../../config");
const axios = require("axios");

// Matches with "/api/google/:title"
router.route("/:title").get((req, res) => {
  const query = `http://www.omdbapi.com/?s=${req.params.title}&type=movie&apikey=${API_KEY}`;
  console.log(query);
  axios
    .get(query)
    .then((results) => {
      res.json(results.data);
    })
    .catch((err) => {
      res.status(422).json(err);
      console.log(err);
    });
});

module.exports = router;
