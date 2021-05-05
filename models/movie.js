const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: { type: String, required: true },
  releaseYear: String,
  // description: String,
  image: String,
  // link: String,
  date: { type: Date, default: Date.now },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
