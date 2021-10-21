import axios from 'axios';

export const validarJWT = async () => {
    const user = JSON.parse(localStorage.getItem('user'));


    if (!user || !user.token) {
        return false;
    }

    const config = {
        headers: {
            Authorization: user.token
        }
    };

    return await axios.get('https://gea-app.herokuapp.com/auth', config);
}