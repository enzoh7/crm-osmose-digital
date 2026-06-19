const {pool } = require('../config/db');

const createEntreprise = async (req, res) => {
    try {
        const { nom, interlocuteur, email, telephone, statut } = req.body;
        // On récupère l'ID de l'utilisateur directement depuis le "bracelet" JWT
        const userId = req.user.userId;

        if (!nom) {
            return res.status(400).json({ message: "Le nom de l'entreprise est obligatoire." });
        }

        const [result] = await pool.execute(
            'INSERT INTO entreprises (nom, interlocuteur, email, telephone, statut, user_id) VALUES (?, ?, ?, ?, ?, ?)',
            [nom, interlocuteur || null, email || null, telephone || null, statut || 'À contacter', userId]
        );

        res.status(201).json({ 
            message: "Entreprise ajoutée avec succès !", 
            entrepriseId: result.insertId 
        });
    } catch (error) {
        console.error("Erreur lors de l'ajout :", error.message);
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
};

const getEntreprises = async (req, res) => {
    try {
        const userId = req.user.userId;
        const [entreprises] = await pool.execute(
            'SELECT * FROM entreprises WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
        res.status(200).json(entreprises);
    } catch (error) {
        console.error("Erreur lors de la récupération des entreprises :", error.message);
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
};

const updateEntreprise = async (req, res) => {
    try {
        const entrepriseId= req.params.id;
        const userId = req.user.userId;
        const { nom, interlocuteur, email, telephone, statut } = req.body;
        const [result] = await pool.execute(
            'UPDATE entreprises SET nom = ?, interlocuteur = ?, email = ?, telephone = ?, statut = ? WHERE id = ? AND user_id = ?',
            [nom, interlocuteur, email, telephone, statut, entrepriseId, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Entreprise non trouvée ou vous n'avez pas la permission de la modifier." });
        }
        res.status(200).json({ message: "Entreprise mise à jour avec succès !" });
    } catch (error) {
        console.error("Erreur lors de la modification:", error.message);
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
};

const deleteEntreprise = async (req, res) => {
    try {
        const entrepriseId = req.params.id;
        const userId = req.user.userId;

        const [result] = await pool.execute(
            'DELETE FROM entreprises WHERE id = ? AND user_id = ?',
            [entrepriseId, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Entreprise introuvable ou non autorisée." });
        }

        res.status(200).json({ message: "Entreprise supprimée avec succès." });
    } catch (error) {
        console.error("Erreur lors de la suppression :", error.message);
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
};

module.exports = {
    createEntreprise,
    getEntreprises,
    updateEntreprise,
    deleteEntreprise
};