import React, { Component } from 'react';

class Getuser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      person: null,
      error: null
    };
  }

  // Fetch user data asynchronously when component mounts
  async componentDidMount() {
    this.fetchUser();
  }

  // Reusable method to query the REST API
  fetchUser = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch('https://api.randomuser.me/');
      if (!response.ok) {
        throw new Error('Failed to retrieve user details from api.');
      }
      const data = await response.json();
      this.setState({ person: data.results[0], loading: false });
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  };

  render() {
    const { loading, person, error } = this.state;

    if (loading) {
      return (
        <div className="card glass-panel user-card flex-center">
          <div className="spinner"></div>
          <p className="loading-text">Fetching secure profile...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="card glass-panel user-card error-card">
          <span className="error-icon">⚠️</span>
          <h4>Retrieval Failed</h4>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={this.fetchUser}>
            Try Again
          </button>
        </div>
      );
    }

    if (!person) return null;

    const { name, picture, email, location } = person;

    return (
      <div className="card glass-panel user-card">
        <div className="user-avatar-container">
          {/* JSX Attribute binding for random user picture */}
          <img 
            src={picture.large} 
            alt={`${name.first} avatar`} 
            className="user-avatar"
          />
          <span className="title-tag">{name.title}</span>
        </div>

        <div className="user-details">
          {/* Display title and firstname */}
          <h2>{name.title} {name.first}</h2>
          <p className="user-email">✉️ {email}</p>
          <p className="user-location">📍 {location.city}, {location.country}</p>
        </div>

        <button className="btn btn-primary" onClick={this.fetchUser}>
          Fetch Next Profile
        </button>
      </div>
    );
  }
}

export default Getuser;
