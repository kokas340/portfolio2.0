import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//src
import Home from './pages/Home';


function App() {
  return ( 
    <Router basename=''>
      <Routes>
        <Route path="/" element={<Home/>} /> 
      </Routes>
    </Router>
  );
}

export default App;