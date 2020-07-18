import React from 'react';

import './style.css';

import NavBar from './../../components/NavBar'

export default () => {
    return (
        <div className='entrada'>
            <header>
                <NavBar entrada/>
            </header>
            <main></main>
        </div>
    )
}
