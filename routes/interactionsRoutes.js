const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { createInteraction, getInteractions } = require('../controllers/interactionsController');

// Protection des routes par JWT
router.use(verifyToken);

router.post('/', createInteraction);               // POST /api/interactions
router.get('/:entreprise_id', getInteractions);    // GET /api/interactions/1

module.exports = router;