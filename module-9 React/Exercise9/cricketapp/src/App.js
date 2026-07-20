import React, { useState } from 'react';
import ListofPlayers from './components/ListofPlayers';
import IndianPlayers from './components/IndianPlayers';
import './App.css';

function App() {
  const [flag, setFlag] = useState(true);

  return (
    <div className="cricket-app">
      <header className="app-header">
        <h1>Dashboard - Cricket App</h1>
        <p>ES6 Features Showcase in React</p>
        
        <div className="flag-toggle-wrapper">
          <span className="flag-label">Current Flag: <code>{flag.toString()}</code></span>
          <button className="toggle-btn" onClick={() => setFlag(!flag)}>
            Toggle Flag to {(!flag).toString()}
          </button>
        </div>
      </header>
      
      <main className="app-main">
        {flag ? <ListofPlayers /> : <IndianPlayers />}
      </main>
      
      <footer className="app-footer">
        <p>© 2026 CricketApp Labs. Built using ES6 Map, Filter, Destructuring, and Merge features.</p>
      </footer>
    </div>
  );
}

export default App;
