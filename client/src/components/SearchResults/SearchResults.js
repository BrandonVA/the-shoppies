import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";

const SearchResults = ({ movies, saveMovie, savedMoveIDs, banner }) => {
  return (
    <Row className="mx-3 px-3">
      {movies.map((movie) => (
        <Col xl={12} key={movie.imdbID}>
          <Row>
            <Col
              sm={2}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {movie.Poster !== "N/A" ? (
                <Image
                  className="image-fluid"
                  src={movie.Poster}
                  thumbnail
                  style={{ minWidth: "85px" }}
                />
              ) : (
                <div></div>
              )}
            </Col>
            <Col sm={7}>
              <h4>{movie.Title}</h4>
              <h6>Year Released: {movie.Year}</h6>
            </Col>
            <Col sm={3}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  disabled={
                    savedMoveIDs.includes(movie.imdbID) || banner ? true : false
                  }
                  className="m-1 btn-success"
                  onClick={(e) => {
                    saveMovie(movie);
                    e.target.disabled = true;
                  }}
                >
                  Save
                </Button>
              </div>
            </Col>
          </Row>
          <hr />
        </Col>
      ))}
    </Row>
  );
};

export default SearchResults;
