import React, { useState } from 'react';
import '../styles/Inscription.css';



const Inscription = () => {
    const [utilisateur, setUtilisateur] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUtilisateur({ ...utilisateur, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8081/auth/inscrire', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(utilisateur)
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const data = await response.json();
            alert('Inscription réussie !');
            console.log('Réponse du serveur :', data);
        } catch (error) {
            alert('Erreur lors de l\'inscription');
            console.error('Erreur Fetch :', error);
        }
    };

    return (
        <div className="inscription-container">
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nom d'utilisateur</label>
                    <input
                        type="text"
                        name="username"
                        value={utilisateur.username}
                        onChange={handleChange}
                        required
                    />
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
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={utilisateur.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        value={utilisateur.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Rôle</label> 
                    <select name="role" value={utilisateur.role} onChange={handleChange} required>
                        <option value="">Sélectionnez un rôle</option>
                        <option value="PERMANENT">Permanent</option>
                        <option value="VACATAIRE">Vacataire</option>
                        <option value="ETUDIANT">Étudiant</option>
                    </select>
                </div>
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
};

export default Inscription;
