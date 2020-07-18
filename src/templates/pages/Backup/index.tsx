import React from 'react';

import './style.css';

import NavBar from './../../components/NavBar'

export default () => {
    return (
        <div className='backup'>
            <header>
                <NavBar backup/>
            </header>
            <main></main>
        </div>
    )
}
