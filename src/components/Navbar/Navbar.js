import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Navbar.css";

function CustomNavbar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar expanded={expanded}  className="navbarcss">
      <Container>
        <Navbar.Brand href="#home" className="custom-brand">
          Jack Spinola
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
