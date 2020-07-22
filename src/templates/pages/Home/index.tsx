import React from 'react';
import './style.css';
import NavBar from './../../components/NavBar';
import cappuccino from '../../../assets/images/cappuccino.jpg'

export default () => {
    return (
        <div className='home'>
            <header>
                <NavBar home/>
            </header>
            <div/>
            <main>
                <div className='box'>
                    <img src={cappuccino} alt='cappuccino'/>
                    <label>
                        {sessionStorage.getItem('name')}
                        <br/>
                        tó aqui um cappuccino pra você
                        <br/>
                        pra alegrar seu dia
                    </label>
                </div>
            </main>
        </div>
    )
}
