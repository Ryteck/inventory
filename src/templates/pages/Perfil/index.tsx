import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form'
import './style.css';
import NavBar from './../../components/NavBar'
import userController from "../../../controllers/userController";
import passwordHelper from "../../../helpers/password";
import Dialog from "../../components/Dialog";
import Redirect from "../../components/Redirect";

interface PerfilInputsInterface {
    name: string,
    username: string,
    password_new?: string,
    password_new_confirm?: string,
    password_old: string
}

export default () => {
    const [redirectRender, setRedirectRender] = useState<boolean>(false);
    const [redirectPath, setRedirectPath] = useState<string>('');
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>('');
    const [dialogText, setDialogText] = useState<string>('');

    const {register, handleSubmit, errors} = useForm<PerfilInputsInterface>()

    function redirect(path: string) {
        setRedirectPath(path)
        setRedirectRender(true)
    }

    const [name, setName] = useState<string>('')
    const [username, setUsername] = useState<string>('')

    const onSubmit = ({name, username, password_new, password_new_confirm, password_old}: PerfilInputsInterface) => {
        let changePassword = false;
        if (password_new) {
            if (password_new_confirm) {
                if (password_new === password_new_confirm) {
                    changePassword = true
                } else {
                    setDialogTitle('Error')
                    setDialogText('As senhas não conferem')
                    setDialogOpen(true)
                    return
                }
            } else {
                setDialogTitle('Error')
                setDialogText('A nova senha não foi confirmada')
                setDialogOpen(true)
                return
            }
        }
        const id = Number(sessionStorage.getItem('id'))
        const user_old = userController.show(id)
        if (user_old) {
            const {password: password_current} = user_old
            if (passwordHelper.compare(password_old, password_current as string)) {
                let passwordTarget = password_current
                if (changePassword) {
                    passwordTarget = passwordHelper.encrypt(password_new as string)
                }
                sessionStorage.setItem('name', name)
                sessionStorage.setItem('username', username)
                setDialogTitle('OK')
                setDialogText('este usuário foi alterado')
                setDialogOpen(true)
                setTimeout(() => {
                    redirect('/home')
                }, 3000)
                userController.update(id, name, username, passwordTarget as string)
            } else {
                setDialogTitle('Error')
                setDialogText('a senha digitada está errada')
                setDialogOpen(true)
                return
            }
        } else {
            setDialogTitle('Error')
            setDialogText('usuário não encontrado')
            setDialogOpen(true)
            return
        }
    }

    const onReset = () => {
        setName(sessionStorage.getItem('name') as string)
        setUsername(sessionStorage.getItem('username') as string)
    }

    useEffect(() => onReset(), [])

    return (
        <div className='perfil'>
            <header>
                <NavBar perfil/>
            </header>
            <div className='space'/>
            <main>
                <div className='box'>
                    <h1>Perfil</h1>
                    <form onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
                        <input type='text' placeholder='nome' value={name}
                               onChange={event => setName(event.target.value)}
                               name='name' ref={register({required: true})}/>
                        {errors.name && <span>O campo "nome" está vazio</span>}
                        <input type='text' placeholder='username' value={username}
                               onChange={event => setUsername(event.target.value)}
                               name='username' ref={register({required: true})}/>
                        {errors.username && <span>O campo "username" está vazio</span>}
                        <input type='password' placeholder='opcional - nova senha'
                               name='password_new' ref={register({})}/>
                        <input type='password' placeholder='opcional - confirmar nova senha'
                               name='password_new_confirm' ref={register({})}/>
                        <input type='password' placeholder='senha'
                               name='password_old' ref={register({required: true})}/>
                        {errors.password_old && <span>O campo "senha" está vazio</span>}
                        <input type='submit' value='Enviar alterações'/>
                        <input type='reset' value='Resetar valores'/>
                    </form>
                </div>
            </main>
            <Dialog open={dialogOpen} setOpen={setDialogOpen} title={dialogTitle} text={dialogText}/>
            <Redirect render={redirectRender} path={redirectPath}/>
        </div>
    )
}
