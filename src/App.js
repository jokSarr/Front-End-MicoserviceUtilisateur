import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Connexion from './components/Connexion';
import Inscription from './components/Inscription';
import ChefDepartement from './components/ChefDepartement';
import Vacataire from './components/Vacataire';
import Home from './components/Home';
import Permanent from './components/Permanent';
import ListePermanents from './components/ListePermanents';
import ListeVacataires from './components/ListeVacataire';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Connexion />} />
                <Route path="/inscription" element={<Inscription />} />
                
                <Route path="/vacataires/ListeVacataires" element={<ListeVacataires />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/chefDepartement" element={<ChefDepartement />} />
                    <Route path="/vacataire" element={<Vacataire />} />
                    <Route path="/permanent" element={<Permanent />} />
                    <Route path="/chefDepartement/ListePermanents" element={<ListePermanents />} />    
                    
                    <Route path="/ChefDepartement/Accueil" element={<Home />} />
                </Route>
            </Routes>
        </Router>
    );
}


export default App;
