import React, { useEffect, useState } from "react";
import { Row, Col, Button, Image, Jumbotron } from "react-bootstrap";

const SearchResults = ({ movies, saveMovie, savedMoveIDs }) => {
  return (
    <Row className="mx-3 px-3">
      {movies.map((movie) => (
        <Col xl={12} key={movie.imdbID}>
          <Row>
            <Col xl={8}>
              <h4>{movie.Title}</h4>
            </Col>
            <Col xl={4}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  disabled={savedMoveIDs.includes(movie.imdbID) ? true : false}
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
            <Col md={10}>
              {" "}
              <h6>Year Released: {movie.Year}</h6>
            </Col>
          </Row>
          <hr />
        </Col>
      ))}
    </Row>
  );
};

export default SearchResults;
