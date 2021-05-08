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

function Movie() {
  const [banner, setBanner] = useState(false);
  const [movies, setMovies] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [cachedMovies, setCachedMovies] = useState([]);
  const [nominatedMovies, setNominatedMovies] = useState([]);
  const [savedMoveIDs, setSavedMoveIDs] = useState([]);

  useEffect(() => {
    loadMovies();
  }, []);

  const saveMovie = (movie) => {
    // Creating movie object to save to the db
    const movieToSave = {
      title: movie.Title,
      releaseYear: movie.Year,
      image: movie.Poster,
      imdbID: movie.imdbID,
    };
    // Making the api call to save movie to the db
    API.saveMovie(movieToSave)
      .then(() => {
        // Refresh the saved movies list
        loadMovies();
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (event) => {
    // Captures inputs name and value from the input element changed
    const { name, value } = event.target;
    // Updating state with the current value
    setFormObject({ ...formObject, [name]: value });
    if (movies) {
      // Creating a filter method that...
      const refinedMovies = cachedMovies.filter((movie) => {
        // will check if the new displayed results has the new value
        if (movie.Title.toLowerCase().includes(value) === true) {
          return movie;
        }
      });
      // sets the state to the new results.
      setMovies(refinedMovies);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Calls the search movie function that will make an api call
    searchMovie(formObject.title);
  };

  const searchMovie = (title) => {
    // encode the title that you are trying to search
    const encodeTitle = encodeURI(title);
    // Makes the api call for searching for a movie
    API.searchOMDb(encodeTitle)
      .then((res) => {
        // Sets state and cached movies to be displayed.
        setMovies(res.data.Search);
        setCachedMovies(res.data.Search);
      })
      .catch((err) => console.log(err));
  };

  const loadMovies = () => {
    // api call for getting saved movies
    API.getMovies()
      .then((res) => {
        // then updated state with results
        setNominatedMovies(res.data);
        res.data.length >= 5 ? setBanner(true) : setBanner(false);
        // Creating an array for holding a list of the imdb IDs
        //    This is used for setting the disabled value for save movie btn
        //    which will make it so the user can't save it again.
        const arr = [];
        // Loop through each movie and...
        res.data.forEach((movie) => {
          // push the id into the array created
          arr.push(movie.imdbID);
        });
        // After the loop is created update the state with list
        setSavedMoveIDs(arr);
      })
      .catch((err) => console.log(err));
  };

  const deleteMovie = (id) => {
    // api call for deleting a movie
    API.deleteMovie(id)
      // if successful refresh the list of nominated movies
      .then((res) => loadMovies())
      .catch((err) => console.log(err));
  };
  const handleEnter = (event) => {
    // event.preventDefault();
    console.log(event.key);
    if (event.key === "Enter") {
      searchMovie(formObject.title);
    }
  };

  return (
    <main style={{ margin: "5px" }}>
      <Jumbotron className="text-center py-2">
        <h1>Looking For a Movie?</h1>
        <p>Search for IMDb movies</p>
        <InputGroup
          style={{ width: "350px", margin: ".5rem auto" }}
          className="mb-3"
        >
          <FormControl
            aria-describedby="search input"
            name="title"
            placeholder="Movie Title (required)"
            onChange={handleInputChange}
            onKeyDown={handleEnter}
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
        <Button
          variant="outline-info"
          onClick={() => {
            navigator.clipboard.writeText(window.location);
          }}
        >
          Copy Link
        </Button>
      </Jumbotron>

      <div>
        {banner && (
          <div className="alert alert-danger text-center" role="alert">
            <h5>
              You have hit the goal of 5 Movies nominated Please Remove a movie
              to add a new one!
            </h5>
          </div>
        )}
        <Row>
          <Col md={6} style={{ borderLeft: " 1px solid grey" }}>
            {movies ? (
              <div>
                <Jumbotron className="text-center py-2">
                  <h2>Search Results </h2>
                </Jumbotron>
                <SearchResults
                  savedMoveIDs={savedMoveIDs}
                  saveMovie={saveMovie}
                  movies={movies}
                  banner={banner}
                />
              </div>
            ) : (
              <div className="text-center">
                <h2>No Results Search for a movie!</h2>
              </div>
            )}
          </Col>

          <Col md={6}>
            {nominatedMovies.length ? (
              <div>
                <Jumbotron className="text-center py-2">
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
