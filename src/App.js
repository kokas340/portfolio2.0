import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Story from "./components/Story/Story";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";

function App() {
  useEffect(() => {
    document.title = "Jack Spinola";
  }, []);
  return (
    <Router basename="/portfolio2.0">
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story/:id" element={<Story />} />
      </Routes>
    </Router>
  );
}

export default App;