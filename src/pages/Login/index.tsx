import React from 'react';
import {Link} from 'react-router-dom'

import './style.css';

export default () => {
    return (
        <div className='login'>
            <div className='box'>
                <h1>Login</h1>
                <form>
                    <input type='text' name='username' placeholder='username'/>
                    <input type='password' name='password' placeholder='password'/>
                    <input type='submit' value='Login'/>
                    <Link to='/register'>
                        <input type='button' value='Registro'/>
                    </Link>
                </form>
            </div>
        </div>
    )
}
