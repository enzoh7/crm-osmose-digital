const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth'); // Notre vigile
const { 
    createEntreprise, 
    getEntreprises, 
    updateEntreprise, 
    deleteEntreprise 
} = require('../controllers/entreprisesController');

router.use(verifyToken); // Applique le middleware à toutes les routes de ce routeur

// Définition des URL
router.post('/', createEntreprise);
router.get('/', getEntreprises);
router.put('/:id', updateEntreprise);
router.delete('/:id', deleteEntreprise);

module.exports = router;