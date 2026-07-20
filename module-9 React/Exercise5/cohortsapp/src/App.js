import React, { useState } from 'react';
import CohortDetails from './components/CohortDetails';
import './App.css';

function App() {
  const [cohorts] = useState([
    {
      code: 'C-React19',
      courseName: 'React Frontend Development',
      duration: '6 weeks',
      status: 'Ongoing'
    },
    {
      code: 'C-JavaSpring',
      courseName: 'Enterprise Java Spring Boot',
      duration: '12 weeks',
      status: 'Completed'
    },
    {
      code: 'C-AWS',
      courseName: 'AWS DevOps Architecture',
      duration: '8 weeks',
      status: 'Ongoing'
    }
  ]);

  const [activeTab, setActiveTab] = useState('reactStyling');

  const concepts = {
    reactStyling: {
      title: 'Styling React Components',
      text: 'React components can be styled using standard stylesheet CSS files, CSS-in-JS libraries, CSS Modules, or dynamic inline styles passed directly as JavaScript objects.'
    },
    cssModules: {
      title: 'CSS Modules',
      text: 'CSS Modules compile class names into unique hashed identifiers. This prevents naming collisions and scopes styles locally to specific components.'
    },
    inlineStyles: {
      title: 'Inline Styles',
      text: 'Inline styles are specified using JavaScript objects mapped to the style attribute. Properties use camelCase (e.g. fontWeight instead of font-weight), which allows you to apply styles conditionally based on state.'
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="nav-bar glass-panel">
          <span className="brand-logo">🎨 Style<span className="logo-accent">Hub</span></span>
          <span className="badge">Styling Lab 5</span>
        </div>

        <div className="hero-banner">
          <h1>Cohort Styling Center</h1>
          <p>Style components locally using CSS Modules, and render conditional heading colors using inline styles.</p>
        </div>
      </header>

      <main className="main-content">
        <div className="content-layout">
          {/* Left Column: Styled cohort cards */}
          <div className="left-column">
            <div className="cohorts-display">
              <h3>Academy Cohorts</h3>
              <p className="display-desc">Rendered as modular inline-blocks with border boundaries.</p>

              <div className="cohorts-wrapper">
                {cohorts.map((c) => (
                  <CohortDetails key={c.code} cohort={c} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Styling concepts tab card */}
          <div className="right-column">
            <div className="concepts-card glass-panel">
              <h3>React Styling Guide</h3>
              <p className="card-desc">Click tabs to learn more about CSS Modules and inline properties:</p>

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
        <p>© 2026 StyleHub • CSS Modules & Inline Styling Lab 5</p>
      </footer>
    </div>
  );
}

export default App;
