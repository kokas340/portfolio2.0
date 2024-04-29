import React from "react";
import Timer from "../timer/Timer";
import Intro from "../Intro/Intro";
import "./Hero.css";

function Hero() {
  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center container-fluid-pattern"
      style={{ minHeight: "100vh" }}
    >
      <div className="row justify-content-center pb-5  paddingPhone">
        <div className="col-md-12">
          <Timer />
          <div className="text-center">
            <p>
              <span className="text-outside-span">Since my first</span>
              <span className="code-block">writeln('Hello, world.');</span>
              <span className="text-outside-span"> - Pascal</span>
            </p>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <Intro />
        </div>
      </div>
    </div>
  );
}

export default Hero;
