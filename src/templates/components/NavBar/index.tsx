import React, {useState} from "react";
import './style.css'
import Redirect from './../Redirect';
import tokenHelper from "../../../helpers/token";
import TranslateTokenInterface from "../../../interfaces/translateTokenInterface";
import TokenInterface from "../../../interfaces/tokenInterface";

interface NavBarPropsInterface {
    home?: boolean,
    estoque?: boolean,
    entrada?: boolean,
    saida?: boolean,
    perfil?: boolean,
    backup?: boolean
}

export default ({home, estoque, entrada, saida, perfil, backup}: NavBarPropsInterface) => {
    const [redirectRender, setRedirectRender] = useState<boolean>(false);
    const [redirectPath, setRedirectPath] = useState<string>('');

    const homeClass = classActivate(home)
    const estoqueClass = classActivate(estoque)
    const entradaClass = classActivate(entrada)
    const saidaClass = classActivate(saida)
    const perfilClass = classActivate(perfil)
    const backupClass = classActivate(backup)

    function classActivate(validator?: boolean): string {
        if (validator) return 'activate'
        else return ''
    }

    function redirect(path: string) {
        setRedirectPath(path)
        setRedirectRender(true)
    }

    function logout() {
        sessionStorage.clear()
        redirect('/')
    }

    setTimeout(() => {
        if (!sessionStorage.getItem('token')) {
            logout()
        } else {
            const token = sessionStorage.getItem('token')
            const id = sessionStorage.getItem('id')

            const translateToken = tokenHelper.translateToken(token as string) as TranslateTokenInterface
            if (translateToken.error) {
                logout()
            } else {
                const data = translateToken.data as TokenInterface
                if (data.secret.id.toString() !== id) {
                    logout()
                }
            }
        }
    }, 1000)


    return (
        <div className="navbar">
            <button className={homeClass + ' select'} disabled={home} onClick={() => redirect('/home')}>Home</button>
            <button className={estoqueClass + ' select'} disabled={estoque}
                    onClick={() => redirect('/estoque')}>Estoque
            </button>
            <button className={entradaClass + ' select'} disabled={entrada}
                    onClick={() => redirect('/entrada')}>Entrada
            </button>
            <button className={saidaClass + ' select'} disabled={saida} onClick={() => redirect('/saida')}>Saída
            </button>
            <button className={perfilClass + ' select'} disabled={perfil} onClick={() => redirect('/perfil')}>Perfil
            </button>
            <button className={backupClass + ' select'} disabled={backup} onClick={() => redirect('/backup')}>Backup
            </button>
            <button onClick={() => logout()}>Sair</button>
            <Redirect render={redirectRender} path={redirectPath}/>
        </div>
    )
}
