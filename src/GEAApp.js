import React, { useEffect, useReducer } from 'react'
import { AuthContext } from './components/auth/AuthContext';
import { authReducer } from './components/auth/authReducer';
import { AppRputer } from './components/routers/AppRouter'
import { validarJWT } from './helpers/validarJWT';

const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && validarJWT()) {
        return user;
    }

    return {
        logged: false
    };
}

export const GEAApp = () => {
    const [user, dispatch] = useReducer(authReducer, {}, init);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, dispatch }}>
            <AppRputer />
        </AuthContext.Provider>
    )
}
