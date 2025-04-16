import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./Navbar.css";

function CustomNavbar() {
  return (
    <Navbar className="navbarcss" expand="lg">
      <Container>
        <Navbar.Brand className="custom-brand">Jack Spinola</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link href="#projects">Projects</Nav.Link>
          <Nav.Link href="#education">Education</Nav.Link>
          <Nav.Link href="#about">About Me</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
