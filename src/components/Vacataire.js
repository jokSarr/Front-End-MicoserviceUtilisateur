import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function CustomNavbarVacataire() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/ChefDepartement/Accueil">Accueil</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/ChefDepartement/EmploisDuTempsVacataire">Emplois du Temps</Nav.Link>
                    <Nav.Link href="/ChefDepartement/Enseignements">Enseignement</Nav.Link>
                    <Nav.Link href="/ChefDepartement/Choix">Choix</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default CustomNavbarVacataire;