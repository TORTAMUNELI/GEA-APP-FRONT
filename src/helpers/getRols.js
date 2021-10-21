import axios from 'axios';

export const getRols = async () => {
    return await (await axios.get('https://gea-app.herokuapp.com/rol/')).data;

}