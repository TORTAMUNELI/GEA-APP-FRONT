import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../components/auth/AuthContext';
import { types } from '../components/types/types';
import { validarJWT } from '../helpers/validarJWT';

export const useValidarJWT = () => {
    const { dispatch } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        validarJWT()
            .then((data) => {
                if (!data) {
                    dispatch({
                        type: types.logout
                    });
                    history.replace('/login');
                }
            })
            .catch(() => {
                dispatch({
                    type: types.logout
                });
                history.replace('/login');
            });
    });
}