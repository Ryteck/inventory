import React from 'react';

import './style.css';

import NavBar from './../../components/NavBar'

export default () => {
    return (
        <div className='home'>
            <header>
                <NavBar home/>
            </header>
            <main></main>
        </div>
    )
}
