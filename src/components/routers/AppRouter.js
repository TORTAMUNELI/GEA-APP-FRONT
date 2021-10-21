import React, { useContext } from "react";
import {
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { LoginScreen } from "../login/LoginScreen";
import { RegisterScreen } from "../register/RegisterScreen";
import { DashboardRoutes } from "./DashboardRoutes.";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRputer = () => {

    const { user } = useContext(AuthContext);

    return (
        <Router>
            <Switch>
                <PublicRoute
                    exact
                    path='/login'
                    component={LoginScreen}
                    isAuthenticated={user.logged}
                />

                <PublicRoute
                    exact
                    path='/registro'
                    component={RegisterScreen}
                    isAuthenticated={user.logged}
                />

                <PrivateRoute
                    path='/'
                    component={DashboardRoutes}
                    isAuthenticated={user.logged}
                />
            </Switch>
        </Router>
    );
}