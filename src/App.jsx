import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostAdWizard  from './components/PostAdWizard';
import SecondPage from './components/SecondPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostAdWizard />} />
        <Route path="/Secondpage" element={<SecondPage/>} />
      </Routes>
    </Router>
  );
}

export default App;