import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { trainersMock } from '../TrainersMock';

const TrainerDetail = () => {
  const { id } = useParams();
  const trainer = trainersMock.find(t => t.TrainerId.toString() === id);

  if (!trainer) {
    return (
      <div className="trainer-detail-container error-state">
        <h3>Trainer Profile Not Found</h3>
        <p>No trainer details were found for ID: {id}</p>
        <Link to="/trainers" className="back-btn">Back to Trainers List</Link>
      </div>
    );
  }

  return (
    <div className="trainer-detail-container">
      <div className="trainer-card-large">
        <div className="trainer-card-header">
          <div className="trainer-avatar-large">{trainer.Name.charAt(0)}</div>
          <div className="trainer-header-text">
            <h2>{trainer.Name}</h2>
            <span className="tech-badge">{trainer.Technology}</span>
          </div>
        </div>
        
        <div className="trainer-card-body">
          <div className="info-row">
            <span className="info-label">Trainer ID</span>
            <span className="info-val">T-ID: {trainer.TrainerId}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email Address</span>
            <span className="info-val">{trainer.Email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Phone Number</span>
            <span className="info-val">{trainer.Phone}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Technology Stream</span>
            <span className="info-val">{trainer.Technology}</span>
          </div>
          <div className="info-row skills-row">
            <span className="info-label">Skills & Expertise</span>
            <div className="skills-tags">
              {trainer.Skills.split(',').map((skill, index) => (
                <span key={index} className="skill-tag">{skill.trim()}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="trainer-card-footer">
          <Link to="/trainers" className="back-link-btn">← Back to Trainers List</Link>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetail;
