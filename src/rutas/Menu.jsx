import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import ListProducts from '../components/ListProducts';
import RegisterProduct from '../components/RegisterProduct';
import EditForm from '../components/EditForm';
import Register from '../components/Register';
import Login from '../components/Login';
import LogoutButton from '../components/LogoutButton';

export default function Menu() {
    return (
        <BrowserRouter>
            <header>

    <nav className="navbar bg-dark navbar-expand-lg align-items-center">
    <div className="container-fluid  ">
        <Link className="navbar-brand text-light" to="/">MyApp</Link>
        <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto ">
                <li className="nav-item">
                    <Link className="nav-link text-light" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-light" to="/registro">Registro de producto</Link>
                </li>

                <li className="nav-item ">
                   <LogoutButton />
                </li>
            </ul>
        </div>
    </div>
</nav>

            </header>

            {/* Definición de rutas */}
            <main className="container mt-4">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/registro" element={<RegisterProduct />} />
                    <Route path="/prueba" element={<RegisterProduct />} />
                    <Route path="/editar/:id" element={<EditForm />} />
                    <Route path="/registrarUser" element={<Register/>} />
                


                    
                </Routes>
            </main>
        </BrowserRouter>
    );
}
