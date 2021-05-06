import React, { useEffect, useState } from "react";
import SearchResults from "../components/SearchResults/SearchResults";
import API from "../utils/API";
import {
  Button,
  Jumbotron,
  InputGroup,
  FormControl,
  Col,
  Row,
} from "react-bootstrap";
import StoredMovies from "../components/StoredMovies/StoredMovies";
// import MoviesSaved from "../components/MoviesSaved.js/MoviesSaved";

function Movie() {
  const [movies, setMovies] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [cachedMovies, setCachedMovies] = useState([]);
  const [nominatedMovies, setNominatedMovies] = useState([]);
  const [savedMoveIDs, setSavedMoveIDs] = useState([]);

  useEffect(() => {
    loadMovies();
  }, []);

  const saveMovie = (movie) => {
    const movieToSave = {
      title: movie.Title,
      releaseYear: movie.Year,
      image: movie.Poster,
      imdbID: movie.imdbID,
    };
    API.saveMovie(movieToSave).then((res) => {
      loadMovies();
      console.log(this);
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
    console.log(cachedMovies);
    const refinedMovies = cachedMovies.filter((movie) => {
      console.log(movie);
      console.log(value);
      if (movie.Title.toLowerCase().includes(value) === true) {
        return movie;
      }
    });
    console.log(refinedMovies);

    setMovies(refinedMovies);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const encodeTitle = encodeURI(formObject.title);
    console.log(encodeTitle);
    searchMovie(encodeTitle);
  };
  const searchMovie = (title) => {
    API.searchOMDb(title).then((res) => {
      console.log(res.data.Search);
      setMovies(res.data.Search);
      setCachedMovies(res.data.Search);
      console.log("______________________");
    });
  };

  const loadMovies = () => {
    API.getMovies()
      .then((res) => {
        setNominatedMovies(res.data);
        const arr = [];
        res.data.forEach((movie) => {
          arr.push(movie.imdbID);
          console.log(movie.imdbID);
        });
        console.log(arr);
        setSavedMoveIDs(arr);
      })
      .catch((err) => console.log(err));
  };

  const deleteMovie = (id) => {
    API.deleteMovie(id)
      .then((res) => loadMovies())
      .catch((err) => console.log(err));
  };

  return (
    <main style={{ margin: "10px" }}>
      <Jumbotron className="text-center">
        <h1>Looking For a Movie?</h1>
        <p>Search for IMDb movies</p>
        <InputGroup
          style={{ width: "350px", margin: "2rem auto" }}
          className="mb-3"
        >
          <FormControl
            aria-describedby="search input"
            name="title"
            placeholder="Title (required)"
            onChange={handleInputChange}
          />
          <InputGroup.Append>
            <Button
              disabled={!formObject.title}
              onClick={handleFormSubmit}
              variant="outline-secondary"
            >
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Jumbotron>

      <div>
        <Row>
          <Col sm={6} style={{ borderLeft: " 1px solid grey" }}>
            {movies.length > 0 ? (
              <div>
                <Jumbotron className="text-center">
                  <h2>Search Results </h2>
                </Jumbotron>
                <SearchResults
                  savedMoveIDs={savedMoveIDs}
                  saveMovie={saveMovie}
                  movies={movies}
                />
              </div>
            ) : (
              <div className="text-center">
                <h2>No Results Search for a movie!</h2>
              </div>
            )}
          </Col>

          <Col sm={6}>
            {nominatedMovies.length ? (
              <div>
                <Jumbotron className="text-center">
                  <h2>Movies Nominated</h2>
                </Jumbotron>
                <StoredMovies
                  nominatedMovies={nominatedMovies}
                  deleteMovie={deleteMovie}
                />
              </div>
            ) : (
              <div className="text-center">
                <h3>No Movies Nominated</h3>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </main>
  );
}

export default Movie;
