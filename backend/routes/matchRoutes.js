const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.get('/', matchController.getAllMatches);
router.get('/:id/stats', matchController.getMatchStats);

module.exports = router;
