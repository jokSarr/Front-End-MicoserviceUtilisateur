import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function CustomNavbarVacataire() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        if (!token) {
            navigate('/vacataire'); 
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/'); 
    };
    return (
        isAuthenticated &&(
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/ChefDepartement/AccueilVacataire">Accueil</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/ChefDepartement/EmploisDuTempsVacataire">Emplois du Temps</Nav.Link>
                    <Nav.Link href="/ChefDepartement/Enseignements">Enseignement</Nav.Link>
                    <Nav.Link href="/ChefDepartement/Choix">Choix</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer', color: 'red' }}>
                Déconnexion
            </Nav.Link>
        </Navbar>
        )
    );
}

export default CustomNavbarVacataire;