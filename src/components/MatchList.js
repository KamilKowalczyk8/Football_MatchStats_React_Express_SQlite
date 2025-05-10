import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const [scores, setScores] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3000/api/matches')
      .then(response => {
        const matchesData = response.data;
        setMatches(matchesData);

        matchesData.forEach(match => {
          axios.get(`http://localhost:3000/api/matches/${match.id}/stats`)
            .then(statsResponse => {
              const stats = statsResponse.data;
              const teamGoals = {};

              stats.forEach(player => {
                teamGoals[player.team] = (teamGoals[player.team] || 0) + (player.goals || 0);
              });

              setScores(prevScores => ({
                ...prevScores,
                [match.id]: teamGoals
              }));
            });
        });
      });
  }, []);

  return (
    <div className="container">
      <div className="matches-container">
        <table className="match-table">
          <thead>
            <tr>
              <th>Mecze</th>
              <th>Data</th>
              <th>Wynik</th>
              <th>Statystyki</th>
            </tr>
          </thead>
          <tbody>
            {matches.map(match => (
              <tr key={match.id}>
                <td><strong>{match.team1}</strong> vs <strong>{match.team2}</strong></td>
                <td>{match.match_date}</td>
                <td>
                  {scores[match.id] ? 
                    `${scores[match.id][match.team1] || 0} - ${scores[match.id][match.team2] || 0}` : 
                    'Loading...'}
                </td>
                <td>
                  <Link to={`/match/${match.id}/stats`} className="stats-link">
                    Zobacz statystyki
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatchList;
