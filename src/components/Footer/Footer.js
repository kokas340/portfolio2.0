import React from "react";

function Footer() {
  return (
    <footer className="container-fluid-pattern66 w-full px-3 py-6 text-center">
      <div>
        <div className="w-full pt-2">
          <p>
            <span className="text-outside-span">&#169;</span> {new Date().getFullYear()} Jack Spinola,
            no rights reserved.{" "}
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/kokas340/portfolio2.0" className="text-blue-600 underline hover:text-blue-700">
              View source code.
            </a>
          </p>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
