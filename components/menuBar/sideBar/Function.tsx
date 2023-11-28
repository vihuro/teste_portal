import { IRole, IRotasProps } from "./IProps";

const roles: IRole[] = [
    {
        text: "ESTOQUE",
        role: [
            {
                name: "ESTOQUE - GRM - MATRIZ",
                value: "EXPEDIÇÃO - LEITURA"
            },
            {
                name: "ESTOQUE - GRM - MATRIZ",
                value: "EXPEDIÇÃO - GRAVAÇÃO"
            },
            {
                name: "ESTOQUE - GRM - MATRIZ",
                value: "COMUNICADOR - GRAVAÇÃO"
            },
            {
                name: "ESTOQUE - GRM - MATRIZ",
                value: "COMUNICADOR - LEITURA"
            },
            {
                name: "ESTOQUE - GRM - MATRIZ",
                value: "TI"
            }
        ]
    },
    {
        text: "ESTOQUE FÁBRICA",
        role: [
            {
                name: "ESTOQUE - FÁBRICA - TI",
                value: "ESTOQUE - FÁBRICA - APONTADOR"
            },
            {
                name: "ESTOQUE - FÁBRICA",
                value: "ESTOQUE - FÁBRICA - ESTOQUISTA"
            },
            {
                name: "ESTOQUE - FÁBRICA",
                value: "ESTOQUE - FÁBRICA - EMPILHADOR"
            },
            {
                name: "ESTOQUE - FÁBRICA",
                value: "ESTOQUE - FÁBRICA - CQ"
            },
            {
                name: "ESTOQUE - FÁBRICA - TI",
                value: "ESTOQUE - FÁBRICA - TI"
            },
            {
                name: "ESTOQUE - GRM - MATRIZ",
                value: "TI"
            }
        ]
    },
    {
        text: "ESTOQUE GERENCIAL",
        role: [
            {
                name: "ESTOQUE - GRM - MATRIZ",
                value: "EXPEDIÇÃO - LEITURA"
            },
            {
                name: "ESTOQUE - GRM - MATRIZ",
                value: "EXPEDIÇÃO - GRAVAÇÃO"
            },
            {
                name: "ESTOQUE - GRM - MATRIZ",
                value: "COMUNICADOR - GRAVAÇÃO"
            },
            {
                name: "ESTOQUE - GRM - MATRIZ",
                value: "COMUNICADOR - LEITURA"
            },
            {
                name: "ESTOQUE - GRM - MATRIZ",
                value: "TI"
            }
        ]
    },
    {
        text: "PRODUÇÃO",
        role: [
            {
                name: "PRODUCAO - FÁBRICA",
                value: "TI"
            },
        ]
    },
    {
        text: "EXPEDIÇÃO",
        role: [
            {
                name: "EXPEDIÇÃO - FÁBRICA",
                value: "TI"
            },
            {
                name: "EXPEDIÇÃO - MATRIZ",
                value: "TI"
            },
        ]
    },
    {
        text: "COMPRAS",
        role: [
            {
                name: "GERENCIAL",
                value: "TI"
            },
            {
                name: "COMPRAS - MATRIZ",
                value: "TI"
            },
        ]
    },
    {
        text: "GERENCIAL",
        role: [
            {
                name: "GERENCIAL",
                value: "TI"
            },
        ]
    },
    {
        text: "ASSISTÊNCIA TÉCNICA",
        role: [{
            name: "GERENCIAL",
            value: "TI"
        }]
    },
    {
        text: "Assistência Matriz",
        role: [
            {
                name: "GERENCIAL",
                value: "TI"
            },
        ]
    },
    {
        text: "Manutenção Fábrica",
        role: [
            {
                name: "GERENCIAL",
                value: "TI"
            },
        ]
    }
]

export {
    roles
}