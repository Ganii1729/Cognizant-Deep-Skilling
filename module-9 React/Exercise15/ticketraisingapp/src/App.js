import React, { useState } from 'react';
import ComplaintRegister from './components/ComplaintRegister';
import './App.css';

function App() {
  // State for raised complaints list
  const [complaints, setComplaints] = useState([
    {
      refNumber: 'REF-3B9A8Z',
      employeeName: 'Jane Smith',
      complaintText: 'Monitor flickers constantly on my workstation.',
      category: 'IT Support',
      date: '19/07/2026',
      status: 'Open'
    },
    {
      refNumber: 'REF-5X2Y1W',
      employeeName: 'John Doe',
      complaintText: 'Need reimbursement status for recent travel expense bill.',
      category: 'Accounts / Finance',
      date: '18/07/2026',
      status: 'In Progress'
    }
  ]);

  const [activeTab, setActiveTab] = useState('forms');

  const formConcepts = {
    forms: {
      title: 'React Forms Overview',
      text: 'In React, forms allow you to capture inputs from users. Unlike standard HTML where forms trigger full page reloads upon submission, React intercepts the submit event to execute JavaScript handler code directly.'
    },
    controlled: {
      title: 'Controlled Components',
      text: 'An input element whose value is controlled by React state is called a controlled component. The value of the input is read from the state, and any updates are updated in the state using an onChange event handler.'
    },
    controls: {
      title: 'Various Input Controls',
      text: 'React handles various input types (textbox, textarea, checkboxes, radio buttons, and select dropdowns) by mapping their value attribute to state and capturing events on update.'
    },
    handling: {
      title: 'Handling Form States',
      text: 'Form elements are handled using callback functions attached to onChange events. These callbacks extract value from e.target.value and trigger setState to update state.'
    },
    submitting: {
      title: 'Submitting React Forms',
      text: 'React forms handle submit using the onSubmit attribute on the <form> tag. Inside the submission handler, calling e.preventDefault() is required to stop the browser from refreshing the page.'
    }
  };

  const handleRegisterComplaint = (newComplaint) => {
    setComplaints(prev => [newComplaint, ...prev]);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="nav-bar glass-panel">
          <span className="brand-logo">🛠️ HelpDesk <span className="logo-accent">Portal</span></span>
          <span className="badge">Service Desk App</span>
        </div>
        
        <div className="hero-banner">
          <h1>Raise A Support Complaint</h1>
          <p>Register issues instantly. Enter your details below, and our team will get them resolved quickly.</p>
        </div>
      </header>

      <main className="main-content">
        <div className="content-layout">
          {/* Left Column: Complaint Registration Form */}
          <div className="left-column">
            <ComplaintRegister onRegister={handleRegisterComplaint} />
          </div>

          {/* Right Column: Active complaints feed & Concepts accordion */}
          <div className="right-column">
            {/* Active Complaints feed listing */}
            <div className="complaints-feed glass-panel">
              <h3>Active Tickets Feed</h3>
              <p className="feed-desc">Live status of issues registered by employees in the system.</p>

              <div className="feed-list">
                {complaints.length === 0 ? (
                  <p className="empty-feed">No active tickets registered.</p>
                ) : (
                  complaints.map((ticket) => (
                    <div key={ticket.refNumber} className="ticket-card">
                      <div className="ticket-header">
                        <span className="ticket-ref">{ticket.refNumber}</span>
                        <span className={`status-tag status-${ticket.status.toLowerCase().replace(' ', '-')}`}>
                          {ticket.status}
                        </span>
                      </div>
                      <div className="ticket-body">
                        <p className="ticket-description">"{ticket.complaintText}"</p>
                        <div className="ticket-meta">
                          <span>By: <strong>{ticket.employeeName}</strong></span>
                          <span>Dept: {ticket.category}</span>
                          <span>Registered: {ticket.date}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Interactive Concepts panel */}
            <div className="concepts-card glass-panel">
              <h3>React Form Architecture</h3>
              <p className="card-desc">Click tabs to view descriptions of key form objectives:</p>

              <div className="tabs-list">
                {Object.keys(formConcepts).map((key) => (
                  <button
                    key={key}
                    className={`tab-btn ${activeTab === key ? 'active' : ''}`}
                    onClick={() => setActiveTab(key)}
                  >
                    {formConcepts[key].title}
                  </button>
                ))}
              </div>

              <div className="tab-body">
                <h4>{formConcepts[activeTab].title}</h4>
                <p>{formConcepts[activeTab].text}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2026 HelpDesk Complaint Portal • Controlled Forms Lab 15</p>
      </footer>
    </div>
  );
}

export default App;
