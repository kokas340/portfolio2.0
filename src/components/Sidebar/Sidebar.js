import React, { useEffect } from "react";
import image1 from "../../images/image1.png";
import image2 from "../../images/image2.png";
import image3 from "../../images/image3.png";
import image4 from "../../images/image4.png";
import "./Sidebar.css";

function Sidebar() {
  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.add("show");
  }, []);

  return (
    <div className="sidebar">
      <a
        href="https://www.linkedin.com/in/jack-spinola-0a835927b/"
        target="_blank"
      >
        <img src={image1} alt="Image 1" />
      </a>
      <a href="https://github.com/kokas340" target="_blank">
        <img src={image2} alt="Image 2" />
      </a>
      <a href="mailto:jackspinola198@hotmail.com" target="_blank">
        <img src={image3} alt="Image 3" />
      </a>
      <a
        href="https://api.whatsapp.com/send/?phone=4591450703&text&type=phone_number&app_absent=0"
        target="_blank"
      >
        <img src={image4} alt="Image 4" />
      </a>
    </div>
  );
}

export default Sidebar;
