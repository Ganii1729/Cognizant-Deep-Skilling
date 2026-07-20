import React from 'react';
import { Link } from 'react-router-dom';
import { trainersMock } from '../TrainersMock';

const TrainersList = () => {
  return (
    <div className="trainers-list-container">
      <h2>Registered Academy Trainers</h2>
      <p className="subtitle">Click on a trainer's name to view their full profile, technical expertise, and contact details.</p>
      
      <div className="list-wrapper">
        {trainersMock.map(trainer => (
          <Link key={trainer.TrainerId} to={`/trainers/${trainer.TrainerId}`} className="trainer-link-item">
            <div className="trainer-avatar-small">{trainer.Name.charAt(0)}</div>
            <div className="trainer-link-info">
              <span className="trainer-link-name">{trainer.Name}</span>
              <span className="trainer-link-tech">{trainer.Technology}</span>
            </div>
            <span className="arrow-icon">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrainersList;
