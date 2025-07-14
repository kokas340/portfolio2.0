import React from "react";
import { Calendar, MapPin } from "lucide-react";
import "./Education.css";

function Education({ degree, institute, location, date, flag, description }) {
  return (
    <div className="col-xl-6 mb-4">
      <div className="education-card premium-card">
        <div className="education-header">
          <p className="degree">{degree}</p>
          <p className="institute">{institute}</p>
          <div className="education-meta">
            <span className="meta-item">
              <Calendar size={16} className="meta-icon" />
              {date}
            </span>
            <span className="meta-item">
              <MapPin size={16} className="meta-icon" />
              {location}
            </span>
            <img src={flag} alt="Flag" className="flag-icon" />
          </div>
        </div>

        <div className="education-body">
          <p className="education-description">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Education;
