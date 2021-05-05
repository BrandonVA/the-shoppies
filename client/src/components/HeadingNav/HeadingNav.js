import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./nav.css";

const HeadingNav = () => {
  const [location, setLocation] = useState("");
  useEffect(() => {
    setLocation(window.location.pathname);
  }, [location]);

  const setClass = (url) => (url === location ? "active nav-link" : "nav-link");

  return (
    <Nav defaultActiveKey="/" as="ul">
      <Link
        to="/"
        onClick={() => {
          setLocation("/");
        }}
        className={"nav-link"}
      >
        Google Books
      </Link>
      <Link
        to="/"
        onClick={() => {
          setLocation("/");
        }}
        className={setClass("/")}
      >
        Search
      </Link>
      <Link
        to="/saved"
        onClick={() => {
          setLocation("/saved");
        }}
        className={setClass("/saved")}
      >
        Saved
      </Link>
    </Nav>
  );
};

export default HeadingNav;
