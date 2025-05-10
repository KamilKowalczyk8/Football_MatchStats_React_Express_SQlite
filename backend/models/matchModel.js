const db = require('../db');

const Match = {
  getAllMatches: (callback) => {
    db.all('SELECT * FROM matches', [], (err, rows) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, rows);
    });
  },
  getMatchStats: (id, callback) => {
    db.all('SELECT * FROM stats WHERE matchId = ?', [id], (err, rows) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, rows);
    });
  }
};

module.exports = Match;
