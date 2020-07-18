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
                    <Link to='/home'>
                        <input type='submit' value='Login'/>
                    </Link>
                    <Link to='/registro'>
                        <input type='button' value='Registro'/>
                    </Link>
                </form>
            </div>
        </div>
    )
}
