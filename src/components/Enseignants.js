import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Enseignants = () => {
    const [enseignants, setEnseignants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8081/enseignants/liste')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setEnseignants(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur de chargement des enseignants :', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Chargement en cours...</p>;
    if (error) return <p>Erreur : {error}</p>;

    const permanents = enseignants.filter(e => e.role.toLowerCase() === 'permanent');
    const vacataires = enseignants.filter(e => e.role.toLowerCase() === 'vacataire');

    return (
        <div>
            <h2>Enseignants</h2>

            <h3>Permanents</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Grade</th>
                        <th>Specialite</th>
                    </tr>
                </thead>
                <tbody>
                    {permanents.map(ens => (
                        <tr key={ens.id}>
                            <td>{ens.nom}</td>
                            <td>{ens.prenom}</td>
                            <td>{ens.username}</td>
                            <td>{ens.grade}</td>
                            <td>{ens.specialite}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Vacataires</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Niveau</th>
                    </tr>
                </thead>
                <tbody>
                    {vacataires.map(ens => (
                        <tr key={ens.id}>
                            <td>{ens.nom}</td>
                            <td>{ens.prenom}</td>
                            <td>{ens.username}</td>
                            <td>{ens.niveau}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Enseignants;
