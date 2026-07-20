import React, { useState } from 'react';

function ComplaintRegister({ onRegister }) {
  const [name, setName] = useState('');
  const [complaint, setComplaint] = useState('');
  const [category, setCategory] = useState('IT Support');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !complaint.trim()) return;

    // Generate unique reference ID
    const referenceNum = 'REF-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Alert the user with reference ID as per lab specifications
    alert(`Complaint Registered Successfully!\n\nReference Number: ${referenceNum}\nPlease save this for further follow-ups.`);

    // Forward data to parent dashboard component
    onRegister({
      refNumber: referenceNum,
      employeeName: name,
      complaintText: complaint,
      category: category,
      date: new Date().toLocaleDateString(),
      status: 'Open'
    });

    // Reset controlled components state
    setName('');
    setComplaint('');
  };

  return (
    <div className="register-panel glass-panel">
      <h3>Submit New Support Ticket</h3>
      <p className="sub-header">Please fill in details to register a complaint. A reference code will be generated.</p>
      
      <form onSubmit={handleSubmit} className="complaint-form">
        <div className="form-group">
          <label htmlFor="emp-name">Employee Name:</label>
          <input
            id="emp-name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dept-category">Issue Category:</label>
          <select
            id="dept-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="IT Support">IT Support & Hardware</option>
            <option value="HR / Payroll">HR & Payroll Inquiry</option>
            <option value="Facilities / Admin">Facilities & Maintenance</option>
            <option value="Accounts / Finance">Accounts & Billing</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="complaint-text">Describe Your Complaint:</label>
          <textarea
            id="complaint-text"
            rows="5"
            placeholder="Provide a detailed description of the issue..."
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Complaint
        </button>
      </form>
    </div>
  );
}

export default ComplaintRegister;
