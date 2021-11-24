import React, { useContext } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext';
import { types } from '../types/types';

export const Navbar = () => {
    const { user, dispatch } = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = () => {
        dispatch({
            type: types.logout
        });

        history.replace('/login');
    }

    return (
        <nav className="navbar navbar-expand-sm navbar navbar-dark bg-dark" style={{ height: '80px' }} >
            <NavLink
                className="navbar-brand"
                to="/"
            >
                <img
                    src="https://cdn-icons-png.flaticon.com/512/609/609803.png"
                    width="30"
                    height="30"
                    alt=""
                />
            </NavLink>

            <div className="navbar-collapse w-100">
                <div className="navbar-nav">
                    <NavLink
                        activeClassName="active"
                        className="nav-item nav-link"
                        exact
                        to="/registrar-actividad"
                    >
                        REGISTRAR ACTIVIDAD
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ms-auto">
                    <span
                        className='nav-item nav-link text-info'
                    >
                        {user.nombre}
                    </span>
                    <Link
                        onClick={handleLogout}
                        className=" nav-item nav-link text-end"
                        to='/login'
                    > Cerrar Sesion
                    </Link>
                </ul>
            </div>
        </nav >
    )
}
