const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const db = new sqlite3.Database('./matches.db'); 
const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:3001'
  }));

app.get('/api/matches', (req, res) => {
  db.all('SELECT * FROM matches', (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Błąd bazy danych' });
    }
    res.json(rows);
  });
});

app.get('/api/matches/:id/stats', (req, res) => {
    const matchId = req.params.id;
    db.all('SELECT * FROM players WHERE match_id = ?', [matchId], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  });

app.listen(3000, () => {
  console.log('Serwer działa na porcie 3000');
});
