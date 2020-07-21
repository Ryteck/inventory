import React, {useState} from 'react';
import {Column} from "material-table";

import './style.css';

import NavBar from './../../components/NavBar'
import Table from "../../components/Table";

interface EstoqueTableInterface {
    id: number,
    name: string,
    quantity: number,
    who: string,
    when: string
}

export default () => {
    const collumns: Column<any>[] = [
        {title: 'ID', field: 'id', type: 'numeric', align: 'center'},
        {title: 'NOME', field: 'name', type: 'string', align: 'center'},
        {title: 'QUANTIDADE', field: 'quantity', type: 'numeric', align: 'center'},
        {title: 'Quem criou?', field: 'who', type: 'string', align: 'center'},
        {title: 'Quando criou?', field: 'when', type:'datetime', align: 'center'},
    ]

    const [tableData, setTableData] = useState<Array<EstoqueTableInterface>>([])

    function save(data: [EstoqueTableInterface]) {
        setTableData(data)
    }

    return (
        <div className='entrada'>
            <header>
                <NavBar entrada/>
            </header>
            <main>
                <Table title='Entrada' collumns={collumns} data={tableData} save={save}/>
            </main>
        </div>
    )
}
