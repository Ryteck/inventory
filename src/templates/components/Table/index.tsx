import React, {useState} from "react";
import MaterialTable, {Column} from "material-table";

interface TablePropsInterface {
    title: string,
    collumns: Column<any>[],
    data: object[]
}

export default ({title, collumns, data}: TablePropsInterface) => {
    const [selectedRow, setSelectedRow] = useState<number | null>(null);

    const [tableData, setTableData] = useState(data)

    return (
        <div className='table'>
            <MaterialTable
                title={title}
                columns={collumns}
                data={tableData}
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
                    onRowAdd: newData => new Promise<any>(resolve => {
                        setTimeout(() => {
                            setTableData([...tableData, newData]);
                            resolve();
                        }, 1000);
                    }),
                    onRowUpdate: (newData, oldData) => new Promise<any>(resolve => {
                        setTimeout(() => {
                            const dataUpdate = [...tableData];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            setTableData([...dataUpdate]);
                            resolve();
                        }, 1000);
                    }),
                    onRowDelete: oldData => new Promise<any>(resolve => {
                        setTimeout(() => {
                            const dataDelete = [...tableData];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setTableData([...dataDelete]);
                            resolve();
                        }, 1000);
                    })
                }}
            />
        </div>
    );
}
