import logo from './logo.svg';
import './App.css';


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/login.js';
import HomePage from './pages/home.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
