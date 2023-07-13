import { randomUUID } from "crypto"

const Mock = [
    {
        id: "9d24c077-28db-4120-b907-7cb4f4d29200",
        codigo: "SPMN101001",
        descricao: "FILME STRETCH MAN ECO 500 X 0,030 B4 T4",
        unidade: "KG",
        quantidadeEmEstoque: 500.5,
        quantidadeMaxima: 5000,
        quantidadeSeguranca: 300,
        quantidadeMinima: 100,
        cadastro: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioCadastro: "Vitor Hugo",
            dataHoraCadastro: new Date()
        }],
        alteracao: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioAlteracao: "Vitor Hugo",
            dataHoraAlteracao: new Date()
        }],
        statusCodigo: "ATIVO",
        statusQuantidade: "",
        tipoMaterial: "P.A",
        categoriaMaterial: "STRETCH ECO",
        categoriaMaterial2: "",
        fornecedor: "THR"

    },
    {
        id: randomUUID,
        codigo: "SPMN101002",
        descricao: "FILME STRETCH MAN ECO 500 X 0,030 B4 T1,4",
        unidade: "KG",
        quantidadeEmEstoque: 800,
        quantidadeMaxima: 5000,
        quantidadeSeguranca: 300,
        quantidadeMinima: 100,
        cadastro: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioCadastro: "Vitor Hugo",
            dataHoraCadastro: new Date()
        }],
        alteracao: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioAlteracao: "Vitor Hugo",
            dataHoraAlteracao: new Date(),
        }],
        statusCodigo: "INATIVO",
        statusQuantidade: "",
        tipoMaterial: "P.A",
        categoriaMaterial: "STRETCH ECO",
        categoriaMaterial2: "",
        fornecedor: "THR"

    },
    {
        id: randomUUID,
        codigo: "SPMN101003",
        descricao: "FILME STRETCH MAN ECO 500 X 0,030 B4 T4",
        unidade: "KG",
        quantidadeEmEstoque: 100,
        quantidadeMaxima: 5000,
        quantidadeSeguranca: 300,
        quantidadeMinima: 500,
        cadastro: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioCadastro: "Vitor Hugo",
            dataHoraCadastro: new Date()
        }],
        alteracao: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioAlteracao: "Vitor Hugo",
            dataHoraAlteracao: new Date()
        }],
        statusCodigo: "ATIVO",
        statusQuantidade: "",
        tipoMaterial: "P.A",
        categoriaMaterial: "STRETCH ECO",
        categoriaMaterial2: "",
        fornecedor: "THR"
    },
    {
        id: randomUUID,
        codigo: "SPMN101004",
        descricao: "FILME STRETCH MAN ECO 500 X 0,030 B4 T4",
        unidade: "KG",
        quantidadeEmEstoque: 500.5,
        quantidadeMaxima: 1000,
        quantidadeSeguranca: 300,
        quantidadeMinima: 100,
        cadastro: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioCadastro: "Vitor Hugo",
            dataHoraCadastro: new Date()
        }],
        alteracao: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioAlteracao: "Vitor Hugo",
            dataHoraAlteracao: new Date()
        }],
        statusCodigo: "ATIVO",
        statusQuantidade: "",
        tipoMaterial: "P.A",
        categoriaMaterial: "STRETCH ECO",
        categoriaMaterial2: "",
        fornecedor: "THR"

    },
    {
        id: randomUUID,
        codigo: "SPJN101001",
        descricao: "FILME STRETCH JUMBO MAN ECO 500 X 0,030 B50 T1,4",
        unidade: "KG",
        quantidadeEmEstoque: 15000,
        quantidadeMaxima: 30000,
        quantidadeSeguranca: 15000,
        quantidadeMinima: 10000,
        cadastro: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioCadastro: "Vitor Hugo",
            dataHoraCadastro: new Date()
        }],
        alteracao: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioAlteracao: "Vitor Hugo",
            dataHoraAlteracao: new Date()
        }],
        statusCodigo: "ATIVO",
        statusQuantidade: "",
        tipoMaterial: "M.P",
        categoriaMaterial: "STRETCH ECO",
        categoriaMaterial2: "",
        fornecedor: "THR"

    },
    {
        id: randomUUID,
        codigo: "SPJN101002",
        descricao: "FILME STRETCH JUMBO MAN 500 X 0,030 B50 T1,4",
        unidade: "KG",
        quantidadeEmEstoque: 15000,
        quantidadeMaxima: 30000,
        quantidadeSeguranca: 15000,
        quantidadeMinima: 10000,
        cadastro: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioCadastro: "Vitor Hugo",
            dataHoraCadastro: new Date()
        }],
        alteracao: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioAlteracao: "Vitor Hugo",
            dataHoraAlteracao: new Date()
        }],
        statusCodigo: "ATIVO",
        statusQuantidade: "",
        tipoMaterial: "M.P",
        categoriaMaterial: "STRETCH",
        categoriaMaterial2: "",
        fornecedor: "MANAUS"

    },
    {
        id: randomUUID,
        codigo: "SPJN101003",
        descricao: "FILME STRETCH JUMBO ECO 500 X 0,030 B50 T1,4",
        unidade: "KG",
        quantidadeEmEstoque: 15000,
        quantidadeMaxima: 30000,
        quantidadeSeguranca: 15000,
        quantidadeMinima: 10000,
        cadastro: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioCadastro: "Vitor Hugo",
            dataHoraCadastro: new Date()
        }],
        alteracao: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioAlteracao: "Vitor Hugo",
            dataHoraAlteracao: new Date()
        }],
        statusCodigo: "ATIVO",
        statusQuantidade: "",
        tipoMaterial: "M.P",
        categoriaMaterial: "STRETCH",
        categoriaMaterial2: "",
        fornecedor: "EURO-PACK"

    },
    {
        id: randomUUID,
        codigo: "SRKN101001",
        descricao: "FILME SHRINK IF 400 X 0,017 B20 T,4",
        unidade: "KG",
        quantidadeEmEstoque: 5000,
        quantidadeMaxima: 0,
        quantidadeSeguranca: 0,
        quantidadeMinima: 0,
        cadastro: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioCadastro: "Vitor Hugo",
            dataHoraCadastro: new Date()
        }],
        alteracao: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioAlteracao: "Vitor Hugo",
            dataHoraAlteracao: new Date()
        }],
        statusCodigo: "ATIVO",
        statusQuantidade: "",
        tipoMaterial: "P.A",
        categoriaMaterial: "SHRINK",
        categoriaMaterial2: "",
        fornecedor: "THR"

    },
    {
        id: randomUUID,
        codigo: "SRKN101002",
        descricao: "FILME SHRINK IF 400 X 0,017 B18 T,4",
        unidade: "KG",
        quantidadeEmEstoque: 0,
        quantidadeMaxima: 0,
        quantidadeSeguranca: 0,
        quantidadeMinima: 0,
        cadastro: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioCadastro: "Vitor Hugo",
            dataHoraCadastro: new Date()
        }],
        alteracao: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioAlteracao: "Vitor Hugo",
            dataHoraAlteracao: new Date()
        }],
        statusCodigo: "ATIVO",
        statusQuantidade: "",
        tipoMaterial: "P.A",
        categoriaMaterial: "SHRINK",
        categoriaMaterial2: "",
        fornecedor: "THR"

    },
    {
        id: randomUUID,
        codigo: "PETN101001",
        descricao: "FLAKE VERDE",
        unidade: "KG",
        quantidadeEmEstoque: 30000.5,
        quantidadeMaxima: 25000,
        quantidadeSeguranca: 20000,
        quantidadeMinima: 10000,
        cadastro: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioCadastro: "Vitor Hugo",
            dataHoraCadastro: new Date()
        }],
        alteracao: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioAlteracao: "Vitor Hugo",
            dataHoraAlteracao: new Date()
        }],
        statusCodigo: "ATIVO",
        statusQuantidade: "",
        tipoMaterial: "M.P",
        categoriaMaterial: "FLAKE",
        categoriaMaterial2: "",
        fornecedor: "HD"

    },
    {
        id: randomUUID,
        codigo: "PETN101010",
        descricao: "FITA DE ARQUEAR PET 12 X 0,65 C/2000",
        unidade: "KG",
        quantidadeEmEstoque: 30000.5,
        quantidadeMaxima: 25000,
        quantidadeSeguranca: 20000,
        quantidadeMinima: 10000,
        cadastro: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioCadastro: "Vitor Hugo",
            dataHoraCadastro: new Date()
        }],
        alteracao: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioAlteracao: "Vitor Hugo",
            dataHoraAlteracao: new Date()
        }],
        statusCodigo: "ATIVO",
        statusQuantidade: "",
        tipoMaterial: "P.A",
        categoriaMaterial: "PET VIRGEM",
        categoriaMaterial2: "",
        fornecedor: "THR"

    },
    {
        id: randomUUID,
        codigo: "PETN101011",
        descricao: "FITA DE ARQUEAR PET 10 X 0,65 C/2000",
        unidade: "ROL",
        quantidadeEmEstoque: 30000.5,
        quantidadeMaxima: 25000,
        quantidadeSeguranca: 20000,
        quantidadeMinima: 10000,
        cadastro: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioCadastro: "Vitor Hugo",
            dataHoraCadastro: new Date()
        }],
        alteracao: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioAlteracao: "Vitor Hugo",
            dataHoraAlteracao: new Date()
        }],
        statusCodigo: "ATIVO",
        statusQuantidade: "",
        tipoMaterial: "P.A",
        categoriaMaterial: "PET VIRGEM",
        categoriaMaterial2: "",
        fornecedor: "THR"

    },
    {
        id: randomUUID,
        codigo: "PETN201012",
        descricao: "FITA DE ARQUEAR PET-2 10 X 0,65 C/2000",
        unidade: "ROL",
        quantidadeEmEstoque: 30000.5,
        quantidadeMaxima: 25000,
        quantidadeSeguranca: 20000,
        quantidadeMinima: 10000,
        cadastro: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioCadastro: "Vitor Hugo",
            dataHoraCadastro: new Date()
        }],
        alteracao: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioAlteracao: "Vitor Hugo",
            dataHoraAlteracao: new Date()
        }],
        statusCodigo: "ATIVO",
        statusQuantidade: "",
        tipoMaterial: "P.A",
        categoriaMaterial: "PET-2",
        categoriaMaterial2: "",
        fornecedor: "THR"

    },
    {
        id: randomUUID,
        codigo: "PETN201013",
        descricao: "FITA DE ARQUEAR PET-2 12 X 0,65 C/2000",
        unidade: "ROL",
        quantidadeEmEstoque: 30000.5,
        quantidadeMaxima: 25000,
        quantidadeSeguranca: 20000,
        quantidadeMinima: 10000,
        cadastro: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioCadastro: "Vitor Hugo",
            dataHoraCadastro: new Date()
        }],
        alteracao: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioAlteracao: "Vitor Hugo",
            dataHoraAlteracao: new Date()
        }],
        statusCodigo: "ATIVO",
        statusQuantidade: "",
        tipoMaterial: "P.A",
        categoriaMaterial: "PET-2",
        categoriaMaterial2: "",
        fornecedor: "THR"

    },
    {
        id: randomUUID,
        codigo: "PETN101002",
        descricao: "FLAKE VERDE",
        unidade: "KG",
        quantidadeEmEstoque: 30000.5,
        quantidadeMaxima: 25000,
        quantidadeSeguranca: 20000,
        quantidadeMinima: 10000,
        cadastro: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioCadastro: "Vitor Hugo",
            dataHoraCadastro: new Date()
        }],
        alteracao: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioAlteracao: "Vitor Hugo",
            dataHoraAlteracao: new Date()
        }],
        statusCodigo: "ATIVO",
        statusQuantidade: "",
        tipoMaterial: "M.P",
        categoriaMaterial: "FLAKE",
        categoriaMaterial2: "",
        fornecedor: "MG"
    },
    {
        id: randomUUID,
        codigo: "PETN101002",
        descricao: "FLAKE AZUL",
        unidade: "KG",
        quantidadeEmEstoque: 30000.5,
        quantidadeMaxima: 25000,
        quantidadeSeguranca: 20000,
        quantidadeMinima: 10000,
        cadastro: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioCadastro: "Vitor Hugo",
            dataHoraCadastro: new Date()
        }],
        alteracao: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioAlteracao: "Vitor Hugo",
            dataHoraAlteracao: new Date()
        }],
        statusCodigo: "ATIVO",
        statusQuantidade: "",
        tipoMaterial: "M.P",
        categoriaMaterial: "FLAKE",
        categoriaMaterial2: "",
        fornecedor: "MG"
    },
    {
        id: randomUUID,
        codigo: "PETN101003",
        descricao: "FLAKE VERDE",
        unidade: "KG",
        quantidadeEmEstoque: 30000.5,
        quantidadeMaxima: 25000,
        quantidadeSeguranca: 20000,
        quantidadeMinima: 10000,
        cadastro: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioCadastro: "Vitor Hugo",
            dataHoraCadastro: new Date()
        }],
        alteracao: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioAlteracao: "Vitor Hugo",
            dataHoraAlteracao: new Date()
        }],
        statusCodigo: "INATIVO",
        statusQuantidade: "",
        tipoMaterial: "M.P",
        categoriaMaterial: "FLAKE",
        categoriaMaterial2: "",
        fornecedor: "MG"
    },
    {
        id: randomUUID,
        codigo: "DCMN101001",
        descricao: "DISCO 415 X 220",
        unidade: "UND",
        quantidadeEmEstoque: 3000,
        quantidadeMaxima: 3000,
        quantidadeSeguranca: 500,
        quantidadeMinima: 10,
        cadastro: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioCadastro: "Vitor Hugo",
            dataHoraCadastro: new Date()
        }],
        alteracao: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioAlteracao: "Vitor Hugo",
            dataHoraAlteracao: new Date()
        }],
        statusCodigo: "ATIVO",
        statusQuantidade: "",
        tipoMaterial: "M.P",
        categoriaMaterial: "INSUMO",
        categoriaMaterial2: "415 X 220",
        fornecedor: "DM TUBOS"
    },
    {
        id: randomUUID,
        codigo: "DCMN101002",
        descricao: "DISCO 575 X 420",
        unidade: "UND",
        quantidadeEmEstoque: 3000,
        quantidadeMaxima: 3000,
        quantidadeSeguranca: 500,
        quantidadeMinima: 10,
        cadastro: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioCadastro: "Vitor Hugo",
            dataHoraCadastro: new Date()
        }],
        alteracao: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioAlteracao: "Vitor Hugo",
            dataHoraAlteracao: new Date()
        }],
        statusCodigo: "ATIVO",
        statusQuantidade: "",
        tipoMaterial: "M.P",
        categoriaMaterial: "INSUMO",
        categoriaMaterial2: "575 X 420",
        fornecedor: "DM TUBOS"
    },
    {
        id: randomUUID,
        codigo: "TUBN101001",
        descricao: "TUBETE 406 X 10 X 152",
        unidade: "UND",
        quantidadeEmEstoque: 3000,
        quantidadeMaxima: 3000,
        quantidadeSeguranca: 500,
        quantidadeMinima: 10,
        cadastro: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioCadastro: "Vitor Hugo",
            dataHoraCadastro: new Date()
        }],
        alteracao: [{
            id: "28a2a944-857f-4527-83ce-847afebae6f7",
            usuarioAlteracao: "Vitor Hugo",
            dataHoraAlteracao: new Date()
        }],
        statusCodigo: "ATIVO",
        statusQuantidade: "",
        tipoMaterial: "M.P",
        categoriaMaterial: "INSUMO",
        categoriaMaterial2: "406 X 10 X 152",
        fornecedor: "DM TUBOS"
    }
]

export default Mock