import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function CustomNavbar() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        if (!token) {
            navigate('/'); 
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
            <Navbar.Brand href="/ChefDepartement/Accueil">Accueil</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <NavDropdown title="Enseignants">
                    <NavDropdown.Item href="/ChefDepartement/ListePermanents">Permanents</NavDropdown.Item>
                    <NavDropdown.Item href="/ChefDepartement/ListeVacataires">Vacataire</NavDropdown.Item>
                </NavDropdown>
                    <Nav.Link href="/ChefDepartement/EmploisDuTemps">Emplois du Temps</Nav.Link>
                    <Nav.Link href="http://localhost:8080/maquette">Maquette</Nav.Link>
                    <Nav.Link href="/ChefDepartement/Repartition">Repartition</Nav.Link>
                
                </Nav>
            </Navbar.Collapse>
            <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer', color: 'red' }}>
                Déconnexion
            </Nav.Link>
        </Navbar>
        )
    );
}



export default CustomNavbar;
