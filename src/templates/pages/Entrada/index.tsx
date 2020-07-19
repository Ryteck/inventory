import React from 'react';
import {Column} from "material-table";

import './style.css';

import NavBar from './../../components/NavBar'
import Table from "../../components/Table";

const collumns: Column<any>[] = [
    {title: 'ID', field: 'id', type: 'numeric', align: 'center'},
    {title: 'NOME', field: 'name', type: 'string', align: 'center'},
    {title: 'QUANTIDADE', field: 'quantity', type: 'numeric', align: 'center'},
    {title: 'Quem criou?', field: 'who', type: 'string', align: 'center'},
    {title: 'Quando criou?', field: 'when', type:'datetime', align: 'center'},
]

export default () => {
    return (
        <div className='entrada'>
            <header>
                <NavBar entrada/>
            </header>
            <main>
                <Table title='Entrada' collumns={collumns} data={[]} />
            </main>
        </div>
    )
}
