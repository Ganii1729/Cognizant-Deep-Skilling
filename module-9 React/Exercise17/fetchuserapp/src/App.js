import React, { useState } from 'react';
import Getuser from './components/Getuser';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('consumeRest');

  const docTabs = {
    consumeRest: {
      title: 'Consuming REST APIs',
      text: 'React components fetch data from external endpoints (REST APIs) to update state and display dynamic content. Typical choices for HTTP calls include the native fetch() API and libraries like Axios.'
    },
    lifecycleFetch: {
      title: 'Lifecycle Integration',
      text: 'In class components, componentDidMount() is the designated lifecycle method for API requests. Running fetch inside it ensures that the request is made immediately after the element is injected into the DOM.'
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="nav-bar glass-panel">
          <span className="brand-logo">👤 Profile<span className="logo-accent">Hub</span></span>
          <span className="badge">Lifecycle Lab 17</span>
        </div>

        <div className="hero-banner">
          <h1>Dynamic Profile Fetcher</h1>
          <p>Consuming api.randomuser.me asynchronously using standard fetch inside React lifecycle hooks.</p>
        </div>
      </header>

      <main className="main-content">
        <div className="content-layout">
          {/* Left Column: Getuser Component */}
          <div className="left-column">
            <Getuser />
          </div>

          {/* Right Column: Concepts Reference card */}
          <div className="right-column">
            <div className="concepts-card glass-panel">
              <h3>REST API Integration Guide</h3>
              <p className="card-desc">Objectives overview of lifecycle methods and fetch actions in React:</p>

              <div className="tabs-list">
                {Object.keys(docTabs).map((key) => (
                  <button
                    key={key}
                    className={`tab-btn ${activeTab === key ? 'active' : ''}`}
                    onClick={() => setActiveTab(key)}
                  >
                    {docTabs[key].title}
                  </button>
                ))}
              </div>

              <div className="tab-body">
                <h4>{docTabs[activeTab].title}</h4>
                <p>{docTabs[activeTab].text}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2026 ProfileHub • REST API Lifecycle Lab 17</p>
      </footer>
    </div>
  );
}

export default App;
