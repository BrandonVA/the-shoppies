import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./nav.css";

const HeadingNav = () => {
  return (
    <Nav defaultActiveKey="/" as="ul">
      <Link to="/" className={"nav-link"}>
        The Shoppies
      </Link>
    </Nav>
  );
};

export default HeadingNav;
