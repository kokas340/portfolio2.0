import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import Story from "./components/Story/Story";

function App() {
  useEffect(() => {
    document.title = "Jack Spinola";
  }, []);
  return (
    <Router basename="/portfolio2.0">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story/:id" element={<Story />} />
      </Routes>
    </Router>
  );
}

export default App;