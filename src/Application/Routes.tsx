import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom'

import Login from './../templates/pages/Login'
import Register from './../templates/pages/Register'
import Home from './../templates/pages/Home'
import Estoque from './../templates/pages/Estoque'
import Entrada from './../templates/pages/Entrada'
import Saida from './../templates/pages/Saida'
import Perfil from './../templates/pages/Perfil'
import Backup from './../templates/pages/Backup'

export default () => {
    return (
        <HashRouter>
            <Switch>
                <Route component={Login} path='/' exact/>
                <Route component={Register} path='/registro' exact/>
                <Route component={Home} path='/home' exact/>
                <Route component={Estoque} path='/estoque' exact/>
                <Route component={Entrada} path='/entrada' exact/>
                <Route component={Saida} path='/saida' exact/>
                <Route component={Perfil} path='/perfil' exact/>
                <Route component={Backup} path='/backup' exact/>
            </Switch>
        </HashRouter>
    )
}
