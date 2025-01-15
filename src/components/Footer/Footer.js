import React from "react";

function Footer() {
  return (
    <footer className="container-fluid container-fluid-pattern text-center py-4">
      <div className="row">
        <div className="col-md-12">
          <p>
            <span className="text-outside-span">&#169;</span> {new Date().getFullYear()} Jack Spinola,
            no rights reserved.{" "}
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/kokas340/portfolio2.0">
              View source code.
            </a>
          </p>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
