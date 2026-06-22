const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const { pool, testConnection } = require('./config/db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // On autorise tout le monde pour l'instant (on sécurisera avec React plus tard)
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});
app.set('io', io);

// Middleware
app.use(cors());
app.use(express.json());

// Route test 
app.get('/api/status', (req, res) => {
    res.json({ message: 'API CRM Osmose Digital fonctionnelle 🚀' });
});

// Branchement routes d'authentification
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Branchement routes des entreprises (CRUD)
const entreprisesRoutes = require('./routes/entreprisesRoutes');
app.use('/api/entreprises', entreprisesRoutes);

// Branchement routes des interactions
const interactionsRoutes = require('./routes/interactionsRoutes');
app.use('/api/interactions', interactionsRoutes);

// Port du serveur
const PORT = process.env.PORT || 5000;

// Démarrage du serveur et test de la base de données
server.listen(PORT, async () => {
    console.log(`\n========================================`);
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`========================================`);
    await testConnection();
});