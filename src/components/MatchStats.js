import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../App.css";

const MatchStats = () => {
    const { id } = useParams();
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/matches/${id}/stats`)
            .then(response => {
                setStats(response.data);
                setLoading(false);
            });
    }, [id]);

    const team1 = stats.filter(stat => stat.team === stats[0]?.team);
    const team2 = stats.filter(stat => stat.team !== stats[0]?.team);

    return (
        <div className="container">
            {loading ? <div className="loading">Loading...</div> : (
                <div className="stats-container">
                    <div className="stats-header">
                        <h1>Statystyki meczu</h1>
                        <h2>{team1[0]?.team} - {team2[0]?.team}</h2>
                    </div>

                    <div className="teams-grid">
                        <div className="team-side">
                            <h2>{team1[0]?.team}</h2>
                            {team1.map(stat => (
                                <div className="player-card" key={stat.id}>
                                    <h4>{stat.name}</h4>
                                    <p>Pozycja: {stat.position}</p>
                                    <div className="player-stats">
                                        <div className="player-stat"><span>Bramki:</span> {stat.goals}</div>
                                        <div className="player-stat"><span>Asysty:</span> {stat.assists}</div>
                                        <div className="player-stat"><span>Podania:</span> {stat.passes}</div>
                                        <div className="player-stat"><span>Faule:</span> {stat.fouls}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="team-side">
                            <h2>{team2[0]?.team}</h2>
                            {team2.map(stat => (
                                <div className="player-card" key={stat.id}>
                                    <h4>{stat.name}</h4>
                                    <p>Pozycja: {stat.position}</p>
                                    <div className="player-stats">
                                        <div className="player-stat"><span>Bramki:</span> {stat.goals}</div>
                                        <div className="player-stat"><span>Asysty:</span> {stat.assists}</div>
                                        <div className="player-stat"><span>Podania:</span> {stat.passes}</div>
                                        <div className="player-stat"><span>Faule:</span> {stat.fouls}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MatchStats;
