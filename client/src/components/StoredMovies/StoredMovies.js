import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";

const StoredMovies = ({ nominatedMovies, deleteMovie }) => {
  console.log(nominatedMovies);
  return (
    <Row className="m-3 p-3">
      {nominatedMovies.map((movie) => (
        <Col
          xl={12}
          key={movie._id}
          style={{ borderBottom: "1px solid grey", paddingTop: "10px" }}
        >
          <Row>
            <Col
              sm={2}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={{ minWidth: "85px" }}
                className="image-fluid"
                src={movie.image}
                thumbnail
              />
            </Col>
            <Col sm={7}>
              <h4>{movie.title}</h4>
              <p>Release Year: {movie.releaseYear}</p>
            </Col>
            <Col sm={3}>
              {" "}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button className="m-1" onClick={() => deleteMovie(movie._id)}>
                  Remove
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

export default StoredMovies;
