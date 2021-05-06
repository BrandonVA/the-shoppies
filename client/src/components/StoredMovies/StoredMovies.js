import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";

const StoredMovies = ({ nominatedMovies, deleteMovie }) => {
  console.log(nominatedMovies);
  return (
    <Row className="m-3 p-3">
      {nominatedMovies.map((movie) => (
        <Col xl={12} key={movie._id}>
          <Row>
            <Col xl={8}>
              <h4>{movie.title}</h4>
            </Col>
            <Col xl={4}>
              {" "}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button className="m-1" onClick={() => deleteMovie(movie._id)}>
                  Remove
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
              <Image className="image-fluid" src={movie.image} thumbnail />
            </Col>
            <Col md={10}>
              <p>Release Year: {movie.releaseYear}</p>
            </Col>
          </Row>

          <hr />
        </Col>
      ))}
    </Row>
  );
};

export default StoredMovies;
