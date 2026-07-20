import React, { useState } from 'react';
import GitClient from './GitClient';
import './App.css';

function App() {
  const [username, setUsername] = useState('techiesyed');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('isolation');

  const client = new GitClient();

  const handleFetch = (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setRepos([]);

    client.getRepositories(username)
      .then(data => {
        setRepos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to retrieve repository lists.');
        setLoading(false);
      });
  };

  const concepts = {
    isolation: {
      title: 'Isolation in Testing',
      text: 'Testing in isolation ensures that when a unit test runs, it does not depend on actual external systems (like live databases, networks, or file APIs). This guarantees that tests remain deterministic, fast, and local.'
    },
    mocking: {
      title: 'Concept of Mocking',
      text: 'Mocking replaces real objects (like axios or fetch network clients) with controlled test doubles. These doubles return pre-defined data, allowing you to test edge cases (like network drops or empty payloads) easily.'
    },
    jestMock: {
      title: 'Mocking with Jest',
      text: 'Jest provides utility wrappers (like jest.mock("axios")) to intercept module imports automatically and spy on/control mock return values (using mockResolvedValue).'
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="nav-bar glass-panel">
          <span className="brand-logo">🐙 Git<span className="logo-accent">Search</span></span>
          <span className="badge">Mocking Lab 19</span>
        </div>

        <div className="hero-banner">
          <h1>GitHub Repository Client</h1>
          <p>Retrieve live repositories from api.github.com or run tests in complete isolation using Jest mocks.</p>
        </div>
      </header>

      <main className="main-content">
        <div className="content-layout">
          {/* Left Column: Repository Search Form and Feed */}
          <div className="left-column">
            <div className="search-panel glass-panel">
              <h3>Search Repositories</h3>
              <form onSubmit={handleFetch} className="search-form">
                <div className="form-group">
                  <label htmlFor="git-user">GitHub Username:</label>
                  <input
                    id="git-user"
                    type="text"
                    placeholder="e.g. techiesyed"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Get Repositories
                </button>
              </form>
            </div>

            <div className="results-panel glass-panel">
              <h3>Repositories List</h3>
              
              {loading && (
                <div className="loading-container">
                  <div className="spinner"></div>
                  <p>Searching GitHub endpoints...</p>
                </div>
              )}

              {error && (
                <div className="error-container">
                  <span>⚠️ {error}</span>
                </div>
              )}

              {!loading && !error && repos.length === 0 && (
                <p className="empty-results">Enter username and submit to load repo list.</p>
              )}

              {!loading && repos.length > 0 && (
                <ul className="repos-list">
                  {repos.map((repo, idx) => (
                    <li key={idx} className="repo-item">
                      <span className="repo-bullet">📂</span>
                      <span className="repo-name">{repo}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right Column: Concepts Tab Panel */}
          <div className="right-column">
            <div className="concepts-card glass-panel">
              <h3>Mocking & Isolation reference</h3>
              <p className="card-desc">Click tabs to learn more about testing in isolation with Jest:</p>

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
        <p>© 2026 GitSearch Portal • Axios & Mocking Lab 19</p>
      </footer>
    </div>
  );
}

export default App;
