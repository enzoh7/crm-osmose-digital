const jwt = require('jsonwebtoken');

// Middleware pour vérifier le token JWT
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Accès refusé. Token manquant ou mal formaté." });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        // Tu vois l'erreur exacte dans TON terminal (ex: "jwt expired" ou "invalid signature")
        console.error("Erreur de validation du token :", error.message);

        // L'utilisateur reçoit un message générique sans comprendre les failles de ton serveur
        return res.status(401).json({ message: "Accès refusé. Token invalide ou expiré." });
    }
};

module.exports = verifyToken;