import React, { useContext } from 'react';
import ThemeContext from '../ThemeContext';

function EmployeeCard({ employee }) {
  // Retrieve the theme from Context
  const theme = useContext(ThemeContext);

  return (
    <div className="employee-card glass-panel">
      <div className="card-avatar">
        <span>{employee.name.charAt(0)}</span>
      </div>
      
      <div className="card-info">
        <h4>{employee.name}</h4>
        <p className="role">{employee.role}</p>
        <p className="dept">📍 {employee.dept}</p>
        <p className="email">✉️ {employee.email}</p>
      </div>

      {/* Dynamically apply class name using the theme value */}
      <button className={`btn btn-${theme}`}>
        View Profile
      </button>
    </div>
  );
}

export default EmployeeCard;
