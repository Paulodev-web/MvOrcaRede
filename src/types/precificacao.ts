export interface DadosPrecificacao {
  orcamentoId: string;
  orcamentoNome: string;
  
  // Custos Diretos
  custoMateriais: number;
  custoMaoDeObra: number; // HH - Homem Hora
  
  // Parâmetros BDI (em percentual)
  despesasFixas: number; // DF
  despesasFinanceiras: number; // FI
  lucro: number; // L
  impostos: number; // I
  
  // Valores calculados
  custoTotal: number;
  bdi: number; // BDI em percentual
  precoVenda: number;
  margemLucro: number;
  
  // Metadata
  dataCalculo: string;
  observacoes?: string;
}

export interface ItemPrecificado {
  id: string;
  descricao: string;
  quantidade: number;
  unidade: string;
  custoUnitario: number;
  custoTotal: number;
  precoUnitarioVenda: number;
  precoTotalVenda: number;
}

export interface MaoDeObra {
  descricao: string;
  quantidadeHoras: number;
  valorHora: number;
  custoTotal: number;
}

export interface MemoriaCalculo {
  // Resumo
  resumo: {
    custoMateriais: number;
    custoMaoObra: number;
    custoTotal: number;
    bdi: number;
    precoVenda: number;
    lucroEstimado: number;
  };
  
  // Detalhamento
  materiais: ItemPrecificado[];
  maoDeObra: MaoDeObra[];
  
  // Composição BDI
  composicaoBDI: {
    despesasFixas: { percentual: number; valor: number };
    despesasFinanceiras: { percentual: number; valor: number };
    lucro: { percentual: number; valor: number };
    impostos: { percentual: number; valor: number };
  };
  
  // Informações adicionais
  dataEmissao: string;
  validadeOrcamento: string;
  observacoes?: string;
}

// Valores padrão sugeridos baseados em práticas do mercado
export const VALORES_PADRAO_BDI = {
  despesasFixas: 5.0, // 5%
  despesasFinanceiras: 1.5, // 1.5%
  lucro: 8.0, // 8%
  impostos: 13.45, // 13.45% (ISS 5% + impostos federais)
};
