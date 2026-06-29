// 1. Vérification de sécurité immédiate
if (!localStorage.getItem('token')) {
    window.location.href = '/index.html';
}

// 2. Récupération des éléments du DOM
const container = document.getElementById('companies-container');
const btnLogout = document.getElementById('btn-logout');

// 3. Déconnexion
btnLogout.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/index.html';
});

// 4. Fonction pour récupérer et afficher les entreprises
async function loadCompanies() {
    try {
        // Appelle la route sécurisée (le JWT est injecté par fetchAPI)
        const entreprises = await fetchAPI('/entreprises', 'GET');
        
        if (entreprises.length === 0) {
            container.innerHTML = '<p style="color: var(--textMuted);">Aucune entreprise trouvée. Ajoutez-en une !</p>';
            return;
        }

        // On vide le conteneur
        container.innerHTML = '';

        // On boucle pour créer le HTML dynamiquement
        entreprises.forEach(entreprise => {
            const card = document.createElement('div');
            card.className = 'company-card';
            
            // On utilise les backticks (`) pour injecter du HTML facilement
            card.innerHTML = `
                <div class="company-info">
                    <h3>${entreprise.nom}</h3>
                    <p>${entreprise.interlocuteur || 'Non renseigné'} · ${entreprise.email || 'Pas d\'email'}</p>
                </div>
                <div class="company-status">
                    ${entreprise.statut}
                </div>
            `;
            
            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = `<p style="color: #e07070;">Erreur de chargement : ${error.message}</p>`;
    }
}

// 5. Lancement au chargement de la page
document.addEventListener('DOMContentLoaded', loadCompanies);