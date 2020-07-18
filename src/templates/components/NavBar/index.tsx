import React, {useState} from "react";
import {Redirect} from "react-router-dom";

import './style.css'

interface NavBarInterface {
    home?: boolean,
    estoque?: boolean,
    entrada?: boolean,
    saida?: boolean,
    perfil?: boolean,
    backup?: boolean
}

export default ({home, estoque, entrada, saida, perfil, backup}: NavBarInterface) => {
    function classActivate(validator?:boolean): string {
        if (validator) return 'activate'
        else return ''
    }

    const homeClass = classActivate(home)
    const estoqueClass = classActivate(estoque)
    const entradaClass = classActivate(entrada)
    const saidaClass = classActivate(saida)
    const perfilClass = classActivate(perfil)
    const backupClass = classActivate(backup)

    const [redirectPath, setRedirectPath] = useState<string>('');
    const [redirectRender, setRedirectRender] = useState<boolean>(false);

    function redirect(path:string) {
        setRedirectPath(path)
        setRedirectRender(true)
    }

    function logout() {
        //clear data
        redirect('/')
    }

    return (
        <div className="navbar">
            <button className={homeClass + ' select'} disabled={home} onClick={() => redirect('/home')}>Home</button>
            <button className={estoqueClass + ' select'} disabled={estoque} onClick={() => redirect('/estoque')}>Estoque</button>
            <button className={entradaClass + ' select'} disabled={entrada} onClick={() => redirect('/entrada')}>Entrada</button>
            <button className={saidaClass + ' select'} disabled={saida} onClick={() => redirect('/saida')}>Saída</button>
            <button className={perfilClass + ' select'} disabled={perfil} onClick={() => redirect('/perfil')}>Perfil</button>
            <button className={backupClass + ' select'} disabled={backup} onClick={() => redirect('/backup')}>Backup</button>
            <button onClick={() => logout()}>Sair</button>
            {redirectRender ? <Redirect to={redirectPath}/> : null}
        </div>
    )
}
