import React, { useState } from 'react';
import '../styles/Inscription.css';
import {  useNavigate } from 'react-router-dom';
const AjoutVacataire = () => {
    const navigate = useNavigate();

    const [utilisateur, setUtilisateur] = useState({
        username: '',
        prenom: '',
        nom: '',
        email: '',
        password: '',
        role: '', 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUtilisateur({ ...utilisateur, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8081/vacataires/vacataire', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: utilisateur.username,
                    password: utilisateur.password,
                    nom: utilisateur.nom,
                    prenom: utilisateur.prenom,
                    role: utilisateur.role
                })
            });
    
            const data = await response.text(); 
            if (!response.ok) {
                throw new Error(data || `Erreur HTTP : ${response.status}`);
            }
    
            alert('Inscription réussie !');
            navigate('/inscription'); 
        } catch (error) {
            alert('Erreur lors de l\'inscription : ' + error.message);
            console.error('Erreur Fetch :', error);
        }
    };
    

    return (
    
        <div className="inscription-container">
            
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nom d'utilisateur</label>
                    <input type="text" name="username" value={utilisateur.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Prénom</label>
                    <input type="text" name="prenom" value={utilisateur.prenom} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Nom</label>
                    <input type="text" name="nom" value={utilisateur.nom} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Mot de passe</label>
                    <input type="password" name="password" value={utilisateur.password} onChange={handleChange} required />
                </div>
                <button type="submit">S'inscrire</button>
            </form>
            
        </div>
    );
};

export default AjoutVacataire;
