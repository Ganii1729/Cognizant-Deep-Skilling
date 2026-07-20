import React, { useState } from 'react';
import CalculateScore from './components/CalculateScore';
import './Stylesheets/mystyle.css';

function App() {
  const [student, setStudent] = useState({
    name: 'John Doe',
    school: 'Springdale High School',
    total: '425',
    goal: '80'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Student Score Calculator</h1>
        <p>Analyze and track performance metrics in real-time</p>
      </header>

      <div className="calculator-layout">
        <div className="input-form-card">
          <h3>Enter Details</h3>
          <div className="form-group">
            <label htmlFor="name">Student Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={student.name} 
              onChange={handleChange} 
              placeholder="e.g. John Doe"
            />
          </div>
          <div className="form-group">
            <label htmlFor="school">School Name</label>
            <input 
              type="text" 
              id="school" 
              name="school" 
              value={student.school} 
              onChange={handleChange} 
              placeholder="e.g. Springdale High"
            />
          </div>
          <div className="form-group">
            <label htmlFor="total">Total Score (out of 500)</label>
            <input 
              type="number" 
              id="total" 
              name="total" 
              value={student.total} 
              onChange={handleChange} 
              min="0"
              max="500"
              placeholder="e.g. 425"
            />
          </div>
          <div className="form-group">
            <label htmlFor="goal">Target Goal (Average %)</label>
            <input 
              type="number" 
              id="goal" 
              name="goal" 
              value={student.goal} 
              onChange={handleChange} 
              min="0"
              max="100"
              placeholder="e.g. 80"
            />
          </div>
        </div>

        <CalculateScore 
          Name={student.name}
          School={student.school}
          Total={student.total || '0'}
          goal={student.goal || '0'}
        />
      </div>
    </div>
  );
}

export default App;
