import React, {useState} from 'react';
import './style.css';
import Redirect from "../../components/Redirect";

export default () => {
    const [redirectRender, setRedirectRender] = useState<boolean>(false);
    const [redirectPath, setRedirectPath] = useState<string>('');

    function redirect(path: string) {
        setRedirectPath(path)
        setRedirectRender(true)
    }

    return (
        <div className='register'>
            <div className='box'>
                <h1>Registro</h1>
                <form>
                    <input type='text' name='name' placeholder='nome'/>
                    <input type='text' name='username' placeholder='username'/>
                    <input type='password' name='password' placeholder='password'/>
                    <input type='password' name='password_confirm' placeholder='confirmar password'/>
                    <input type='submit' value='Registrar'/>
                    <input type='button' value='Login' onClick={() => redirect('/')}/>
                </form>
            </div>
            <Redirect render={redirectRender} path={redirectPath}/>
        </div>
    )
}
