import React, {useState} from 'react';
import {useForm} from 'react-hook-form'

import userController from './../../../controllers/userController'
import passwordHelper from './../../../helpers/password'
import tokenHelper from './../../../helpers/token'

import './style.css';

import Redirect from "../../components/Redirect";
import Dialog from "./../../components/Dialog"
import token from "./../../../helpers/token";

interface LoginInputsInterface {
    username: string,
    password: string
}

export default () => {
    const [redirectRender, setRedirectRender] = useState<boolean>(false);
    const [redirectPath, setRedirectPath] = useState<string>('');
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>('');
    const [dialogText, setDialogText] = useState<string>('');

    const {register, handleSubmit, errors} = useForm<LoginInputsInterface>()

    function redirect(path: string) {
        setRedirectPath(path)
        setRedirectRender(true)
    }

    function onSubmit({username, password}: LoginInputsInterface) {
        const {users} = userController.index()
        const notDisableUsers = users.filter(value => !(value.disable))
        const selectUser = notDisableUsers.find(value => value.username === username)
        if (selectUser) {
            if (passwordHelper.compare(password, selectUser.password as string)) {
                const {id, name} = selectUser
                const token = tokenHelper.generateToken({secret: {id}})
                sessionStorage.setItem('token', token)
                sessionStorage.setItem('id', id.toString())
                sessionStorage.setItem('name', name)
                redirect('/home')
            } else {
                setDialogTitle("Error")
                setDialogText("Senha incorreta")
                setDialogOpen(true)
            }
        } else {
            setDialogTitle("Error")
            setDialogText("Usuário não encontrado")
            setDialogOpen(true)
        }
    }

    return (
        <div className='login'>
            <div className='box'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type='text' name='username' placeholder='username' ref={register({required: true})}/>
                    {errors.username && <span>campo "username" vazio</span>}
                    <input type='password' name='password' placeholder='password' ref={register({required: true})}/>
                    {errors.password && <span>campo "password" vazio</span>}
                    <input type='submit' value='Login'/>
                    <input type='button' value='Registro' onClick={() => redirect('/registro')}/>
                </form>
            </div>
            <Dialog open={dialogOpen} setOpen={setDialogOpen} title={dialogTitle} text={dialogText}/>
            <Redirect render={redirectRender} path={redirectPath}/>
        </div>
    )
}
