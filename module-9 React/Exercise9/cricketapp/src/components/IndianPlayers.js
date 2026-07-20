import React from 'react';

const IndianPlayers = () => {
  const squad = [
    'Virat Kohli',     // 1st (index 0 - Odd Player)
    'Rohit Sharma',    // 2nd (index 1 - Even Player)
    'Jasprit Bumrah',  // 3rd (index 2 - Odd Player)
    'KL Rahul',        // 4th (index 3 - Even Player)
    'Rishabh Pant',    // 5th (index 4 - Odd Player)
    'Shubman Gill'     // 6th (index 5 - Even Player)
  ];

  // Destructuring features of ES6
  const [first, second, third, fourth, fifth, sixth] = squad;
  const oddTeam = [first, third, fifth];
  const evenTeam = [second, fourth, sixth];

  // Merge feature of ES6 (Spread operator)
  const T20players = ['Virat Kohli', 'Rohit Sharma', 'Hardik Pandya', 'Suryakumar Yadav'];
  const RanjiTrophyPlayers = ['Ajinkya Rahane', 'Cheteshwar Pujara', 'Hanuma Vihari', 'Sarfaraz Khan'];
  const mergedPlayers = [...T20players, ...RanjiTrophyPlayers];

  return (
    <div className="cricket-card">
      <div className="card-header">
        <h3>🇮🇳 Indian Players Breakdown</h3>
        <p>Squad analysis using ES6 Destructuring & Spread operator</p>
      </div>

      <div className="tables-container">
        {/* Odd vs Even Players */}
        <div className="table-wrapper">
          <h4>Odd Team Players (1st, 3rd, 5th)</h4>
          <ul className="players-list">
            {oddTeam.map((player, idx) => (
              <li key={idx} className="player-item odd-item">🏃 {player}</li>
            ))}
          </ul>

          <h4 style={{ marginTop: '2rem' }}>Even Team Players (2nd, 4th, 6th)</h4>
          <ul className="players-list">
            {evenTeam.map((player, idx) => (
              <li key={idx} className="player-item even-item">🏃 {player}</li>
            ))}
          </ul>
        </div>

        {/* Merged Players list */}
        <div className="table-wrapper">
          <h4>Merged Players (T20 + Ranji Trophy)</h4>
          <ul className="players-list merged-list">
            {mergedPlayers.map((player, idx) => {
              const isT20 = T20players.includes(player);
              return (
                <li key={idx} className="player-item merged-item">
                  <span>🏃 {player}</span>
                  <span className={`player-badge ${isT20 ? 't20-badge' : 'ranji-badge'}`}>
                    {isT20 ? 'T20' : 'Ranji'}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IndianPlayers;
