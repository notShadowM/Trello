import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Routes, Route, Link } from 'react-router-dom';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
import Navbar from './Components/Navbar';
import Boards from './Components/Boards';
import OneBoard from './Components/OneBoard';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Boards />} />
        <Route
          exact
          path="/:boardName"
          element={(
            // <DndProvider backend={HTML5Backend}>
            <OneBoard />
            // </DndProvider>
        )}
        />
      </Routes>

    </div>
  );
}

export default App;
