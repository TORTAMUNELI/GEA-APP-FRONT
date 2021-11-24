import axios from "axios";

export const getActivities = async (userId) => {
    const { token } = JSON.parse(window.localStorage.getItem('user'));

    let config = {
        headers: {
            'Authorization': token
        }
    };

    return await (await axios.get("https://gea-app.herokuapp.com/tarea/", config)).data;
}