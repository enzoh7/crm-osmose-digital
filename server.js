const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { pool, testConnection } = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route test 
app.get('/api/status', (req, res) => {
    res.json({ message: 'API CRM Osmose Digital fonctionnelle 🚀' });
});

// Port du serveur
const PORT = process.env.PORT || 5000;

// Démarrage du serveur et test de la base de données
app.listen(PORT, async () => {
    console.log(`\n========================================`);
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`========================================`);
    await testConnection();
});