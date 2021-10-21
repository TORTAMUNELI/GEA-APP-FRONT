import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom';
import { Navbar } from '../ui/Navbar';
import { ActivitiesScreen } from '../activities/ActivitiesScreen';
import { RegisterActivityScreen } from '../activities/RegisterActivityScreen';
import { useValidarJWT } from '../../hooks/useValidarJWT';

export const DashboardRoutes = () => {
    useValidarJWT();

    return (
        <>
            <Navbar />
            <div className='container'>
                <Switch>
                    <Route exact path='/' component={ActivitiesScreen} />
                    <Route exact path='/registrar-actividad' component={RegisterActivityScreen} />

                    <Redirect to='/' />
                </Switch>
            </div>
        </>
    );
}