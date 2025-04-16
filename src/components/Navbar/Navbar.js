import React from "react";
import { Navbar, Container } from "react-bootstrap";
import "./Navbar.css";

function CustomNavbar() {
  return (
    <Navbar className="navbarcss">
      <Container>
        <Navbar.Brand href="#home" className="custom-brand">
          Jack Spinola
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
