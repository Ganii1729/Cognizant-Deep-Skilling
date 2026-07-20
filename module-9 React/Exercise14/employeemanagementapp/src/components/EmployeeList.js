import React from 'react';
import EmployeeCard from './EmployeeCard';

function EmployeeList({ employees }) {
  return (
    <div className="employee-list-container">
      <h3>Active Employee Directory</h3>
      <p className="list-desc">The list maps each employee to a card component. Theme properties are not passed as props here.</p>
      
      <div className="employee-grid">
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
}

export default EmployeeList;
