import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Boards from './Components/Boards';
import OneBoard from './Components/OneBoard';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Boards />} />
        <Route exact path="/:boardName" element={<OneBoard />} />
      </Routes>

    </div>
  );
}

export default App;
