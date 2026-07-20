import React from 'react';
import '../Stylesheets/mystyle.css';

const CalculateScore = ({ Name, School, Total, goal }) => {
  // Total is the sum of marks. We calculate the average score assuming 5 subjects (Total / 5)
  const average = (parseFloat(Total) / 5).toFixed(2);
  const isGoalMet = parseFloat(average) >= parseFloat(goal);
  const status = isGoalMet ? 'Passed' : 'Needs Improvement';

  return (
    <div className="score-card">
      <div className="school-badge">{School}</div>
      <h2 className="student-name">{Name}</h2>
      
      <div className="metrics-grid">
        <div className="metric-box">
          <span className="metric-label">Total Marks</span>
          <span className="metric-val">{Total} <span className="max-val">/ 500</span></span>
        </div>
        <div className="metric-box">
          <span className="metric-label">Average Score</span>
          <span className="metric-val">{average}%</span>
        </div>
        <div className="metric-box">
          <span className="metric-label">Target Goal</span>
          <span className="metric-val">{goal}%</span>
        </div>
      </div>

      <div className={`status-banner ${isGoalMet ? 'status-success' : 'status-danger'}`}>
        <span className="status-icon">{isGoalMet ? '🏆' : '📈'}</span>
        <span className="status-text">{status} (Goal {isGoalMet ? 'Achieved' : 'Unmet'})</span>
      </div>
    </div>
  );
};

export default CalculateScore;
