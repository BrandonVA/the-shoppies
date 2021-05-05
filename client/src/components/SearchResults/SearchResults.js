// import { Button } from "bootstrap";
import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import API from "../../utils/API";

const SearchResults = ({ movies }) => {
  const saveMovie = (movie) => {
    const movieToSave = {
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster,
    };
    API.saveMovie(movieToSave);
  };
  return (
    <Row className="m-3 p-3">
      {movies.map((movie) => (
        <Col xl={12} key={movie.imdbID}>
          <Row>
            <Col xl={8}>
              <h4>{movie.Title}</h4>
              <h6>
                Year Released:
                {movie.Year}
              </h6>
            </Col>
            <Col xl={4}>
              {" "}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  className="m-1 btn-success"
                  onClick={() => saveMovie(movie)}
                >
                  Save
                </Button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col
              md={2}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {movie.Poster !== "N/A" ? (
                <Image className="image-fluid" src={movie.Poster} thumbnail />
              ) : (
                <div></div>
              )}
            </Col>
            <Col md={10}></Col>
          </Row>
          <hr />
        </Col>
      ))}
    </Row>
  );
};

export default SearchResults;
