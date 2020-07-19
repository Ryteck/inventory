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
        <div className='login'>
            <div className='box'>
                <h1>Login</h1>
                <form>
                    <input type='text' name='username' placeholder='username'/>
                    <input type='password' name='password' placeholder='password'/>
                    <input type='submit' value='Login' onClick={() => redirect('/home')}/>
                    <input type='button' value='Registro' onClick={() => redirect('/registro')}/>
                </form>
            </div>
            <Redirect render={redirectRender} path={redirectPath}/>
        </div>
    )
}
