import React from 'react';
import styles from './CohortDetails.module.css';

function CohortDetails({ cohort }) {
  if (!cohort) return null;

  // Check if status is ongoing for conditional coloring
  const isOngoing = cohort.status.toLowerCase() === 'ongoing';

  return (
    <div className={styles.box}>
      {/* 3. Dynamic color style tag based on status */}
      <h3 style={{ color: isOngoing ? 'green' : 'blue' }}>
        {cohort.code}
      </h3>

      <dl>
        <dt>Course Name</dt>
        <dd>{cohort.courseName}</dd>
        
        <dt>Duration</dt>
        <dd>{cohort.duration}</dd>
        
        <dt>Status</dt>
        <dd>{cohort.status}</dd>
      </dl>
    </div>
  );
}

export default CohortDetails;
