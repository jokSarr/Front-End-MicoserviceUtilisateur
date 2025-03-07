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
    
            sessionStorage.setItem('role', data.role);
    
            switch (data.role) {
                case 'PERMANENT':
                    navigate('/permanent');
                    break;
                case 'VACATAIRE':
                    navigate('/vacataire');
                    break;
                case 'ETUDIANT':
                    navigate('/etudiant');
                    break;
                default:
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
