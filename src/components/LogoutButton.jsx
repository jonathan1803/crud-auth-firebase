import React from 'react';
import { signOut } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
import { auth_user } from '../firebase/appConfig';

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth_user)
            .then(() => {
                // Eliminar el usuario del sessionStorage
                sessionStorage.removeItem('user_firebase');
                
                // Redirigir a la página de login después de cerrar sesión
                navigate('/');
            })
            .catch((error) => {
                console.error('Error al cerrar sesión:', error);
            });
    };

    return (
        <button
            onClick={handleLogout}
            className="btn btn-danger w-100"
        >
            Cerrar Sesión
        </button>
    );
}
