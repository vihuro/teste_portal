import { ElementType } from "react";


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
    tagInfo?: Function,
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

export type { Column, Row, CellData, ColumnExternal }