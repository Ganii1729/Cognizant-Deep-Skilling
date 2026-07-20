import React, { useState } from 'react';
import CohortDetails from './components/CohortDetails';
import { CohortData } from './Cohort';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('testingNeed');

  const concepts = {
    testingNeed: {
      title: 'Unit Testing in React',
      text: 'Unit testing verifies that individual modules or components function correctly in isolation. Testing prevents regressions, ensures UI elements display state parameters accurately, and simplifies refactoring.'
    },
    jestEnzyme: {
      title: 'Jest & Enzyme Specs',
      text: 'Jest is a JavaScript test runner. Enzyme is a testing utility for React that makes it easier to assert, manipulate, and traverse components. In React 17+, developers configure Enzyme using adapters like wojtekmaj adapter.'
    },
    mountShallow: {
      title: 'Shallow vs Full Mount',
      text: 'Shallow rendering (shallow) loads a component in isolation without rendering nested children, making tests fast. Full mounting (mount) compiles the entire component tree, permitting full interaction with DOM lifecycle hooks.'
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="nav-bar glass-panel">
          <span className="brand-logo">🎓 Cohort<span className="logo-accent">Tracker</span></span>
          <span className="badge">Unit Testing Lab 18</span>
        </div>

        <div className="hero-banner">
          <h1>Cognizant Academy Cohorts</h1>
          <p>Browse active training programs and verify component integrity using Jest unit test configurations.</p>
        </div>
      </header>

      <main className="main-content">
        <div className="content-layout">
          {/* Left Column: Cohorts list rendering */}
          <div className="left-column">
            <div className="cohorts-list-container">
              <h3>Academy Cohort Feed</h3>
              <p className="section-desc">Active training slots mapped and rendered using CohortDetails component tags.</p>
              
              <div className="cohort-grid">
                {CohortData.map((cohort) => (
                  <CohortDetails key={cohort.code} cohort={cohort} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Testing Concepts Guide */}
          <div className="right-column">
            <div className="concepts-card glass-panel">
              <h3>Enzyme Testing reference</h3>
              <p className="card-desc">Click tabs to learn more about testing utilities and matchers:</p>

              <div className="tabs-list">
                {Object.keys(concepts).map((key) => (
                  <button
                    key={key}
                    className={`tab-btn ${activeTab === key ? 'active' : ''}`}
                    onClick={() => setActiveTab(key)}
                  >
                    {concepts[key].title}
                  </button>
                ))}
              </div>

              <div className="tab-body">
                <h4>{concepts[activeTab].title}</h4>
                <p>{concepts[activeTab].text}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2026 CohortTracker Portal • Jest & Enzyme Testing Lab 18</p>
      </footer>
    </div>
  );
}

export default App;
