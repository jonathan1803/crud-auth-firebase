import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import { auth_user } from '../firebase/appConfig';

//creando un esquema (reglas) para validar el correo y password
const schema = yup.object().shape({
    //asignamos las reglas que se van a validar
    email: yup.string().required("El correo es obligatorio").email("Correo Invalido, ejemplo: usuario@dominio.com"),
    password: yup.string().required("Campo Obligatorio").min(8, "La contraseña debe contener al menos 8 caracteres"),
    //validamos si las contrasenas son igual con la funcion oneOf()
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Las contraseñas no son iguales")
})

export default function Register() {
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    //constante para la navegacion
    const navigate = useNavigate()

    //creando un usuario para firebase
    const registerForm = (data) => {
        console.log(data);
        
        createUserWithEmailAndPassword(auth_user, data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user); //mandaria la info del usuario (correo)
            //redigirlo a la pagina principal
            navigate('/')
        }).catch((error) => {
            console.log("Error al registrar el usuario", error);
        })
    }

    return (
        <div className="container mt-5">
        <h1 className="text-center mb-4">Registrar Usuario</h1>
        <form onSubmit={handleSubmit(registerForm)} className="mx-auto" style={{ maxWidth: '400px' }}>
            
            <div className="mb-3">
                <label className="form-label">Correo Electrónico</label>
                <input 
                    type="email"
                    placeholder="Ingrese su correo"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    {...register('email')}
                />
                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                    type="password"
                    placeholder="Ingrese su contraseña"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    {...register('password')}
                />
                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Confirmar Contraseña</label>
                <input
                    type="password"
                    placeholder="Confirme su contraseña"
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    {...register('confirmPassword')}
                />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100">Registrarse</button>
        </form>
    </div>
    )
}
