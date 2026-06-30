import React from "react";
import { Briefcase, CalendarDays } from "lucide-react";
import "./Work.css";

function Work({ companyName, experienceTitle, experienceDescription, icon, date }) {
  return (
    <div className="mb-12 flex w-full px-3 xl:w-1/3">
      <div className="work-card">
        <div className="work-header">
          <img src={icon} alt={`${companyName} Logo`} className="company-icon" />
          <div className="header-text">
            <h3 className="experience-title">{experienceTitle}</h3>
            <span className="company-name">{companyName}</span>
          </div>
        </div>

        <div className="work-meta">
          <CalendarDays size={16} className="work-icon" />
          <span className="work-date">{date}</span>
          <Briefcase size={16} className="work-icon" />
        </div>

        <p className="experience-description">{experienceDescription}</p>
      </div>
    </div>
  );
}

export default Work;
