// src/App.tsx
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import BackOffice from './components/BackOffice.tsx';

import Form from './components/Form.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/byTheBook" element={<Form />} />
        <Route path="/backOffice" element={<BackOffice />} />
      </Routes>
    </Router>
  );
}

export default App;
