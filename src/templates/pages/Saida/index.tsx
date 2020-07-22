import React, {useEffect, useState} from 'react';
import {Column} from "material-table";
import './style.css';
import NavBar from './../../components/NavBar'
import Table from "../../components/Table";
import dataManager from "../../../services/dataManager";
import jsonConvert from "../../../helpers/jsonConvert";
import OutputJsonInterface from "../../../interfaces/outputJsonInterface";
import userController from "../../../controllers/userController";
import files from "../../../settings/files.json";
import InventoryJsonInterface from "../../../interfaces/inventoryJsonInterface";

interface SaidaTableInterface {
    id: Date,
    saida: number,
    what: string,
    who: string,
    userId: number
}

interface DataMinumalFunctionInterface {
    what: string,
    saida: number
}

const {path} = files[4]
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

    const collumns: Column<SaidaTableInterface>[] = [
        {
            title: 'id - quando foi retirado',
            field: 'id',
            type: 'datetime',
            align: 'center',
            editable: 'never',
            initialEditValue: new Date()
        },
        {title: 'Saida', field: 'saida', type: 'numeric', align: 'center'},
        {title: 'O que foi retirado', field: 'what', type: 'string', lookup: getAllItems()},
        {
            title: 'Quem retirou',
            field: 'who',
            type: 'string',
            align: 'center',
            editable: 'never',
            initialEditValue: sessionStorage.getItem('name')
        }
    ]

    const [tableData, setTableData] = useState<Array<SaidaTableInterface>>([])

    function save(data: [SaidaTableInterface]) {
        setTableData(data)
        dataManager.write(path, jsonConvert.toString({outputs: data}))
        loadElements()
    }

    function minimal(data: DataMinumalFunctionInterface, del: boolean, upd: DataMinumalFunctionInterface): boolean {
        const {saida, what} = data

        if (saida < 1) {
            return true
        }

        const {items} = jsonConvert.toJSON(dataManager.read(itemsPath) as string) as InventoryJsonInterface

        const item = items.find(value => (String(value.id) === what))

        if (item) {
            let newItems = {};
            if (del) {
                newItems = items.map(value => {
                    const {id, quantity} = value
                    let obj = value
                    if (String(id) === what) {
                        obj = {...value, quantity: quantity + saida}
                    }
                    return obj
                })
            } else if (upd) {
                const {saida: oldSaida} = upd
                if (item.quantity - (saida - oldSaida) < 0) {
                    return true
                }
                newItems = items.map(value => {
                    const {id, quantity} = value
                    let obj = value
                    if (String(id) === what) {
                        obj = {...value, quantity: quantity - (saida - oldSaida)}
                    }
                    return obj
                })
            } else {
                if (item.quantity - saida < 0) {
                    return true
                }
                newItems = items.map(value => {
                    const {id, quantity} = value
                    let obj = value
                    if (String(id) === what) {
                        obj = {...value, quantity: quantity - saida}
                    }
                    return obj
                })
            }
            dataManager.write(itemsPath, jsonConvert.toString({items: newItems}))
        } else {
            return true
        }
        return false
    }


    const loadElements = () => {
        const {outputs} = jsonConvert.toJSON(dataManager.read(path) as string) as OutputJsonInterface
        const formatedData = outputs.map(value => {
            const {id, saida, what, userId} = value
            const user = userController.show(userId)
            let who = 'erro'
            if (user) {
                who = user.name
            }
            return {id: new Date(id), saida, what, userId, who}
        })
        setTableData(formatedData)
    }

    useEffect(() => loadElements(), []);

    return (
        <div className='saida'>
            <header>
                <NavBar saida/>
            </header>
            <div className='space'/>
            <main>
                <Table title='Saída' collumns={collumns} data={tableData} save={save} requiredFields={['saida', 'what']}
                       special={{func: minimal, message: "o item vai ficar negativo ou o valor é < 1"}}/>
            </main>
        </div>
    )
}
