import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from './../pages/Login'

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Login} path='/' exact/>
            </Switch>
        </BrowserRouter>
    )
}
