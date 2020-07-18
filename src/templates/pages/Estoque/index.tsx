import React from 'react';

import './style.css';

import NavBar from './../../components/NavBar'

export default () => {
    return (
        <div className='estoque'>
            <header>
                <NavBar estoque/>
            </header>
            <main></main>
        </div>
    )
}
