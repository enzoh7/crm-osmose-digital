// Redirige au dashboard si on est déjà connecté
if (localStorage.getItem('token')) {
    window.location.href = '/dashboard.html';
}

const loginForm = document.getElementById('login-form');
const errorMsg = document.getElementById('error-msg');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        // On utilise la fonction de api.js
        const data = await fetchAPI('/auth/login', 'POST', { email, password });
        
        // On stocke le sésame
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId); // Optionnel, pour plus tard
        
        // Redirection vers le CRM
        window.location.href = '/dashboard.html';
    } catch (error) {
        errorMsg.textContent = error.message || "Identifiants incorrects.";
    }
});