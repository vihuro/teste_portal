
interface IRotasProps {
    text: string;
    link?: string;
    visible: boolean;
    rotas?: IRotasProps[];
    label: string,
}

interface IListMenusProps {
    class: string;
    icon: JSX.Element;
    text: string;
    visible: boolean;
    link: string;
    rotas: IRotasProps[];
}
interface IRole {
    text: string;
    role: IRoleSimple[];
}
interface IRoleSimple {
    name: string;
    value: string;
}

export type { IListMenusProps, IRotasProps, IRole }