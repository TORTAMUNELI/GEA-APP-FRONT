import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../auth/AuthContext';
import { types } from '../types/types';
import './styles.css';

export const RegisterActivityScreen = () => {
    const { dispatch } = useContext(AuthContext);
    const history = useHistory();

    const [errTitulo, setErrTitulo] = useState(false);
    const [errFecha, setErrFecha] = useState(false);

    const [formValues, handleInputChange] = useForm({
        nombre: '',
        fecha_inicio: new Date().toISOString().slice(0, 10),
        fecha_final: new Date().toISOString().slice(0, 10),
    });

    const { nombre, fecha_inicio, fecha_final } = formValues;


    const handleSubmit = (e) => {
        e.preventDefault();
        if (nombre === '') {
            setErrTitulo(true);
            return;
        }
        setErrTitulo(false);

        if (fecha_inicio > fecha_final) {
            setErrFecha(true);
            return;
        }

        const data = {
            titulo: nombre,
            fecha_inicio,
            fecha_final,
            descripcion: document.getElementById('mytextarea').value
        }

        const { token } = JSON.parse(window.localStorage.getItem('user'));


        let config = {
            headers: {
                'Authorization': token
            }
        }

        axios.post('https://gea-app.herokuapp.com/tarea/', data, config)
            .then(obj => history.push('/'))
            .catch(err => dispatch({
                type: types.logout
            }));
    }

    return (
        <div id='container_login'>
            <div className='row'>
                <div style={{ textAlign: 'center' }}>
                    <h2 >REGISTRAR ACTIVIDAD</h2>
                </div>
                <div className='card'>
                    <form onSubmit={handleSubmit}>
                        <input
                            className='form-control pt-2 pb-2'
                            type='text'
                            placeholder='T??tulo de la actividad'
                            autoComplete='off'
                            name='nombre'
                            value={nombre}
                            onChange={handleInputChange}
                        />
                        {
                            errTitulo &&
                            <p
                                className='text-danger text-center'
                            >
                                La actividad necesita un T??tulo.
                            </p>
                        }
                        <div className='row'>
                            <div className='col-md-6'>
                                <label htmlFor='fechaInicio'>Fecha inicio</label>
                                <input
                                    id='fechaInicio'
                                    autoComplete='off'
                                    className='form-control pt-2 pb-2'
                                    type='date'
                                    placeholder='Fecha de inicio'
                                    name='fecha_inicio'
                                    value={fecha_inicio}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='col-md-6'>
                                <label htmlFor='fecha-final'>Fecha final</label>
                                <input
                                    id='fecha-final'
                                    autoComplete='off'
                                    className='form-control pt-2 pb-2'
                                    type='date'
                                    placeholder='Fecha final'
                                    name='fecha_final'
                                    value={fecha_final}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {
                                errFecha &&
                                <p
                                    className='text-danger text-center'
                                >
                                    La fecha final debe ser mayor o igual a la fecha inicial.
                                </p>
                            }
                        </div>
                        <textarea id="mytextarea" />

                        <div className="d-grid gap-2">
                            <button
                                className="btn-dark pt-2 pb-2"
                                type="submit"
                            >
                                Registrar Actividad
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
}
