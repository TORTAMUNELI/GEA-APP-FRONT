import axios from 'axios';
import React from 'react'


export const Activity = ({ cambios, setCambios, uid, descripcion, fecha_final, fecha_inicio, titulo }) => {

    const handleClick = async () => {
        const { token } = JSON.parse(window.localStorage.getItem('user'));
        let config = {
            headers: {
                'Authorization': token
            }
        }
        await axios.delete(`https://gea-app.herokuapp.com/tarea/${uid}`, config);

        setCambios(!cambios);
    }

    const fechaInicio = new Date(fecha_inicio);
    const fechaFinal = new Date(fecha_final);

    const setItem = () => {
        return { __html: descripcion }
    }

    return (
        <div className="card_activity">
            <h3 style={{ textAlign: 'center' }}>{titulo}</h3>

            <div dangerouslySetInnerHTML={setItem()}></div>

            <div className="fechas">
                <p>{fechaInicio.toDateString()}</p>

                <p>{fechaFinal.toDateString()}</p>
            </div>
            <div onClick={handleClick} className="d-grid gap-2">
                <button className="btn btn-outline-primary" type="button">Completar tarea</button>
            </div>
        </div>
    )
}
