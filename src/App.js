import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";

function App() {
  useEffect(() => {
    document.title = "Jack Spinola";
  }, []);
  return (
    <Router basename="/portfolio2.0">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
