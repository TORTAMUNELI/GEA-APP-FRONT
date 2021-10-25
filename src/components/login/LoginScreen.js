import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import { types } from '../types/types';
import './styles.css';

export const LoginScreen = () => {

    const [formValues, handleInputChange] = useForm({
        correo: '',
        contrasenia: ''
    });
    const [err, setErr] = useState(false);
    const history = useHistory();
    const { dispatch } = useContext(AuthContext);

    const { correo, contrasenia } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            correo,
            contrasenia
        }

        axios.post(
            'https://gea-app.herokuapp.com/auth/login',
            data
        )
            .then(({ data }) => {
                const { usuario, token } = data;
                dispatch({
                    type: types.login,
                    payload: {
                        ...usuario,
                        token
                    }
                });
                history.replace('/');
            })
            .catch((error) => {
                setErr(true);
            });
    }


    return (
        <div className='container' style={{ marginTop: '10%' }}>
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <div className='card'>
                        <h1 className='text-center mt-5'>Iniciar Sesión</h1>
                        <div className='row'>
                            <div className='col-md-2'></div>
                            <div className='col-md-8'>
                                {
                                    err &&
                                    <p
                                        className='text-danger text-center'
                                    >
                                        Email o contraseña incorrectos. Por favor inténtelo de nuevo.
                                    </p>
                                }

                                <form className='mt-2' onSubmit={handleSubmit}>
                                    <input
                                        autoComplete='off'
                                        className='form-control mb-4 p-2'
                                        type='email'
                                        placeholder='Ingrese su email'
                                        name='correo'
                                        value={correo}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <input
                                        autoComplete='off'
                                        className='form-control mb-4 p-2'
                                        type='password'
                                        placeholder='Ingrese su contraseña'
                                        name='contrasenia'
                                        value={contrasenia}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="d-grid gap-2">
                                        <button
                                            className="btn btn-dark mb-3 p-2"
                                            type="submit"
                                        >
                                            Iniciar Sesión
                                        </button>
                                    </div>
                                </form>
                                <p className='text-center mb-5'>
                                    ¿Aún no tiene una cuenta?
                                    <span>
                                        <Link className='m-2' to='/registro'>
                                            <b>Regístrese</b>
                                        </Link>
                                    </span>
                                </p>

                            </div>
                            <div className='col-md-2'></div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3'></div>
            </div>
        </div>
    );
}
