import React from 'react';

const ListofPlayers = () => {
  const players = [
    { name: 'Virat Kohli', score: 110 },
    { name: 'Rohit Sharma', score: 85 },
    { name: 'KL Rahul', score: 45 },
    { name: 'Shubman Gill', score: 72 },
    { name: 'Shreyas Iyer', score: 68 },
    { name: 'Rishabh Pant', score: 95 },
    { name: 'Hardik Pandya', score: 58 },
    { name: 'Ravindra Jadeja', score: 35 },
    { name: 'Jasprit Bumrah', score: 12 },
    { name: 'Mohammed Shami', score: 8 },
    { name: 'Mohammed Siraj', score: 4 }
  ];

  // Filter players with scores >= 70 using ES6 arrow functions (scores below 70 are filtered out)
  const highScorers = players.filter(player => player.score >= 70);

  return (
    <div className="cricket-card">
      <div className="card-header">
        <h3>🏏 Indian Cricket Team Stats</h3>
        <p>List of players and their recent match scores</p>
      </div>
      
      <div className="tables-container">
        <div className="table-wrapper">
          <h4>All Players ({players.length})</h4>
          <table className="players-table">
            <thead>
              <tr>
                <th>Name</th>
                <th className="text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={index}>
                  <td>{player.name}</td>
                  <td className={`text-right ${player.score >= 70 ? 'high-score' : 'low-score'}`}>
                    {player.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-wrapper">
          <h4>Filtered Players (Score ≥ 70)</h4>
          <table className="players-table high-scorers-table">
            <thead>
              <tr>
                <th>Name</th>
                <th className="text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {highScorers.map((player, index) => (
                <tr key={index} className="high-scorer-row">
                  <td>👑 {player.name}</td>
                  <td className="text-right high-score">{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListofPlayers;
