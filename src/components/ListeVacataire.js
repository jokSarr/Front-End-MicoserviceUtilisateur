import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Barre(){
     <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/ChefDepartement/Accueil">Accueil</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <NavDropdown title="Enseignants">
                        <NavDropdown.Item href="/ChefDepartement/ListePermanents">Permanents</NavDropdown.Item>
                        <NavDropdown.Item href="/ChefDepartement/ListeVacataires">Vacataire</NavDropdown.Item>
                    </NavDropdown>
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
}

function ListeVacataire() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [afficherFormulaire, setAfficherFormulaire] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/vacataires/ListeVacataires');
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate]);

    const [utilisateur, setUtilisateur] = useState({
        username: '',
        email: '',
        password: '',
        role: 'Vacataire'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUtilisateur({ ...utilisateur, [name]: value });
    };
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        
            const response = await fetch('http://localhost:8081/vacataires/vacataire', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(utilisateur)
            });

    };

    return (
        <div className="container mt-4">
            <h2>Liste des Vacataires</h2>

            <button onClick={() => setAfficherFormulaire(!afficherFormulaire)} >
                <i className="fas fa-plus"></i> {afficherFormulaire ? "Fermer le formulaire" : "Ajouter un Vacataire"}
            </button>

            {afficherFormulaire && (
                <div className="inscription-container mt-4">
                    <h2>Inscription</h2>
                    <form onSubmit={handleAdd}>
                        <div className="form-group">
                            <label>Nom d'utilisateur</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                value={utilisateur.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Prenom</label>
                            <input
                                type="text"
                                className="form-control"
                                name="prenom"
                                value={utilisateur.prenom}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Nom </label>
                            <input
                                type="text"
                                className="form-control"
                                name="nom"
                                value={utilisateur.nom}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={utilisateur.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Matricule</label>
                            <input
                                type="text"
                                className="form-control"
                                name="matricule"
                                value={utilisateur.matricule}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="hidden"
                                className="form-control"
                                name="role"
                                value={utilisateur.role}
                            />
                        </div>
                        <div className="form-group">
                            <label>Grade</label>
                            <input
                                type="text"
                                className="form-control"
                                name="grade"
                                value={utilisateur.grade}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Niveau</label>
                            <input
                                type="text"
                                className="form-control"
                                name="niveau"
                                value={utilisateur.niveau}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Mot de passe</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={utilisateur.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success mt-3">S'inscrire</button>
                    </form>
                </div>
            )}

            <Vacataires />
            <button onClick={handleLogout} className="btn btn-danger mt-3">
                <i className="fas fa-sign-out-alt"></i> Déconnexion
            </button>
        </div>
    );
}

function Vacataires() {
    const [vacataires, setVacataires] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8081/vacataires/liste', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setVacataires(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur de chargement des vacataires :', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleEdit = (id) => console.log('Modifier vacataire avec ID :', id);
    const handleDelete = (id) => console.log('Supprimer vacataire avec ID :', id);
    const handleActivate = (id) => console.log('Activer vacataire avec ID :', id);
    const handleUnarchive = (id) => console.log('Désarchiver nvacataire avec ID :', id);

    if (loading) return <p>Chargement en cours...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <Barre/> && (
        <table className="table table-bordered table-striped">
            <thead className="thead-dark">
                <tr>
                    <th>identifiant</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Matricule</th>
                    <th>Username</th>
                    <th>Grade</th>
                    <th>Niveau</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                    <th>Activer</th>
                    <th>Archiver</th>
                </tr>
            </thead>
            <tbody>
                {vacataires.map(ens => (
                    <tr key={ens.id}>
                        <td>{ens.id}</td>
                        <td>{ens.nom}</td>
                        <td>{ens.prenom}</td>
                        <td>{ens.matricule}</td>
                        <td>{ens.username}</td>
                        <td>{ens.grade}</td>
                        <td>{ens.niveau}</td>
                        
                        <td>
                            <button onClick={() => handleEdit(ens.id)} className="btn btn-warning btn-sm me-1">
                                <i className="fas fa-edit"></i>
                            </button>
                        </td>
                        <td>    
                            <button onClick={() => handleDelete(ens.id)} className="btn btn-danger btn-sm me-1">
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>
                        <td>    
                            <button onClick={() => handleActivate(ens.id)} className="btn btn-success btn-sm me-1">
                                <i className="fas fa-check-circle"></i>
                            </button>
                        </td>
                        <td>    
                            <button onClick={() => handleUnarchive(ens.id)} className="btn btn-info btn-sm">
                                <i className="fas fa-archive"></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) 
);
}

export default ListeVacataire;
