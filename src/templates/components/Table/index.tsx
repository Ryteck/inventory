import React, {useState} from "react";
import MaterialTable, {Column} from "material-table";
import Dialog from "../Dialog";

interface FunctionSaveDataInterface {
    (data: any): void
}

interface SpecialFunctionInterface {
    (data: any, del: boolean, upd: any): boolean
}

interface TablePropsInterface {
    title: string,
    collumns: Column<any>[],
    data: object[],
    save: FunctionSaveDataInterface,
    noRepeat?: {
        camp: string,
        list: Array<any>,
        message: string
    }
    requiredFields?: Array<string>,
    special?: {
        func: SpecialFunctionInterface,
        message: string
    }
}

export default ({title, collumns, data, save, noRepeat, requiredFields, special}: TablePropsInterface) => {
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>('');
    const [dialogText, setDialogText] = useState<string>('');

    return (
        <div className='table'>
            <MaterialTable
                title={title}
                columns={collumns}
                data={data}
                options={{
                    sorting: true,
                    rowStyle: rowData => ({backgroundColor: (selectedRow === rowData.tableData.id) ? '#eeeeee' : '#ffffff'}),
                    exportButton: true,
                    actionsCellStyle: {
                        textAlign: "center"
                    }
                }}
                onRowClick={(event, rowData) => {
                    if (rowData) {
                        setSelectedRow(rowData.tableData.id)
                    }
                }}
                editable={{
                    onRowAdd: newData => new Promise<any>((resolve, reject) => {
                        setTimeout(() => {
                            if (noRepeat) {
                                const veifyCamp = newData[noRepeat.camp]
                                if (noRepeat.list.find(value => value === veifyCamp)) {
                                    setDialogTitle('ERROR')
                                    setDialogText(noRepeat.message)
                                    setDialogOpen(true)
                                    reject()
                                    return
                                }
                            }
                            if (requiredFields?.find(value => {
                                if (newData[value] === undefined) {
                                    return true
                                }
                            })) {
                                setDialogTitle('ERROR')
                                setDialogText('Campos nulos')
                                setDialogOpen(true)
                                reject()
                                return;
                            }
                            if (special) {
                                if (special.func(newData, false, false)) {
                                    setDialogTitle('ERROR')
                                    setDialogText(special.message)
                                    setDialogOpen(true)
                                    reject()
                                    return;
                                }
                            }
                            newData.userId = Number(sessionStorage.getItem('id'))
                            save([...data, newData]);
                            resolve();
                        }, 1000);
                    }),
                    onRowUpdate: (newData, oldData) => new Promise<any>((resolve, reject) => {
                        setTimeout(() => {
                            if (noRepeat) {
                                const veifyCamp = newData[noRepeat.camp]
                                if (veifyCamp !== oldData[noRepeat.camp]) {
                                    if (noRepeat.list.find(value => value === veifyCamp)) {
                                        setDialogTitle('ERROR')
                                        setDialogText(noRepeat.message)
                                        setDialogOpen(true)
                                        reject()
                                        return
                                    }
                                }
                            }
                            if (special) {
                                if (special.func(newData, false, oldData)) {
                                    setDialogTitle('ERROR')
                                    setDialogText(special.message)
                                    setDialogOpen(true)
                                    reject()
                                    return;
                                }
                            }
                            if (requiredFields?.find(value => {
                                if (newData[value] === undefined) {
                                    return true
                                }
                            })) {
                                setDialogTitle('ERROR')
                                setDialogText('Campos nulos')
                                setDialogOpen(true)
                                reject()
                                return;
                            }
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            save([...dataUpdate]);
                            resolve();
                        }, 1000);
                    }),
                    onRowDelete: oldData => new Promise<any>((resolve, reject) => {
                        setTimeout(() => {
                            if (special) {
                                if (special.func(oldData, true, false)) {
                                    setDialogTitle('ERROR')
                                    setDialogText('Esta linha não pode ser apagada')
                                    setDialogOpen(true)
                                    reject()
                                    return;
                                }
                            }
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            save([...dataDelete]);
                            resolve();
                        }, 1000);
                    }),
                    onRowAddCancelled: () => new Promise<any>(resolve => setTimeout(() => resolve(), 1000)),
                    onRowUpdateCancelled: () => new Promise<any>(resolve => setTimeout(() => resolve(), 1000)),
                }}
                    />
                    <Dialog text={dialogText} title={dialogTitle} open={dialogOpen} setOpen={setDialogOpen}/>
                    </div>
                    )
                    }
