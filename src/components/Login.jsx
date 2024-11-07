import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth_user, providerGoogle } from '../firebase/appConfig'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm()
const navigate = useNavigate()
    const loginForm = (data) => {
        signInWithEmailAndPassword(auth_user, data.email, data.password)
        .then((userCredentiales) => {
            const user = userCredentiales.user
            console.log(user);
            saveLocalStorage("user_firebase", JSON.stringify(user))
        }).catch((error) => {
            console.error(error.message)
            Swal.fire({
                title: "Credenciales Invalidas",
                text: "Revisa tu informacion",
                icon: "warning"
            });
        })
    } 
    const loginGoogle = async () => {
        try {
            const result = await signInWithPopup(auth_user, providerGoogle);
            console.log(result.user);
            saveLocalStorage("user_firebase", JSON.stringify(result.user))
        } catch (error) {
            console.error(error.message)
            Swal.fire({
                title: "Error al autenticarse con Google",
                text: "Revisa tu informacion",
                icon: "warning"
            });
        }
    }

    const saveLocalStorage = (key, data) => {
        sessionStorage.setItem(key, data);
        navigate('/home')
    }

    useEffect(() => {
        // Verificar si ya hay un usuario autenticado
        if (sessionStorage.getItem("user_firebase")) {
            navigate('/home'); // Redirigir a Productos si hay datos
        }
    }, [navigate]);

    return (
        <div className="container my-5" style={{ width: "400px" }}>
            <div className="text-center mb-4">
                <button onClick={loginGoogle} className="btn btn-danger">
                    <i className="bi bi-google me-2"></i> Ingresar con Google
                </button>
            </div>
            <hr className="my-4" />
            <form onSubmit={handleSubmit(loginForm)} className="p-4 border rounded shadow-sm">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Ingrese su correo"
                        className="form-control"
                        {...register('email', { required: true })}
                    />
                    {errors.email && <div className="text-danger">Campo Obligatorio</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Ingrese su contraseña"
                        className="form-control"
                        {...register('password', { required: true })}
                    />
                    {errors.password && <div className="text-danger">Campo Obligatorio</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
            </form>

            <section className="text-center mt-4">
                <p>¿No tienes cuenta? <Link to="/registrarUser">¡Regístrate aquí!</Link></p>
            </section>
        </div>
    )
}
