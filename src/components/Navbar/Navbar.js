import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Navbar.css";

function CustomNavbar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar expanded={expanded} expand="lg" className="navbarcss">
      <Container>
        <Navbar.Brand href="#home" className="custom-brand">
          Jack Spinola
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="custom-nav">
            <Nav.Link
              href="#about"
              onClick={() => setExpanded(false)}
              className="custom-link"
            >
              About
            </Nav.Link>
            <Nav.Link
              href="#projects"
              onClick={() => setExpanded(false)}
              className="custom-link"
            >
              Projects
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
