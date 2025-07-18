import React from "react";
import { Briefcase, CalendarDays } from "lucide-react";
import "./Work.css";

function Work({ companyName, experienceTitle, experienceDescription, icon, date }) {
  return (
    <div className="col-xl-6 mb-5 d-flex">
      <div className="work-card">
        <div className="work-date">
          <CalendarDays size={16} className="work-icon" />
          {date}
        </div>

        <div className="experience-title"> 
          {experienceTitle}
          <Briefcase size={20} className="work-icon" style={{marginLeft:'8px'}}/>
        </div>

        <div className="company-container">
          <img src={icon} alt={`${companyName} Logo`} className="company-icon" />
          <p className="company-name">{companyName}</p>
        </div>

        <p className="experience-description">{experienceDescription}</p>
      </div>
    </div>
  );
}

export default Work;
