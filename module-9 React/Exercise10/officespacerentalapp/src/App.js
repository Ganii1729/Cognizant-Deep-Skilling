import React, { useState } from 'react';
import './App.css';

function App() {
  // 1. Single Office Object (displays details like Name, Rent, and Address)
  const featuredOffice = {
    name: 'Vanguard Corporate HQ',
    rent: 75000,
    address: '101 Skyline Blvd, Suite 500, Tech District',
    image: '/images/office_vanguard.png',
    features: ['Panoramic City View', 'Fiber Optic Internet', 'Executive Boardroom', 'Private Lounge']
  };

  // 2. List of Objects (to loop through and display more data)
  const officeSpaces = [
    {
      id: 1,
      name: 'Summit Workspace',
      rent: 52000,
      address: '404 Apex Heights, Downtown',
      image: '/images/office_summit.png',
      features: ['Shared Hot Desks', '24/7 Access', 'Coffee Bar', 'Meeting Rooms']
    },
    {
      id: 2,
      name: 'Co-Creative Hub',
      rent: 48000,
      address: '88 Innovation Way, Arts District',
      image: '/images/office_cocreative.png',
      features: ['Artistic Decor', 'Photo Studio', 'Community Events', 'Pet Friendly']
    },
    {
      id: 3,
      name: 'Vanguard Corporate HQ',
      rent: 75000,
      address: '101 Skyline Blvd, Suite 500, Tech District',
      image: '/images/office_vanguard.png',
      features: ['Panoramic City View', 'Fiber Optic Internet', 'Executive Boardroom', 'Private Lounge']
    }
  ];

  // State to manage active tab in the Theory / Concepts Guide
  const [activeConcept, setActiveConcept] = useState('jsx');

  // Theory content mapped to state keys
  const concepts = {
    jsx: {
      title: 'What is JSX?',
      description: 'JSX stands for JavaScript XML. It is a syntax extension to JavaScript that allows you to write HTML-like structure directly within JavaScript files.',
      example: 'const element = <h1 className="title">Hello World</h1>;'
    },
    ecmascript: {
      title: 'ECMAScript (ES)',
      description: 'ECMAScript is the standard specification that defines JavaScript. React uses modern ES features (ES6+) like const/let, arrow functions, destructuring, and array helper methods (.map, .filter).',
      // eslint-disable-next-line no-template-curly-in-string
      example: 'const formatCurrency = (val) => `₹${val.toLocaleString()}`;'
    },
    createelement: {
      title: 'React.createElement()',
      description: 'Babel compiles JSX tags down to React.createElement() calls. It is the underlying React engine method that creates a virtual representation of a DOM element.',
      example: '// JSX compiles to:\nReact.createElement("h1", { className: "title" }, "Hello World");'
    },
    nodes: {
      title: 'React Nodes with JSX',
      description: 'React nodes are created using standard tags (e.g. <div>) or React Component classes (e.g. <OfficeCard />). Every JSX element is evaluated as a React node.',
      example: 'const node = <div className="card"><img src={imageSrc} /></div>;'
    },
    render: {
      title: 'Rendering JSX to DOM',
      description: 'To render JSX, we use ReactDOM.createRoot() to designate a mount container in the HTML and call the .render() method with our root JSX component.',
      example: 'const root = ReactDOM.createRoot(document.getElementById("root"));\nroot.render(<App />);'
    },
    expressions: {
      title: 'JS Expressions in JSX',
      description: 'Any valid JavaScript expression (variables, mathematical operations, function calls, conditional ternary expressions) can be embedded in JSX using single curly braces {}.',
      example: '<h2>Rent: ₹{office.rent}</h2>\n<p>Status: {office.rent > 60000 ? "Premium" : "Budget"}</p>'
    },
    inlinecss: {
      title: 'Inline CSS in JSX',
      description: 'Inline styles are passed as JavaScript objects with camelCase property names instead of hyphenated CSS string selectors. This requires double curly braces {{}}.',
      example: '<span style={{ color: rent < 60000 ? "red" : "green", fontWeight: "bold" }}>'
    }
  };

  // Helper function to format currency in INR
  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="app-container">
      {/* 1. Element to display the heading of the page */}
      <header className="hero-header">
        <div className="glass-nav">
          <span className="logo">🏢 OfficeSpace<span className="text-gradient">Rental</span></span>
          <span className="badge">React Hands-on Lab 10</span>
        </div>
        
        <div className="hero-content">
          <h1>Find Your Perfect <span className="text-gradient">Workspace</span></h1>
          <p>Explore high-quality workspaces tailored to your business needs, featuring flexible rent terms and premium locations.</p>
        </div>
      </header>

      <main className="main-content">
        {/* SECTION 1: Featured Office Space Detail (Single Object Display) */}
        <section className="section featured-section">
          <h2 className="section-title">✨ Featured Office Space</h2>
          
          <div className="featured-card glass-panel">
            {/* Attribute to display the image of the office space */}
            <div className="featured-image-container">
              <img 
                src={featuredOffice.image} 
                alt={featuredOffice.name} 
                className="featured-image" 
              />
              <div className="rent-badge-overlay" style={{
                backgroundColor: featuredOffice.rent < 60000 ? 'rgba(239, 68, 68, 0.9)' : 'rgba(34, 197, 94, 0.9)'
              }}>
                {formatINR(featuredOffice.rent)} / mo
              </div>
            </div>
            
            <div className="featured-details">
              <span className="tag">Exquisite Location</span>
              <h3>{featuredOffice.name}</h3>
              
              <p className="address">
                <span className="icon">📍</span> {featuredOffice.address}
              </p>
              
              {/* Applying CSS dynamically based on rent value: Color of rent in Red if < 60000, Green if > 60000 */}
              <div className="rent-info">
                <span>Monthly Investment:</span>
                <span 
                  className="rent-value"
                  style={{
                    color: featuredOffice.rent < 60000 ? '#ef4444' : '#22c55e',
                    fontWeight: 'bold',
                    textShadow: featuredOffice.rent < 60000 
                      ? '0 0 10px rgba(239, 68, 68, 0.2)' 
                      : '0 0 10px rgba(34, 197, 94, 0.2)'
                  }}
                >
                  {formatINR(featuredOffice.rent)}
                </span>
              </div>

              <div className="features-list">
                {featuredOffice.features.map((feature, i) => (
                  <span key={i} className="feature-pill">{feature}</span>
                ))}
              </div>

              <button className="btn btn-primary">Book Viewing Now</button>
            </div>
          </div>
        </section>

        {/* SECTION 2: List of Objects (Looping through space items) */}
        <section className="section list-section">
          <h2 className="section-title">📂 Browse Available Workspace Catalog</h2>
          <p className="section-subtitle">Looped through a list of office objects to render additional available properties</p>
          
          <div className="office-grid">
            {officeSpaces.map((office) => {
              // Applying dynamic Inline CSS: Red if rent < 60000, Green if rent > 60000
              const rentColor = office.rent < 60000 ? '#ef4444' : '#22c55e';
              
              return (
                <div key={office.id} className="office-card glass-panel">
                  <div className="card-image-wrapper">
                    {/* JSX Attribute binding */}
                    <img 
                      src={office.image} 
                      alt={office.name} 
                      className="card-image"
                    />
                    <span className="price-tag" style={{ backgroundColor: rentColor }}>
                      {formatINR(office.rent)}
                    </span>
                  </div>
                  
                  <div className="card-body">
                    <h4>{office.name}</h4>
                    <p className="card-address">
                      <span className="icon">📍</span> {office.address}
                    </p>
                    
                    <div className="card-rent-row">
                      <span className="rent-label">Monthly Rent:</span>
                      <span 
                        className="rent-amount" 
                        style={{ color: rentColor, fontWeight: '700' }}
                      >
                        {formatINR(office.rent)}
                      </span>
                    </div>

                    <div className="card-features">
                      {office.features.slice(0, 3).map((feat, index) => (
                        <span key={index} className="mini-pill">{feat}</span>
                      ))}
                    </div>

                    <button className="btn btn-secondary">Inquire Space</button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: Conceptual Laboratory Explorer (Interactive GUI explaining objectives) */}
        <section className="section theory-section glass-panel">
          <h2 className="section-title text-center">📘 React JSX & ES6 Concepts Guide</h2>
          <p className="section-subtitle text-center">Interactive dashboard explaining the core objectives of this laboratory</p>
          
          <div className="concept-explorer">
            <div className="concept-sidebar">
              {Object.keys(concepts).map((key) => (
                <button
                  key={key}
                  className={`concept-tab ${activeConcept === key ? 'active' : ''}`}
                  onClick={() => setActiveConcept(key)}
                >
                  {concepts[key].title}
                </button>
              ))}
            </div>

            <div className="concept-display">
              <h3>{concepts[activeConcept].title}</h3>
              <p className="concept-desc">{concepts[activeConcept].description}</p>
              
              <div className="code-block-wrapper">
                <span className="code-header">CODE REPRESENTATION / EXAMPLE</span>
                <pre className="code-pre">
                  <code>{concepts[activeConcept].example}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>© 2026 OfficeSpaceRental App. Created for Cognizant DeepSkilling React Lab 10.</p>
          <div className="footer-tags">
            <span>JSX Elements</span>
            <span>Inline CSS</span>
            <span>Object Maps</span>
            <span>JS Expressions</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
