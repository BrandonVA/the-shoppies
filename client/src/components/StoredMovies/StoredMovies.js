import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";

const StoredMovies = ({ movies, deleteMovie }) => {
  console.log(movies);
  return (
    <Row className="m-3 p-3">
      {movies.map((movie) => (
        <Col xl={12} key={movie._id}>
          <Row>
            <Col xl={8}>
              <h4>{movie.title}</h4>
              <h6>
                Written By:
                {}
              </h6>
            </Col>
            <Col xl={4}>
              {" "}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button className="m-1" href={movie.link}>
                  View
                </Button>

                <Button className="m-1" onClick={() => deleteMovie(movie._id)}>
                  X
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
              <p>some content</p>
            </Col>
          </Row>

          <hr />
        </Col>
      ))}
    </Row>
  );
};

export default StoredMovies;
