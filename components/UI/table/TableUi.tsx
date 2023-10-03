import { ElementType, useEffect, useState } from "react";
import styles from "./style.module.css";

interface Column {
    id: string;
    label: string;
    visible: boolean
}

interface Row {
    id: number;
    data: Record<string, CellData>;
}
interface CellData {
    label: string;
    tag?: TagData,
    icon?: ElementType; // Pode ajustar o tipo de ícone conforme necessário
    onClick?: Function; // Pode ajustar o tipo de função conforme necessário
}
interface TagData {
    background: string,
    color: string
}
interface ColumnExternal {
    label: string
}

interface props {
    row: Row[],
    col: ColumnExternal[],
    nameTable: string
}

export function TableUi({ col, row }: props) {

    const [column, setColumns] = useState<Column[]>([]);
    const [rowTable, setRowTable] = useState<Row[]>([]);

    useEffect(() => {
        setColumns(col.map((item, index) => ({
            id: `col${index}`,
            label: item.label,
            visible: true
        })))
        setRowTable(row);
    }, [row])

    console.log(column)
    console.log(rowTable)

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
        }
    };
    const handleDragStart = (e: React.DragEvent, colId: string) => {
        if (e.dataTransfer) {
            e.dataTransfer.setData('text/plain', colId);

        }
    };


    return (
        <div className={styles.wrapTable} >
            <div className={styles.containerColumnVisible} >
                <ul className={styles.containerListVisible} >
                    {column.map((colItem, indexColumn) => (
                        <li key={indexColumn} >
                            <input type="checkbox" checked={colItem.visible}
                                onChange={(e) => {
                                    console.log(e)
                                    setColumns(column.map((item, index) => ({
                                        ...item,
                                        visible: indexColumn === index ? !item.visible: item.visible
                                    })))
                                }}
                            />
                            {colItem.label}
                        </li>
                    ))}
                </ul>
            </div>
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
                                const Icon = rowItem.data[colItem.id].icon;
                                const Function = rowItem.data[colItem.id].onClick;

                                return (
                                    colItem.visible &&
                                    <td
                                        key={colItem.id}
                                        onClick={() => {
                                            if (Function) Function()
                                        }}
                                    >
                                        {rowItem.data[colItem.id].tag ?
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
    )


}