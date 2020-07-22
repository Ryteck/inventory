import React from 'react';
import './style.css';
import Routes from './Routes';
import data from './../services/dataManager';
import files from '../settings/files.json'

const {exists} = data;

files.forEach(file => {
    const {path, dir, name} = file
    exists(path, dir, name)
});

export default () => <Routes/>
