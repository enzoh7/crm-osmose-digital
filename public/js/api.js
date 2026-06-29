// URL de ton backend Node.js
const API_URL = 'http://localhost:5000/api';

// Fonction utilitaire pour toutes les requêtes (gère le JWT automatiquement)
async function fetchAPI(endpoint, method = 'GET', body = null) {
    const token = localStorage.getItem('token');
    
    const headers = {
        'Content-Type': 'application/json'
    };

    // Si on a un token, on l'ajoute comme pass VIP
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);
        
        // Si le token est expiré ou invalide, on le jette et on retourne au login
        if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/index.html';
            throw new Error('Session expirée');
        }

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || data.error || 'Erreur API');
        }
        
        return data;
    } catch (error) {
        console.error('Erreur fetchAPI:', error);
        throw error;
    }
}