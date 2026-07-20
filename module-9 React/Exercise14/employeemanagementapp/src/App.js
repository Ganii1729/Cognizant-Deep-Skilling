import React, { useState } from 'react';
import ThemeContext from './ThemeContext';
import EmployeeList from './components/EmployeeList';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('contextNeed');

  const employees = [
    { id: 1, name: 'John Doe', role: 'Senior React Developer', dept: 'Engineering', email: 'john.doe@company.com' },
    { id: 2, name: 'Jane Smith', role: 'UX Designer', dept: 'Product & Design', email: 'jane.smith@company.com' },
    { id: 3, name: 'Mike Johnson', role: 'DevOps Engineer', dept: 'Infrastructure', email: 'mike.johnson@company.com' }
  ];

  const docTabs = {
    contextNeed: {
      title: 'Context API Benefits',
      text: 'React Context API provides a way to pass data down the component tree without having to pass props manually at every level ("prop drilling"). It simplifies global state management for settings like UI themes, current user authentication, or language preferences.'
    },
    createContext: {
      title: 'createContext() Usage',
      text: 'To use Context, call React.createContext(defaultValue) to define a context module. You then wrap your component tree in <Context.Provider value={state}> to make it available, and consume it in nested children using the useContext(Context) hook.'
    },
    routerTypes: {
      title: 'Router Component Types',
      text: 'In React Router, typical router components include: 1) <BrowserRouter> for standard HTML5 history API navigation, 2) <HashRouter> for legacy anchor hash navigation, 3) <MemoryRouter> for testing and non-browser runtimes, and 4) <StaticRouter> for server-side rendering.'
    }
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    // Wrap entire JSX in ThemeContext.Provider
    <ThemeContext.Provider value={theme}>
      <div className={`app-container theme-${theme}`}>
        <header className="app-header">
          <div className="header-nav glass-panel">
            <span className="logo">👥 TeamSync</span>
            <div className="theme-toggle-container">
              <span className="theme-label">Active Theme: {theme.toUpperCase()}</span>
              <button className={`btn btn-toggle-${theme}`} onClick={toggleTheme}>
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
              </button>
            </div>
          </div>
          
          <div className="hero-section">
            <h1>Employee Directory</h1>
            <p>Theme-switched employee cards using React Context API to manage and share button styles seamlessly.</p>
          </div>
        </header>

        <main className="main-content">
          <div className="dashboard-layout">
            {/* Left Area: Employees List (No theme props are passed!) */}
            <div className="list-area">
              <EmployeeList employees={employees} />
            </div>

            {/* Right Area: Interactive Context & Router Theory Docs */}
            <div className="sidebar-area">
              <div className="glass-panel concepts-card">
                <h3>Global State Architecture</h3>
                <p className="card-desc">Objectives overview of Context API and routing architectures:</p>
                
                <div className="tabs-list">
                  {Object.keys(docTabs).map((key) => (
                    <button
                      key={key}
                      className={`tab-link ${activeTab === key ? 'active' : ''}`}
                      onClick={() => setActiveTab(key)}
                    >
                      {docTabs[key].title}
                    </button>
                  ))}
                </div>

                <div className="tab-pane">
                  <h4>{docTabs[activeTab].title}</h4>
                  <p>{docTabs[activeTab].text}</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="app-footer">
          <p>© 2026 TeamSync Portal • React Context API Lab 14</p>
        </footer>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
