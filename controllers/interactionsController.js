const { pool } = require('../config/db');

const createInteraction = async (req, res) => {
    try {
        const { entreprise_id, notes } = req.body;
        
        if (!entreprise_id || !notes) {
            return res.status(400).json({ message: "L'ID de l'entreprise et les notes sont requis." });
        }

        const [result] = await pool.execute(
            'INSERT INTO interactions (entreprise_id, notes) VALUES (?, ?)',
            [entreprise_id, notes]
        );

        res.status(201).json({ 
            message: "Interaction ajoutée avec succès",
            interactionId: result.insertId 
        });
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'interaction :", error.message);
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
};

const getInteractions = async (req, res) => {
    try {
        const entrepriseId = req.params.entreprise_id;
        
        const [interactions] = await pool.execute(
            'SELECT * FROM interactions WHERE entreprise_id = ? ORDER BY date_interaction DESC',
            [entrepriseId]
        );

        res.status(200).json(interactions);
    } catch (error) {
        console.error("Erreur lors de la récupération des interactions :", error.message);
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
};

module.exports = {
    createInteraction,
    getInteractions
};