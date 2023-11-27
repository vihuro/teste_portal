import { StyleKey } from "./IOrderService"

function SearchColorPrioridade(text: string) {
    const colors = PRIORIDADE[text];

    return {
        background: colors ? colors.background : "",
        color: colors ? colors.color : ""
    }
}
function SearchColorStatus(text: string) {
    const colors = STATUS[text];


    return {
        background: colors ? colors.background : "",
        color: colors ? colors.color : "",
        fontWeight: colors ? colors.fontWeight : ""
    };
}

const PRIORIDADE: StyleKey = {
    "ALTO": {
        background: "#ff0000",
        color: "#7d0404"
    },
    "BAIXO": {
        background: "#00ff50",
        color: "#046d25"
    },
    "MÉDIO": {
        background: "#0035ff",
        color: "#ffffff87"
    }
}
const STATUS: StyleKey = {
    "AGUARDANDO ATRIBUIÇÃO": {
        background: "#feff00",
        color: "#747512"
    },
    "AGURDANDO MANUTENÇÃO": {
        background: "#ffa200",
        color: "#6b4708"
    },
    "AGUARDANDO PEÇAS": {
        background: "#4d00ff",
        color: "#f9f9f9a1"
    },
    "AGUARDANDO COMPRA DE PEÇAS": {
        background: "#4d00ff",
        color: "#fbfafb9e"
    },
    "AGUARDANDO CHEGADA DE PEÇAS": {
        background: "#ff00c6",
        color: "#811569"
    },
    "AGUARDANDO VERIFIÇÃO DE PEÇAS": {
        background: "#00f1ff",
        color: "#0a7c83"
    },
    "AGUARDANDO FINALIZAÇÃO DE MANUTENÇÃO": {
        background: "#ff0045",
        color: "#7b0928"
    }
};

export {
    SearchColorPrioridade,
    SearchColorStatus
}
