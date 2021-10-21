import React, { useEffect, useState } from 'react'
import { getRols } from '../../helpers/getRols';
import { useForm } from '../../hooks/useForm'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export const RegisterScreen = () => {
    const history = useHistory();

    const [formValues, handleInputChange] = useForm({
        nombre: '',
        correo: '',
        contrasenia: '',
        confContrasenia: '',
        rol: 0
    });
    const [roles, setRoles] = useState([]);

    const { nombre, correo, contrasenia, confContrasenia, rol } = formValues;
    const [errContrasenias, setErrContrasenias] = useState(false);
    const [errContraseniasLength, setErrContraseniasLength] = useState(false);
    const [errRol, setErrRol] = useState(false);
    const [errCorreo, setErrCorreo] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (contrasenia !== confContrasenia) {
            setErrContrasenias(true);
            return;
        }
        setErrContrasenias(false);

        if (contrasenia.length < 8 || contrasenia.length > 16) {
            setErrContraseniasLength(true);
            return;
        }
        setErrContraseniasLength(false);

        if (rol === 0) {
            setErrRol(true);
            return;
        }
        setErrRol(false);


        const data = {
            nombre,
            contrasenia,
            correo,
            rol
        }

        axios.post(
            'https://gea-app.herokuapp.com/usuarios/',
            data
        )
            .then((resp) => {
                history.replace('/');
            })
            .catch((err) => {
                setErrCorreo(true);
            });
    }

    useEffect(() => {
        getRols().then(({ roles }) => setRoles(roles));
    }, []);

    return (
        <div className='container' style={{ marginTop: '7.5%' }}>
            <div className='row'>
                <div className='col-md-2'></div>
                <div className='col-md-8'>
                    <div className='card'>
                        <h2 className='text-center mt-5'>Regístrese</h2>
                        <form className='mt-3' onSubmit={handleSubmit}>
                            <div className='row'>
                                <div className='col-md-2'></div>
                                <div className='col-md-8'>
                                    <input
                                        autoComplete='off'
                                        className='form-control mb-4'
                                        placeholder='Ingrese su nombre'
                                        type='text'
                                        name='nombre'
                                        value={nombre}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className='mb-4'>
                                        <input
                                            autoComplete='off'
                                            className='form-control'
                                            placeholder='Ingrese su correo'
                                            type='email'
                                            name='correo'
                                            value={correo}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {
                                            errCorreo &&
                                            <p
                                                className='text-danger text-center'
                                            >
                                                El correo ya existe
                                            </p>
                                        }
                                    </div>
                                    <div className='mb-4'>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <input
                                                    autoComplete='off'
                                                    className='form-control'
                                                    placeholder='Ingrese la contraseña'
                                                    type='password'
                                                    name='contrasenia'
                                                    value={contrasenia}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className='col-md-6'>
                                                <input
                                                    autoComplete='off'
                                                    className='form-control'
                                                    placeholder='Confirmar contraseña'
                                                    type='password'
                                                    name='confContrasenia'
                                                    value={confContrasenia}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {
                                            errContrasenias &&
                                            <p
                                                className='text-danger text-center'
                                            >
                                                Las contraseñas deben coincidir
                                            </p>
                                        }
                                        {
                                            errContraseniasLength &&
                                            <p
                                                className='text-danger text-center'
                                            >
                                                La contraseña debe de tener más de 8 caracteres y menos de 16.
                                            </p>
                                        }
                                    </div>
                                    <div className='mb-4'>
                                        <select
                                            className='form-select'
                                            id='select'
                                            name='rol'
                                            value={rol}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="0" disabled hidden>Seleccione un rol</option>
                                            {
                                                roles.map((rol, index) =>
                                                    (rol.nombre !== 'ADMIN')
                                                        ? <option
                                                            key={rol.uid}
                                                            value={rol.uid}
                                                        >
                                                            {rol.nombre}
                                                        </option>
                                                        : null
                                                )
                                            }
                                        </select>
                                        {
                                            errRol &&
                                            <p
                                                className='text-danger text-center'
                                            >
                                                Debe seleccionar un rol
                                            </p>
                                        }
                                    </div>
                                    <div className="d-grid gap-2 mb-4">
                                        <button
                                            className="btn btn-outline-primary mb-3 p-2"
                                            type="submit"
                                        >
                                            Regístrese
                                        </button>
                                    </div>
                                </div>
                                <div className='col-md-2'></div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='col-md-2'></div>
            </div >
        </div >
    )
}
