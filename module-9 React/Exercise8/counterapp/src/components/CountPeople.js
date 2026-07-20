import React, { Component } from 'react';

class CountPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entrycount: 0,
      exitcount: 0
    };
    // Bind methods
    this.updateEntry = this.updateEntry.bind(this);
    this.updateExit = this.updateExit.bind(this);
  }

  updateEntry() {
    this.setState(prevState => ({
      entrycount: prevState.entrycount + 1
    }));
  }

  updateExit() {
    this.setState(prevState => ({
      exitcount: prevState.exitcount + 1
    }));
  }

  render() {
    const { entrycount, exitcount } = this.state;
    const currentPeople = Math.max(0, entrycount - exitcount);

    return (
      <div className="counter-card">
        <div className="counter-header">
          <h2>🏢 Mall Visitor Tracker</h2>
          <p>Real-time Entry & Exit Counter</p>
        </div>

        <div className="counter-stats">
          <div className="stat-box entry">
            <span className="stat-icon">📥</span>
            <span className="stat-number">{entrycount}</span>
            <span className="stat-label">Total Entries</span>
          </div>
          <div className="stat-box exit">
            <span className="stat-icon">📤</span>
            <span className="stat-number">{exitcount}</span>
            <span className="stat-label">Total Exits</span>
          </div>
        </div>

        <div className="stat-current">
          <span className="current-label">Current Inside Mall</span>
          <span className="current-number">{currentPeople}</span>
        </div>

        <div className="counter-actions">
          <button className="btn btn-entry" onClick={this.updateEntry}>
            <span className="btn-icon">🚪</span> Login / Enter
          </button>
          <button className="btn btn-exit" onClick={this.updateExit}>
            <span className="btn-icon">🚪</span> Exit Mall
          </button>
        </div>
      </div>
    );
  }
}

export default CountPeople;
