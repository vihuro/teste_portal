import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { CellData, Column, ColumnExternal, Row } from "./ITableUi";
import { Icons } from "../../utils/IconDefault";



interface props {
    row: Row[],
    col: ColumnExternal[],
    nameTable: string
}

export function TableUi({ col, row, nameTable }: props) {

    const [column, setColumns] = useState<Column[]>([]);
    const [rowTable, setRowTable] = useState<Row[]>([]);
    const [toogleColumns, setToogleColumns] = useState<boolean>(false);

    useEffect(() => {
        setColumns(col.map((item, index) => ({
            id: `col${index}`,
            label: item.label,
            visible: true
        })))
        setRowTable(row);
    }, [row])



    const handleDragOver = (e: React.DragEvent, targetColId: string) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, targetColId: string) => {
        if (e.dataTransfer) {

            const draggedColId = e.dataTransfer.getData('text/plain');

            const updatedColumns = [...column];
            const draggedIndex = updatedColumns.findIndex((col) => col.id === draggedColId);
            const targetIndex = updatedColumns.findIndex((col) => col.id === targetColId);

            const [draggedColumn] = updatedColumns.splice(draggedIndex, 1);
            updatedColumns.splice(targetIndex, 0, draggedColumn);

            setColumns(updatedColumns);


            const filterUser = {
                userFilter: "vitorhugo",
                tableName: "Tabela Manutenção fabrica",
                roles: updatedColumns
            }

        }
    };
    const handleDragStart = (e: React.DragEvent, colId: string) => {
        if (e.dataTransfer) {
            e.dataTransfer.setData('text/plain', colId);

        }
    };


    return (
        <div className={styles.wrapTable} onClick={() => {
            setToogleColumns(false)
        }} >
            <div className={toogleColumns ?
                styles.containerColumnVisible :
                styles.containerColumnVisible_close}
                onClick={(e) => {
                    e.stopPropagation()
                }}>
                <div className={styles.wrapContainerColumnVisible} >
                    <ul className={styles.containerListVisible} >
                        {column.map((colItem, indexColumn) => (
                            <li key={indexColumn} className={colItem.visible ? styles.active : styles.noActive} >
                                <input type="checkbox" checked={colItem.visible}
                                    onChange={(e) => {

                                        setColumns(column.map((item, index) => ({
                                            ...item,
                                            visible: indexColumn === index ? !item.visible : item.visible
                                        })))
                                    }}
                                />
                                <label onClick={() => {
                                    setColumns(column.map((item, index) => ({
                                        ...item,
                                        visible: indexColumn === index ? !item.visible : item.visible
                                    })))
                                }}>
                                    {colItem.label}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={styles.columns} >
                <div className={styles.selectColumn} onClick={(e) => {
                    e.stopPropagation()
                    setToogleColumns(!toogleColumns)
                }} >
                    <label htmlFor="">COLUNAS</label>
                </div>

            </div>
            <div className={styles.wrapTableFixed} >
                <table className={styles.table} >
                    <thead>
                        <tr>
                            {column.map((colItem, indexColumn) => {
                                return (
                                    colItem.visible &&
                                    <th key={indexColumn}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, colItem.id)}
                                        onDragOver={(e) => handleDragOver(e, colItem.id)}
                                        onDrop={(e) => handleDrop(e, colItem.id)}
                                    >
                                        {colItem.label}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody className={styles.table_body} >
                        {rowTable.map((rowItem, indexRow) => (
                            <tr key={indexRow} >
                                {column.map((colItem) => {
                                    const Icon = rowItem.data[colItem.id]?.icon;
                                    const Function = rowItem.data[colItem.id]?.onClick;

                                    return (
                                        colItem.visible &&
                                        <td
                                            key={colItem.id}
                                            onClick={() => {
                                                if (Function) Function()
                                            }}
                                        >
                                            {rowItem.data[colItem.id]?.tag ?
                                                <p style={rowItem.data[colItem.id].tag} >{rowItem.data[colItem.id].label}</p> :
                                                rowItem.data[colItem.id] && rowItem.data[colItem.id].label
                                            }

                                            {Icon && <Icon />}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )


}