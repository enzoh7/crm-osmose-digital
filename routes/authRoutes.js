const express = require('express');
const router = express.Router();

// Import des fonctions depuis le contrôleur
const { register, login } = require('../controllers/authController');

// Définition des URL
router.post('/register', register);
router.post('/login', login);

module.exports = router;