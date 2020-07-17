import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from './../pages/Login'
import Register from './../pages/Register'

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Login} path='/' exact/>
                <Route component={Register} path='/register' exact/>
            </Switch>
        </BrowserRouter>
    )
}
