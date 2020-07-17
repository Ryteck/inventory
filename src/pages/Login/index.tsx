import React from 'react';

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
                    <input type='button' value='Registro'/>
                </form>
            </div>
        </div>
    )
}
