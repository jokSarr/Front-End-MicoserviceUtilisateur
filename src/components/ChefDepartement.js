import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function CustomNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/ChefDepartement/Accueil">Accueil</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/ChefDepartement/Enseignants">Enseignants</Nav.Link>
                    <Nav.Link href="/ChefDepartement/EmploisDuTemps">Emplois du Temps</Nav.Link>
                    <Nav.Link href="/ChefDepartement/Formation">Formations</Nav.Link>
                    <Nav.Link href="/ChefDepartement/Repartition">Repartition</Nav.Link>
                    <NavDropdown title="Syllabus">
                        <NavDropdown.Item href="/ChefDepartement/UE">UE</NavDropdown.Item>
                        <NavDropdown.Item href="/ChefDepartement/ECTout">EC</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default CustomNavbar;
