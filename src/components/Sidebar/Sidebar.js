import React from "react";
import image1 from "../../images/image1.png"; // Import your images
import image2 from "../../images/image2.png";
import image3 from "../../images/image3.png";
import image4 from "../../images/image4.png";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <img src={image1} alt="Image 1" />
      <img src={image2} alt="Image 2" />
      <img src={image3} alt="Image 3" />
      <img src={image4} alt="Image 4" />
    </div>
  );
}

export default Sidebar;
