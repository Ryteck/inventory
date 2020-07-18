import React from 'react';

import './style.css';

import NavBar from './../../components/NavBar'

export default () => {
    return (
        <div className='saida'>
            <header>
                <NavBar saida/>
            </header>
            <main></main>
        </div>
    )
}
