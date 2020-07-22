import React, {useEffect, useState} from "react";
import {Column} from "material-table";
import './style.css';
import NavBar from './../../components/NavBar'
import Table from "../../components/Table";
import InventoryJsonInterface from "../../../interfaces/inventoryJsonInterface";
import jsonConvert from "../../../helpers/jsonConvert";
import dataManager from "../../../services/dataManager";
import files from "../../../settings/files.json";
import userController from "../../../controllers/userController";
import InputJsonInterface from "../../../interfaces/inputJsonInterface";
import OutputJsonInterface from "../../../interfaces/outputJsonInterface";

interface EstoqueTableInterface {
    id: number,
    name: string,
    quantity: number,
    who: string,
    when: Date,
    userId: number
}

const {path} = files[2];
const {path: pathEntradas} = files[3]
const {path: pathSaidas} = files[4]

export default () => {
    const index = (): InventoryJsonInterface => (jsonConvert.toJSON(dataManager.read(path) as string) as InventoryJsonInterface)
    const indexEntradas = (): InputJsonInterface => (jsonConvert.toJSON(dataManager.read(pathEntradas) as string) as InputJsonInterface)
    const indexSaidas = (): OutputJsonInterface => (jsonConvert.toJSON(dataManager.read(pathSaidas) as string) as OutputJsonInterface)

    const getNextId = (): number => {
        const {items} = index()
        if (!items.length) {
            return 0
        } else {
            const ids = items.map(value => value.id)
            const max = ids.reduce((previousValue, currentValue) => Math.max(previousValue, currentValue))
            return max + 1
        }
    }

    const collumns: Column<EstoqueTableInterface>[] = [
        {title: 'id', field: 'id', type: 'numeric', align: 'center', editable: 'never', initialEditValue: getNextId()},
        {
            title: 'nome', field: 'name', type: 'string', align: 'center'
        },
        {
            title: 'quantidade',
            field: 'quantity',
            type: 'numeric',
            align: 'center',
            editable: 'never',
            initialEditValue: 0
        },
        {
            title: 'Quem criou?',
            field: 'who',
            type: 'string',
            align: 'center',
            editable: 'never',
            initialEditValue: sessionStorage.getItem('name')
        },
        {
            title: 'Quando criou?',
            field: 'when',
            type: 'datetime',
            align: 'center',
            editable: 'never',
            initialEditValue: new Date()
        }
    ]

    const [tableData, setTableData] = useState<Array<EstoqueTableInterface>>([])
    const [noRepeatNameList, setNoRepeatNameList] = useState<Array<string>>([])

    function save(data: [EstoqueTableInterface]) {
        setTableData(data)
        dataManager.write(path, jsonConvert.toString({items: data}))
        loadElements()
    }


    const loadElements = () => {
        const {items} = index()
        const formatedData = items.map(value => {
            const {id, name, userId, when} = value
            const user = userController.show(userId)
            let who = 'erro'
            const {inputs} = indexEntradas()
            const {outputs} = indexSaidas()
            const inp = inputs.reduce((previousValue, currentValue) => {
                const {what, entrada} = currentValue
                let aux = 0
                if (what === String(id)) {
                    aux += entrada
                }
                return previousValue + aux
            }, 0)
            const out = outputs.reduce((previousValue, currentValue) => {
                const {what, saida} = currentValue
                let aux = 0
                if (what === String(id)) {
                    aux += saida
                }
                return previousValue + aux
            }, 0)
            const quantity = inp - out
            if (user) {
                who = user.name
            }
            return {id, name, who, quantity, userId, when: new Date(when)}
        })
        const names = items.map(value => value.name)
        setNoRepeatNameList(names)
        setTableData(formatedData)
    }

    useEffect(() => loadElements(), []);

    return (
        <div className='estoque'>
            <header>
                <NavBar estoque/>
            </header>
            <div className='space'/>
            <main>
                <Table title='Estoque' collumns={collumns} data={tableData} save={save} noRepeat={{
                    message: "Esse nome já esta sendo utilizado.",
                    list: noRepeatNameList,
                    camp: 'name'
                }} requiredFields={['name']}/>
            </main>
        </div>
    )
}
