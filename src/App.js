import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Story from "./components/Story/Story";
import Header from "./components/site/Header";
import Footer from "./components/site/Footer";

// New pages start at the top unless the URL points at a section.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <Router basename="/portfolio2.0">
      <ScrollManager />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story/:id" element={<Story />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
