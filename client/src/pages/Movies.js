import React, { useState } from "react";
import SearchResults from "../components/SearchResults/SearchResults";
import API from "../utils/API";
import { Button, Jumbotron, InputGroup, FormControl } from "react-bootstrap";

function Movie() {
  const [movies, setMovies] = useState([]);
  const [formObject, setFormObject] = useState({});

  // useEffect(() => {
  //   searchBook("Harry Potter");
  // }, []);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const encodeTitle = encodeURI(formObject.title);
    console.log(encodeTitle);
    searchMovie(encodeTitle);
  }
  function searchMovie(title) {
    API.searchOMDb(title).then((res) => {
      console.log(res.data.Search);
      setMovies(res.data.Search);
      console.log("______________________");
    });
  }

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
        <div className="text-center">
          <h1>Movie Results</h1>
        </div>

        {movies.length > 0 ? (
          <SearchResults movies={movies} />
        ) : (
          <div className="text-center">
            {" "}
            <h3>No Results Search for a movie!</h3>
          </div>
        )}
      </div>
    </main>
  );
}

export default Movie;
