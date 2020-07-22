import React, {useState} from "react";
import MaterialTable, {Column} from "material-table";
import Dialog from "../Dialog";

interface TablePropsInterface {
    title: string,
    collumns: Column<any>[],
    data: object[],
    save: { (data: any): void },
    noRepeat?: {
        camp: string,
        list: Array<any>,
        message: string
    }
    requiredFields?: Array<string>,
    special?: {
        func: { (data: any, del: boolean, upd: any): boolean },
        message: string
    }
}

export default ({title, collumns, data, save, noRepeat, requiredFields, special}: TablePropsInterface) => {
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>('');
    const [dialogText, setDialogText] = useState<string>('');

    function openDialog(title: string, text: string) {
        setDialogTitle(title)
        setDialogText(text)
        setDialogOpen(true)
    }

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
                                    openDialog('Error', noRepeat.message)
                                    reject()
                                    return
                                }
                            }
                            if (requiredFields?.find(value => {
                                if (newData[value] === undefined) {
                                    return true
                                }
                            })) {
                                openDialog('Error', 'Campos nulos')
                                reject()
                                return;
                            }
                            if (special) {
                                if (special.func(newData, false, false)) {
                                    openDialog('Error', special.message)
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
                                        openDialog('Error', noRepeat.message)
                                        reject()
                                        return
                                    }
                                }
                            }
                            if (special) {
                                if (special.func(newData, false, oldData)) {
                                    openDialog('Error', special.message)
                                    reject()
                                    return;
                                }
                            }
                            if (requiredFields?.find(value => {
                                if (newData[value] === undefined) {
                                    return true
                                }
                            })) {
                                openDialog('Error', 'Campos nulos')
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
                                    openDialog('Error', 'Esta linha não pode ser apagada')
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
