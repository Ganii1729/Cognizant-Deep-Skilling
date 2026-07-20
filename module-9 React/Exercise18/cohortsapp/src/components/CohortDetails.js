import React from 'react';

function CohortDetails({ cohort }) {
  if (!cohort) {
    return null;
  }

  return (
    <div className="cohort-card">
      <h3>{cohort.code}</h3>
      <div className="cohort-body">
        <p className="course-name"><strong>Course:</strong> {cohort.courseName}</p>
        <p className="duration"><strong>Duration:</strong> {cohort.duration}</p>
        <p className="status"><strong>Status:</strong> {cohort.status}</p>
      </div>
    </div>
  );
}

export default CohortDetails;
