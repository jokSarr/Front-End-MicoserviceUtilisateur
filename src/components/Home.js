import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { FaChalkboardTeacher, FaBook, FaUsers } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [nombreEnseignants, setNombreEnseignants] = useState(0);

    useEffect(() => {
        fetch("http://localhost:8081/enseignants/list")
            .then(response => response.json())
            .then(data => setNombreEnseignants(data))
            .catch(error => console.error("Erreur fetch :", error));
    }, []);

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="row">
                <div className="col-md-4">
                    <Card className="text-center p-3 shadow" onClick={() => navigate('/ChefDepartement/Enseignants')} style={{ cursor: 'pointer' }}>
                        <FaChalkboardTeacher size={50} color="#007bff" />
                        <Card.Body>
                            <Card.Title>Enseignants</Card.Title>
                            <Card.Text>{nombreEnseignants} D'enseignant(s) enregistré(s)</Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-4">
                    <Card className="text-center p-3 shadow" onClick={() => navigate('/ChefDepartement/Formation')} style={{ cursor: 'pointer' }}>
                        <FaBook size={50} color="#28a745" />
                        <Card.Body>
                            <Card.Title>Formations</Card.Title>
                            <Card.Text>Consulter les formations disponibles</Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-4">
                    <Card className="text-center p-3 shadow" onClick={() => navigate('/ChefDepartement/Etudiants')} style={{ cursor: 'pointer' }}>
                        <FaUsers size={50} color="#dc3545" />
                        <Card.Body>
                            <Card.Title>Étudiants</Card.Title>
                            <Card.Text>Voir la liste des étudiants</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Home;
