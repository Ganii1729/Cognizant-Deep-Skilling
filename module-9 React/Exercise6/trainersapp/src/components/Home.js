import React from 'react';

const Home = () => {
  return (
    <div className="home-container">
      <div className="welcome-banner">
        <h2>Welcome to Cognizant Academy Trainers Portal</h2>
        <p className="welcome-text">
          Manage, explore, and view the expertise profiles of our world-class trainers across various technologies, streams, and skills.
        </p>
        <div className="feature-grid">
          <div className="feature-card">
            <span className="feat-icon">🎯</span>
            <h4>Expert Stream Alignments</h4>
            <p>Trainers specialized in Java, React, Cloud, DevOps, and Machine Learning.</p>
          </div>
          <div className="feature-card">
            <span className="feat-icon">⚡</span>
            <h4>Real-time Access</h4>
            <p>Search and inspect certified expert trainers, their skills, and direct contacts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
