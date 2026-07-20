import React, { useState } from 'react';
import './App.css';

// Component that prevents rendering by returning null when there is no booking
function BookingReceipt({ booking }) {
  if (!booking) {
    return null; // Prevents component from rendering
  }

  return (
    <div className="receipt-card glass-panel animate-receipt">
      <div className="receipt-header">
        <h4>🎫 Boarding Pass Confirmation</h4>
        <span className="pnr-badge">PNR: {booking.pnr}</span>
      </div>
      <div className="receipt-body">
        <div className="receipt-row">
          <span>Passenger:</span>
          <strong>{booking.name}</strong>
        </div>
        <div className="receipt-row">
          <span>Flight:</span>
          <strong>{booking.flightCode}</strong>
        </div>
        <div className="receipt-row">
          <span>Route:</span>
          <strong>{booking.route}</strong>
        </div>
        <div className="receipt-row">
          <span>Seat:</span>
          <strong>{booking.seat}</strong>
        </div>
        <div className="receipt-row">
          <span>Status:</span>
          <span className="status-confirmed">Confirmed</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [travelerName, setTravelerName] = useState('');
  const [selectedSeat, setSelectedSeat] = useState('12A');
  const [booking, setBooking] = useState(null);
  const [activeTab, setActiveTab] = useState('condRender');

  // Hardcoded flight details
  const flightDetails = {
    code: 'SP-777',
    airline: 'SkyPass Airways',
    route: 'New Delhi (DEL) ➔ London (LHR)',
    departure: '04:30 AM',
    arrival: '09:45 AM',
    price: 48500,
    duration: '9h 45m',
    aircraft: 'Boeing 787 Dreamliner'
  };

  const docTabs = {
    condRender: {
      title: 'Conditional Rendering',
      text: 'In React, you can conditionally render UI elements based on state or props using standard JavaScript operators like if/else, ternary operators (? :), or short-circuit logical operators (&&).'
    },
    elementVars: {
      title: 'Element Variables',
      text: 'You can store JSX elements inside regular JavaScript variables. This allows you to write conditional logic outside the return statement, keeping the JSX clean and readable.'
    },
    preventRender: {
      title: 'Preventing Rendering',
      text: 'To prevent a component from rendering even if it is declared in the JSX parent, return null from its render method. This is useful for modal dialogs, status badges, or conditionally displayed receipts.'
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setBooking(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setBooking(null);
    setTravelerName('');
  };

  const handleBookTicket = (e) => {
    e.preventDefault();
    if (!travelerName.trim()) return;

    // Generate random PNR
    const pnr = Math.random().toString(36).substring(2, 8).toUpperCase();
    setBooking({
      name: travelerName,
      seat: selectedSeat,
      flightCode: flightDetails.code,
      route: flightDetails.route,
      pnr: pnr
    });
  };

  // --- Element Variables for Conditional Rendering ---
  let viewContent;

  if (isLoggedIn) {
    // Logged-in User View: Flight Details + Booking Panel
    viewContent = (
      <div className="user-view animate-fade">
        <div className="alert-banner success-alert">
          <span>🔓 You are logged in. Booking options are now available.</span>
        </div>

        <div className="booking-panel glass-panel">
          <h3>Confirm Your Flight Booking</h3>
          <p className="sub-header">Select your options and input passenger details below.</p>

          <form onSubmit={handleBookTicket} className="booking-form">
            <div className="form-group">
              <label htmlFor="passenger-name">Traveler Name:</label>
              <input
                id="passenger-name"
                type="text"
                placeholder="Enter traveler's full name"
                value={travelerName}
                onChange={(e) => setTravelerName(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="seat-select">Select Seat Class:</label>
                <select
                  id="seat-select"
                  value={selectedSeat}
                  onChange={(e) => setSelectedSeat(e.target.value)}
                >
                  <option value="03A">03A (First Class)</option>
                  <option value="08F">08F (Business Class)</option>
                  <option value="12A">12A (Economy Window)</option>
                  <option value="14C">14C (Economy Aisle)</option>
                  <option value="22D">22D (Economy Middle)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Ticket Rate:</label>
                <div className="price-display">
                  ₹{flightDetails.price.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Book Tickets Now
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    // Guest View: Flight Details + Login Call to Action
    viewContent = (
      <div className="guest-view animate-fade">
        <div className="alert-banner warning-alert">
          <span>🔒 Booking is disabled. You are browsing the portal as a guest.</span>
        </div>

        <div className="cta-panel glass-panel">
          <div className="cta-content">
            <h3>Ready to Book Your Journey?</h3>
            <p>Please log in to reserve your seats, customize meals, and checkout secure tickets.</p>
          </div>
          <button className="btn btn-primary" onClick={handleLogin}>
            Sign In to Book
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="nav-bar glass-panel">
          <span className="brand-logo">✈️ SkyPass <span className="logo-accent">Travel</span></span>
          <div className="auth-btn-wrapper">
            {/* Conditional inline operator for authentication controls */}
            {isLoggedIn ? (
              <button className="btn btn-logout" onClick={handleLogout}>
                Sign Out
              </button>
            ) : (
              <button className="btn btn-login" onClick={handleLogin}>
                Sign In
              </button>
            )}
          </div>
        </div>

        <div className="hero-banner">
          <h1>Configure Your Journey</h1>
          <p>Browse current schedules, plane specs, and secure flight bookings dynamically.</p>
        </div>
      </header>

      <main className="main-content">
        <div className="content-layout">
          {/* Left Column: Flight Details & Conditional views */}
          <div className="left-column">
            {/* General Flight Info Card (Accessible to both Guest and User) */}
            <div className="flight-card glass-panel">
              <div className="flight-header">
                <span className="airline-badge">{flightDetails.airline}</span>
                <span className="flight-code">{flightDetails.code}</span>
              </div>

              <div className="flight-route-row">
                <div className="route-terminal">
                  <h2>DEL</h2>
                  <span className="terminal-time">{flightDetails.departure}</span>
                  <span className="terminal-city">New Delhi, IN</span>
                </div>

                <div className="route-divider">
                  <span className="duration-label">{flightDetails.duration}</span>
                  <div className="plane-line">
                    <span className="plane-icon">✈️</span>
                  </div>
                  <span className="aircraft-label">{flightDetails.aircraft}</span>
                </div>

                <div className="route-terminal">
                  <h2>LHR</h2>
                  <span className="terminal-time">{flightDetails.arrival}</span>
                  <span className="terminal-city">London, UK</span>
                </div>
              </div>
            </div>

            {/* Render conditional content (element variable) */}
            {viewContent}
          </div>

          {/* Right Column: Ticket Confirmation & Concepts */}
          <div className="right-column">
            {/* Booking Receipts Panel (renders only when booking state exists, otherwise returns null) */}
            <BookingReceipt booking={booking} />

            {/* Concepts Panel */}
            <div className="card glass-panel concepts-card">
              <h3>Flight System Architecture</h3>
              <p className="card-desc">Objectives overview of key React concepts implemented in this application:</p>

              <div className="tabs-menu">
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

              <div className="tab-body">
                <h4>{docTabs[activeTab].title}</h4>
                <p>{docTabs[activeTab].text}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2026 SkyPass Airways • Conditional Rendering Lab 12</p>
      </footer>
    </div>
  );
}

export default App;
