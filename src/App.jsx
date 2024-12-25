import React, { createContext, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import HomeworkOne from './pages/HomeworkOne';
import HomeworkTwo from './pages/HomeworkTwo';
import HomeworkThree from './pages/HomeworkThree';

export const Tasks = createContext(null);

function App() {
  const [data, setData] = useState([]);

  return (
    <div className="container">
      <Tasks.Provider value={{ data, setData }}> 
        <Routes>
          <Route path="/" element={<MainLayout><HomeworkOne /></MainLayout>} />
          <Route path="/homeworkTwo" element={<MainLayout><HomeworkTwo /></MainLayout>} />
          <Route path="/homeworkThree" element={<MainLayout><HomeworkThree /></MainLayout>} />
        </Routes>
      </Tasks.Provider>
    </div>
  );
}

export default App;