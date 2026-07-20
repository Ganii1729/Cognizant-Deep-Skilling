import React, { useState } from 'react';
import Register from './components/Register';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('validation');

  const concepts = {
    validation: {
      title: 'React Forms Validation',
      text: 'React form validation involves checking fields dynamically in handlers (onChange, onBlur) and before final submit (onSubmit). Checking in handlers provides instant visual feedback, while checking on submit prevents bad requests.'
    },
    reactVsHtml: {
      title: 'React vs HTML Forms',
      text: 'In HTML forms, elements maintain their own internal state and submit to a new URL. In React forms, state is controlled by components, values are updated via callback properties, and submission runs JavaScript methods without reloading the page.'
    },
    controlled: {
      title: 'Controlled Components',
      text: 'Inputs whose values are tied directly to state variables are "controlled". React controls the inputs value, making validation and resetting extremely simple and declarative.'
    },
    inputs: {
      title: 'Form Input Controls',
      text: 'React forms can map standard input elements like textboxes, password fields, textareas, checkboxes, radio buttons, and select dropdowns to component state variables.'
    },
    handling: {
      title: 'Handling React Forms',
      text: 'Form handling typically uses an onChange listener to capture user keystrokes, extract input properties, and call setState to sync input value state.'
    },
    submitting: {
      title: 'Submitting React Forms',
      text: 'Form submission is handled by capturing the onSubmit event. The handler must execute e.preventDefault() to cancel the standard HTML page refresh, then check input validation before running submit logic.'
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="nav-bar glass-panel">
          <span className="brand-logo">🔒 Secure<span className="logo-accent">Register</span></span>
          <span className="badge">Validation Lab 16</span>
        </div>

        <div className="hero-banner">
          <h1>Secure Account Sign Up</h1>
          <p>Register your mail profile. Enter your details and verify validation requirements in real time.</p>
        </div>
      </header>

      <main className="main-content">
        <div className="content-layout">
          {/* Left Column: Register Component Form */}
          <div className="left-column">
            <Register />
          </div>

          {/* Right Column: Interactive Validation Concepts Guide */}
          <div className="right-column">
            <div className="concepts-card glass-panel">
              <h3>Form Validation Architecture</h3>
              <p className="card-desc">Click tabs to learn details about React form states and validation handlers:</p>

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
        <p>© 2026 SecureRegister Portal • React Form Validation Lab 16</p>
      </footer>
    </div>
  );
}

export default App;
