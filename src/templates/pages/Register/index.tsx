import React, {useState} from 'react';
import {useForm} from 'react-hook-form'

import userController from './../../../controllers/userController'
import passwordHelper from './../../../helpers/password'

import './style.css';

import Redirect from "./../../components/Redirect";
import Dialog from "./../../components/Dialog"

interface RegisterInputsInterface {
    name: string,
    username: string,
    password: string,
    password_confirm: string
}

export default () => {
    const [redirectRender, setRedirectRender] = useState<boolean>(false);
    const [redirectPath, setRedirectPath] = useState<string>('');
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>('');
    const [dialogText, setDialogText] = useState<string>('');

    const {register, handleSubmit, errors} = useForm<RegisterInputsInterface>()

    function redirect(path: string) {
        setRedirectPath(path)
        setRedirectRender(true)
    }

    const onSubmit = ({name, username, password, password_confirm}: RegisterInputsInterface) => {
        if (password !== password_confirm) {
            setDialogTitle("Error")
            setDialogText("As senhas não correspondem")
            setDialogOpen(true)
        } else {
            const {users} = userController.index()
            if (users.find(value => value.username === username)) {
                setDialogTitle("Error")
                setDialogText("Já existe um usuário com esse username")
                setDialogOpen(true)
            } else {
                const parsePassword = passwordHelper.encrypt(password)
                userController.create(name, username, parsePassword)
                setDialogTitle("Ok")
                setDialogText("Seu usuário foi cadastrado com sucesso")
                setDialogOpen(true)
                setTimeout(() => {
                    setRedirectPath('/')
                    setRedirectRender(true)
                }, 3000)
            }
        }
    }

    return (
        <div className='register'>
            <div className='box'>
                <h1>Registro</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type='text' name='name' placeholder='nome' ref={register({required: true})}/>
                    {errors.name && <span>campo "nome" vazio</span>}
                    <input type='text' name='username' placeholder='username' ref={register({required: true})}/>
                    {errors.username && <span>campo "username" vazio</span>}
                    <input type='password' name='password' placeholder='password' ref={register({required: true})}/>
                    {errors.password && <span>campo "password" vazio</span>}
                    <input type='password' name='password_confirm' placeholder='confirmar password'
                           ref={register({required: true})}/>
                    {errors.password_confirm && <span>campo "confirmar password" vazio</span>}
                    <input type='submit' value='Registrar'/>
                    <input type='button' value='Login' onClick={() => redirect('/')}/>
                </form>
            </div>
            <Dialog open={dialogOpen} setOpen={setDialogOpen} title={dialogTitle} text={dialogText}/>
            <Redirect render={redirectRender} path={redirectPath}/>
        </div>
    )
}
