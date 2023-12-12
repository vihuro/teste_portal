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
                name: "GERENCIAL",
                value: "TI"
            },
            {
                name: "ESTOQUE - GRM - MATRIZ",
                value: "EXPEDIÇÃO - ALTERAÇÃO"
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
                name: "GERENCIAL",
                value: "TI"
            },
            {
                name: "ESTOQUE - GRM - MATRIZ",
                value: "BI"
            },
        ]
    },
    {
        text: "ESTOQUE FÁBRICA",
        role: [
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
                name: "GERENCIAL",
                value: "TI"
            }
        ]
    },
    {
        text: "ESTOQUE MATRIZ",
        role: [
            {
                name: "ESTOQUE - GRM - MATRIZ",
                value: "EXPEDIÇÃO - LEITURA"
            },
            {
                name: "ESTOQUE - GRM - MATRIZ",
                value: "EXPEDIÇÃO - ALTERAÇÃO"
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
                name: "GERENCIAL",
                value: "TI"
            },
            {
                name: "ESTOQUE - GRM - MATRIZ",
                value: "BI"
            },
        ]
    },
    {
        text: "ESTOQUE MATRIZ TABELA",
        role: [
            {
                name: "ESTOQUE - GRM - MATRIZ",
                value: "EXPEDIÇÃO - LEITURA"
            },
            {
                name: "ESTOQUE - GRM - MATRIZ",
                value: "EXPEDIÇÃO - ALTERAÇÃO"
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
                name: "GERENCIAL",
                value: "TI"
            },
        ]
    },
    {
        text: "ESTOQUE MATRIZ BI",
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
                name: "GERENCIAL",
                value: "TI"
            },
            {
                name: "ESTOQUE - GRM - MATRIZ",
                value: "BI"
            },
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
            },
            {
                name: "GERENCIAL",
                value: "TI"
            }
        ]
    },
    {
        text: "PRODUÇÃO",
        role: [
            {
                name: "GERENCIAL",
                value: "TI"
            },
        ]
    },
    {
        text: "EXPEDIÇÃO",
        role: [
            {
                name: "GERENCIAL",
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
            }
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
        role: [
            {
                name: "GERENCIAL",
                value: "TI"
            },
            {
                name: "ASSISTÊNCIA TÉCNICA",
                value: "TÉCNICO"
            },
            {
                name: "ASSISTÊNCIA TÉCNICA",
                value: "ADM"
            },
        ]
    },
    {
        text: "ASSISTÊNCIA MATRIZ",
        role: [
            {
                name: "ASSISTÊNCIA TÉCNICA",
                value: "TÉCNICO"
            },
            {
                name: "ASSISTÊNCIA TÉCNICA",
                value: "ADM"
            },
            {
                name: "GERENCIAL",
                value: "TI"
            },
        ]
    },
    {
        text: "BI ASSISTEC GEREAL",
        role: [
            {
                name: "ASSISTÊNCIA TÉCNICA",
                value: "TÉCNICO"
            },
            {
                name: "ASSISTÊNCIA TÉCNICA",
                value: "ADM"
            },
            {
                name: "GERENCIAL",
                value: "TI"
            },
        ]
    },
    {
        text: "ORÇAMENTO ASSITEC",
        role: [
            {
                name: "ASSISTÊNCIA TÉCNICA",
                value: "TÉCNICO"
            },
            {
                name: "ASSISTÊNCIA TÉCNICA",
                value: "ADM"
            },
            {
                name: "GERENCIAL",
                value: "TI"
            },
        ]
    },
    {
        text: "CLIENTE ASSITEC",
        role: [
            {
                name: "ASSISTÊNCIA TÉCNICA",
                value: "ADM"
            },
            {
                name: "GERENCIAL",
                value: "TI"
            },
        ]
    },
    {
        text: "PEÇAS ASSISTEC",
        role: [
            {
                name: "ASSISTÊNCIA TÉCNICA",
                value: "ADM"
            },
            {
                name: "GERENCIAL",
                value: "TI"
            },
        ]
    },
    {
        text: "MÁQUINAS ASSISTEC",
        role: [
            {
                name: "ASSISTÊNCIA TÉCNICA",
                value: "ADM"
            },
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
    },
    {
        text: "Usuários Gerencial",
        role: [
            {
                name: "GERENCIAL",
                value: "TI"
            }
        ]
    },
    {
        text: "Estoque Matriz Gerencial",
        role: [
            {
                name: "GERENCIAL",
                value: "TI"
            }
        ]
    }
]

export {
    roles
}