import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

class App extends Component {
  render() {
    return (
      <div className="portal-container">
        <header className="portal-header">
          <div className="logo-container">
            <span className="portal-icon">🎓</span>
            <h1 className="portal-title">Student Management Portal</h1>
          </div>
        </header>
        <main className="portal-content">
          <div className="section-card">
            <Home />
          </div>
          <div className="section-card">
            <About />
          </div>
          <div className="section-card">
            <Contact />
          </div>
        </main>
        <footer className="portal-footer">
          <p>© 2026 Student Management Portal. Built with React Class Components.</p>
        </footer>
      </div>
    );
  }
}

export default App;
