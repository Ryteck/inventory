import React from 'react';
import './style.css';
import NavBar from './../../components/NavBar'
import clond_up from '../../../assets/images/cloud_upload-white-48dp.svg'
import clond_dw from '../../../assets/images/cloud_download-white-48dp.svg'

export default () => {
    return (
        <div className='backup'>
            <header>
                <NavBar backup/>
            </header>
            <div className='space'/>
            <main>
                <div className='box'>
                    <img src={clond_up} alt="upload" />
                    <img src={clond_dw} alt="download"/>
                </div>
            </main>
        </div>
    )
}
