import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MatchList from './components/MatchList';
import MatchStats from './components/MatchStats';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MatchList />} />
        <Route path="/match/:id/stats" element={<MatchStats />} />
      </Routes>
    </Router>
  );
};

export default App;
