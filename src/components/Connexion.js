import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Connexion.css';

const Connexion = () => {
    const [login, setLogin] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin((prevLogin) => ({
            ...prevLogin,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8081/auth/connecter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login),
                credentials: 'include' 
            });
    
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Réponse API :", data);
            console.log("Token reçu :", data.token);

            console.log("Rôle extrait :", data.role);

            // Stocker le rôle et le token
            sessionStorage.setItem('role', data.role);
            localStorage.setItem('token', data.token); // Assurez-vous que le token est stocké ici

            // Redirection en fonction du rôle
            switch (data.role) {
                case 'PERMANENT':
                    console.log("Redirection vers PERMANENT");
                    navigate('/permanent');
                    break;
                case 'VACATAIRE':
                    console.log("Redirection vers VACATAIRE");
                    navigate('/vacataire');
                    break;
                case 'CHEF-DEPARTEMENT':
                    console.log("Redirection vers CHEF_DEPARTEMENT");
                    navigate('/chefDepartement');
                    break;

                case 'ETUDIANT':
                    console.log("Redirection vers ETUDIANT");
                    navigate('/etudiant');
                    break;
                default:
                    console.log("Redirection vers la page par défaut");
                    navigate('/');
                    break;
            }
        } catch (error) {
            alert('❌ Erreur de connexion : Vérifiez vos identifiants');
            console.error('Erreur Fetch :', error);
        }
    };

    return (
        <div className="connexion-container">
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={login.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Mot de passe</label>
                    <input type="password" name="password" value={login.password} onChange={handleChange} required />
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Connexion;