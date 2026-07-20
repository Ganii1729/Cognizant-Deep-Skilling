import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import TrainersList from './components/TrainersList';
import TrainerDetail from './components/TrainerDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="trainers-app">
        <header className="app-navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo">
              <span className="logo-icon">🎓</span>
              <span>Cognizant <strong>Academy</strong></span>
            </Link>
            <nav className="navbar-menu">
              <Link to="/" className="menu-item">Home</Link>
              <Link to="/trainers" className="menu-item">Trainers List</Link>
            </nav>
          </div>
        </header>

        <main className="app-main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trainers" element={<TrainersList />} />
            <Route path="/trainers/:id" element={<TrainerDetail />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>© 2026 Cognizant Technology Solutions. Academy Trainers Directory.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
