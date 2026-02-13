export interface Fornecedor {
  id: string;
  nome: string;
  cnpj?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  observacoes?: string;
  ativo: boolean;
  createdAt: string;
}

export interface ItemFornecedor {
  id: string;
  fornecedorId: string;
  fornecedorNome: string;
  codigoItem: string;
  descricao: string;
  unidade: string;
  precoUnitario: number;
  quantidadeMinima?: number;
  prazoEntrega?: number; // dias
  dataAtualizacao: string;
  observacoes?: string;
}

export interface MapeamentoColunas {
  colunaCodigo?: number;
  colunaDescricao?: number;
  colunaUnidade?: number;
  colunaPreco?: number;
  colunaQuantidade?: number;
}

export interface ConversaoUnidade {
  unidadeOrigem: string;
  unidadeDestino: string;
  fatorConversao: number; // Ex: 1 rolo = 100 metros
}

export interface ComparacaoItem {
  codigoPrincipal: string;
  descricao: string;
  unidadePadrao: string;
  quantidadeNecessaria: number;
  opcoesFornecedores: {
    fornecedorId: string;
    fornecedorNome: string;
    precoUnitario: number;
    precoTotal: number;
    unidadeOriginal: string;
    disponibilidade: boolean;
    prazoEntrega?: number;
  }[];
  melhorPreco: number;
  fornecedorMaisBarato: string;
  diferencaPercentual: number;
}

export interface CenarioCompra {
  tipo: 'economico' | 'consolidado';
  nome: string;
  descricao: string;
  fornecedoresSelecionados: string[];
  itens: {
    itemId: string;
    fornecedorId: string;
    fornecedorNome: string;
    quantidade: number;
    precoUnitario: number;
    precoTotal: number;
  }[];
  subtotal: number;
  estimativaFrete: number;
  total: number;
  economia?: number;
  numeroFornecedores: number;
}

export interface HistoricoPreco {
  itemId: string;
  descricao: string;
  historico: {
    data: string;
    preco: number;
    fornecedorId: string;
    fornecedorNome: string;
  }[];
}

// Unidades comuns no mercado elétrico
export const UNIDADES_PADRAO = [
  'UN',
  'M',
  'M2',
  'M3',
  'KG',
  'CX',
  'PC',
  'RL', // Rolo
  'BR', // Barra
  'TB', // Tubo
  'SC', // Saco
  'LT', // Litro
];

// Conversões comuns
export const CONVERSOES_PADRAO: ConversaoUnidade[] = [
  { unidadeOrigem: 'RL', unidadeDestino: 'M', fatorConversao: 100 },
  { unidadeOrigem: 'CX', unidadeDestino: 'UN', fatorConversao: 50 },
  { unidadeOrigem: 'SC', unidadeDestino: 'KG', fatorConversao: 25 },
  { unidadeOrigem: 'BR', unidadeDestino: 'M', fatorConversao: 6 },
];
