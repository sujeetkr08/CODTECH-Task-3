import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Editor from './Editor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/docs/:id" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
