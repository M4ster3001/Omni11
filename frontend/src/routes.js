import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/login';
import Register from './pages/register';
import Profiles from './pages/profiles';
import Incidents from './pages/incidents';


export default function Routes() {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ Login } />
                <Route path="/register" component={ Register } />

                <Route path="/profiles" component={ Profiles } />
                <Route path="/incidents/new" component={ Incidents } />
            </Switch>
        </BrowserRouter>
    );

}