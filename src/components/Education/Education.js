import React from "react";
import "./Education.css";

function Education({ degree, institute, location, date }) {
  return (
    <div className="col-md-6 text-center mb-5">
      <div className="row">
        <p className="degree">{degree}</p>
        <p className="institute">{institute}</p>
      </div>
      <div className="row">
        <p className="date">{date}</p>
        <p className="location">{location}</p>
      </div>
    </div>
  );
}

export default Education;
