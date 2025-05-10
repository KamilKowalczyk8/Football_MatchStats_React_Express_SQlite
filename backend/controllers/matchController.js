const Match = require('../models/matchModel');

exports.getAllMatches = (req, res) => {
  Match.getAllMatches((err, matches) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching matches' });
    }
    res.json(matches);
  });
};

exports.getMatchStats = (req, res) => {
  const { id } = req.params;
  Match.getMatchStats(id, (err, stats) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching stats' });
    }
    res.json(stats);
  });
};
