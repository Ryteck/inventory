import React from 'react';
import {Link} from "react-router-dom";

import './style.css';

export default () => {
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
                    <Link to='/'>
                        <input type='button' value='Login'/>
                    </Link>
                </form>
            </div>
        </div>
    )
}
