import React, { useState, useEffect } from "react";
import Hero from "../components/hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import Projects from "../components/Projects/Projects";
import Sidebar from "../components/Sidebar/Sidebar";

function Home() {
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    handleResize(); // Check initial width
    window.addEventListener("resize", handleResize); // Add resize event listener

    return () => {
      window.removeEventListener("resize", handleResize); // Remove resize event listener on component unmount
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      {showSidebar && <Sidebar />}
      <Projects />
    </>
  );
}

export default Home;
