import React, {useEffect, useState} from 'react';
import {Column} from "material-table";
import files from "../../../settings/files.json";
import './style.css';
import NavBar from './../../components/NavBar'
import Table from "../../components/Table";
import dataManager from "../../../services/dataManager";
import jsonConvert from "../../../helpers/jsonConvert";
import InputJsonInterface from "../../../interfaces/inputJsonInterface";
import userController from "../../../controllers/userController";
import InventoryJsonInterface from "../../../interfaces/inventoryJsonInterface";

interface EntradaTableInterface {
    id: Date,
    entrada: number,
    what: string
    who: string,
    userId: number
}

interface DataMinumalFunctionInterface {
    what: string,
    entrada: number
}

const {path} = files[3]
const {path: itemsPath} = files[2]

export default () => {
    const getAllItems = (): object => {
        const {items} = jsonConvert.toJSON(dataManager.read(itemsPath) as string) as InventoryJsonInterface
        const dinamic: any = {};
        items.map(item => {
            const {id, name} = item
            dinamic[id] = `${id} - ${name}`
        })
        return dinamic
    }

    const collumns: Column<EntradaTableInterface>[] = [
        {
            title: 'id - quando foi adcionado',
            field: 'id',
            type: 'datetime',
            align: 'center',
            editable: 'never',
            initialEditValue: new Date()
        },
        {title: 'Entrada', field: 'entrada', type: 'numeric', align: 'center'},
        {title: 'O que foi colocado', field: 'what', type: 'string', lookup: getAllItems()},
        {
            title: 'Quem colocou',
            field: 'who',
            type: 'string',
            align: 'center',
            editable: 'never',
            initialEditValue: sessionStorage.getItem('name')
        }
    ]

    const [tableData, setTableData] = useState<Array<EntradaTableInterface>>([])

    function save(data: [EntradaTableInterface]) {
        setTableData(data)
        dataManager.write(path, jsonConvert.toString({inputs: data}))
        loadElements()
    }

    function minimal(data: DataMinumalFunctionInterface): boolean {
        const {entrada, what} = data
        const {items} = jsonConvert.toJSON(dataManager.read(itemsPath) as string) as InventoryJsonInterface
        const item = items.find(value => {
            const {id} = value
            if (String(id) === what){
                return true
            }
        })
        if (item){
            const newItems = items.map(value => {
                let obj = value
                if (String(value.id) === what){
                    const {quantity} = value
                    obj = {...value, quantity: quantity+entrada}
                }
                return obj
            })
            dataManager.write(itemsPath, jsonConvert.toString({items: newItems}))
        }else{
            return true;
        }
        return false
    }

    const loadElements = () => {
        const {inputs} = jsonConvert.toJSON(dataManager.read(path) as string) as InputJsonInterface
        const formatedData = inputs.map(value => {
            const {id, entrada, what, userId} = value
            const user = userController.show(userId)
            let who = 'erro'
            if (user) {
                who = user.name
            }
            return {id: new Date(id), entrada, what, userId, who}
        })
        setTableData(formatedData)
    }

    useEffect(() => loadElements(), []);

    return (
        <div className='entrada'>
            <header>
                <NavBar entrada/>
            </header>
            <div className='space'/>
            <main>
                <Table title='Entrada' collumns={collumns} data={tableData} save={save} requiredFields={['entrada', 'what']} special={{func: minimal, message: 'Erro desconhecido'}}/>
            </main>
        </div>
    )
}
