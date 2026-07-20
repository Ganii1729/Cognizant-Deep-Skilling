import React, { useState } from 'react';
import './App.css';

function App() {
  // State variables
  const [count, setCount] = useState(0);
  const [greeting, setGreeting] = useState('');
  const [message, setMessage] = useState('');
  const [clickStatus, setClickStatus] = useState('');
  const [inrAmount, setInrAmount] = useState('');
  const [eurResult, setEurResult] = useState(null);

  // Theoretical content shown in the UI
  const [activeTab, setActiveTab] = useState('events');

  const docTabs = {
    events: {
      title: 'React Events',
      text: 'React elements handle events similarly to HTML elements. However, React events are named using camelCase and functions are passed as event handlers rather than strings.'
    },
    handlers: {
      title: 'Event Handlers',
      text: 'Event handlers are functions that run when an event is triggered. In functional components, they are defined as regular functions or arrow functions and bound directly in JSX.'
    },
    synthetic: {
      title: 'Synthetic Event',
      text: 'React wraps the native browser events in a cross-browser wrapper called SyntheticEvent. It has the same interface as the native event (like stopPropagation() and preventDefault()) but works identically across all browsers.'
    },
    naming: {
      title: 'Naming Conventions',
      text: 'React uses camelCase for events (e.g. onClick, onChange, onSubmit) instead of the standard lowercase HTML naming (onclick, onchange, onsubmit).'
    }
  };

  // 1a & 1b. Increment handler executing multiple tasks
  const handleIncrement = () => {
    setCount(prev => prev + 1);
    setGreeting('Hello! Welcome to React Event Handling!');
  };

  // Decrement handler
  const handleDecrement = () => {
    setCount(prev => prev - 1);
  };

  // 2. Parameterized handler
  const handleWelcome = (arg) => {
    setMessage(`Received argument: "${arg}"`);
  };

  // 3. Synthetic Event click handler
  const handlePress = (e) => {
    setClickStatus('I was clicked');
    console.log('Synthetic Event details:', {
      eventType: e.type,
      targetTagName: e.target.tagName,
      nativeEvent: e.nativeEvent
    });
  };

  // 4. Currency conversion handler (INR to EUR)
  const handleConvert = (e) => {
    e.preventDefault();
    const rupees = parseFloat(inrAmount);
    if (!isNaN(rupees) && rupees >= 0) {
      // Current rate: 1 INR = 0.011 EUR
      const rate = 0.011;
      setEurResult(rupees * rate);
    } else {
      setEurResult(null);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-box">
          <span className="logo-text">⚡ Event<span className="gradient-word">Lab</span></span>
          <span className="meta-badge">Exercise 11</span>
        </div>
        <div className="hero-text">
          <h1>React Event Handling</h1>
          <p>Interactive playground illustrating React events, parameter binding, synthetic wrappers, and form submission.</p>
        </div>
      </header>

      <main className="main-content">
        {/* ROW 1: Counter & Parameters Demos */}
        <div className="grid-row">
          {/* Card 1: Counter Demo (Compound Logic) */}
          <div className="card glass-card">
            <h2 className="card-title">1. Counter Events</h2>
            <p className="card-desc">Increments & decrements. The increment action runs multiple methods under the hood.</p>
            
            <div className="counter-display">
              <span className="counter-num">{count}</span>
            </div>

            <div className="button-group">
              <button className="btn btn-primary" onClick={handleIncrement}>
                Increment
              </button>
              <button className="btn btn-secondary" onClick={handleDecrement}>
                Decrement
              </button>
            </div>

            {greeting && (
              <div className="info-badge green-badge">
                <span className="icon">💬</span> {greeting}
              </div>
            )}
          </div>

          {/* Card 2: Parameterized Greeting & Synthetic Event */}
          <div className="card glass-card">
            <h2 className="card-title">2 & 3. Parameterized & Synthetic Events</h2>
            <p className="card-desc">Binding parameters to custom handlers and analyzing React SyntheticEvent wrapper.</p>
            
            <div className="demo-block">
              <h5>Parameterized Handler:</h5>
              <button className="btn btn-accent" onClick={() => handleWelcome('welcome')}>
                Say Welcome
              </button>
              {message && (
                <div className="info-badge blue-badge">
                  <span className="icon">🎯</span> {message}
                </div>
              )}
            </div>

            <div className="demo-block separator">
              <h5>Synthetic Event ("OnPress" mockup):</h5>
              <button className="btn btn-outline" onClick={handlePress}>
                Trigger OnPress
              </button>
              {clickStatus && (
                <div className="info-badge purple-badge">
                  <span className="icon">🖱️</span> {clickStatus} (Logged to console)
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ROW 2: Currency Converter & Theory */}
        <div className="grid-row">
          {/* Card 3: Currency Converter Component */}
          <div className="card glass-card">
            <h2 className="card-title">4. Currency Converter</h2>
            <p className="card-desc">Converts Indian Rupees (INR) to Euros (EUR) on form submission.</p>

            <form onSubmit={handleConvert} className="converter-form">
              <div className="form-group">
                <label htmlFor="inr-input">Amount in Indian Rupees (INR):</label>
                <div className="input-wrapper">
                  <span className="currency-prefix">₹</span>
                  <input
                    id="inr-input"
                    type="number"
                    placeholder="Enter INR amount"
                    value={inrAmount}
                    onChange={(e) => setInrAmount(e.target.value)}
                    min="0"
                    step="any"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Convert to EUR
              </button>
            </form>

            {eurResult !== null && (
              <div className="converter-result">
                <div className="result-row">
                  <span className="result-label">Result in EUR:</span>
                  <span className="result-value">
                    € {eurResult.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="conversion-note">Conversion Rate: 1 INR = € 0.011 EUR</p>
              </div>
            )}
          </div>

          {/* Card 4: Interactive Concepts Tab Guide */}
          <div className="card glass-card">
            <h2 className="card-title">Concept Quick-Reference</h2>
            <p className="card-desc">Learn the theoretical fundamentals behind React's event architecture.</p>

            <div className="tabs-container">
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

              <div className="tab-pane">
                <h4>{docTabs[activeTab].title}</h4>
                <p>{docTabs[activeTab].text}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2026 EventExamplesApp • React Event Handling Hands-on Lab 11</p>
      </footer>
    </div>
  );
}

export default App;
