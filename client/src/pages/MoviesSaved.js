import React, { useState, useEffect } from "react";
import StoredMovies from "../components/StoredMovies/StoredMovies";
import { Jumbotron } from "react-bootstrap";
import API from "../utils/API";

const MoviesSaved = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadMovies();
  }, []);

  function loadMovies() {
    API.getMovies()
      .then((res) => setMovies(res.data))
      .catch((err) => console.log(err));
  }

  function deleteMovie(id) {
    API.deleteMovie(id)
      .then((res) => loadMovies())
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <Jumbotron className="text-center">
        <h1>Saved Books</h1>
        <p>Delete a book or go visit the page to buy it</p>
      </Jumbotron>
      <div>
        <div className="text-center">
          <h1>Books On My List</h1>
        </div>

        {movies.length ? (
          <StoredMovies movies={movies} deleteMovie={deleteMovie} />
        ) : (
          <h3>No Results to Display</h3>
        )}
      </div>
    </div>
  );
};
export default MoviesSaved;
