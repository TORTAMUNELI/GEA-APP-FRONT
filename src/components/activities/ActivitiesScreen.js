import React, { useEffect, useState } from 'react'
import { useContext } from 'react/cjs/react.development';
import { getActivities } from '../../helpers/getActivities';
import { AuthContext } from '../auth/AuthContext';
import { Activity } from './Activity';
import './styles.css';

export const ActivitiesScreen = () => {

    const { user } = useContext(AuthContext);

    const [tareas, setTareas] = useState([]);

    const [cambios, setCambios] = useState(false);
    useEffect(() => {
        getActivities(user.token)
            .then(({ tareas }) => {
                setTareas(tareas);
            })
            .catch(err => console.log(err));
    }, [user, cambios]);

    return (
        <div className="card-grid">
            {
                tareas.map(value => (
                    <Activity cambios={cambios} setCambios={setCambios} key={value.uid} uid={value.uid} descripcion={value.descripcion} fecha_inicio={value.fecha_inicio} fecha_final={value.fecha_final} titulo={value.titulo} />
                )
                )
            }
        </div>
    )
}
