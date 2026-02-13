import { DadosPrecificacao, MemoriaCalculo, ItemPrecificado, MaoDeObra } from '../types/precificacao';

/**
 * Calcula o BDI (Benefícios e Despesas Indiretas)
 * Fórmula: BDI = [(1 + DF + FI + L) / (1 - I)] - 1
 * ou simplificado: PV = CD / (1 - (DF + FI + L + I))
 */
export function calcularBDI(
  custoTotal: number,
  despesasFixas: number,
  despesasFinanceiras: number,
  lucro: number,
  impostos: number
): { bdi: number; precoVenda: number } {
  // Converter percentuais para decimais
  const DF = despesasFixas / 100;
  const FI = despesasFinanceiras / 100;
  const L = lucro / 100;
  const I = impostos / 100;

  const denominador = 1 - (DF + FI + L + I);

  if (denominador <= 0) {
    return { bdi: 0, precoVenda: custoTotal };
  }

  const precoVenda = custoTotal / denominador;
  const bdiPercentual = ((precoVenda - custoTotal) / custoTotal) * 100;

  return {
    bdi: bdiPercentual,
    precoVenda: precoVenda,
  };
}

/**
 * Gera memória de cálculo detalhada
 */
export function gerarMemoriaCalculo(dados: DadosPrecificacao): MemoriaCalculo {
  const valorDespesasFixas = dados.precoVenda * (dados.despesasFixas / 100);
  const valorDespesasFinanceiras = dados.precoVenda * (dados.despesasFinanceiras / 100);
  const valorLucro = dados.precoVenda * (dados.lucro / 100);
  const valorImpostos = dados.precoVenda * (dados.impostos / 100);

  return {
    resumo: {
      custoMateriais: dados.custoMateriais,
      custoMaoObra: dados.custoMaoDeObra,
      custoTotal: dados.custoTotal,
      bdi: dados.bdi,
      precoVenda: dados.precoVenda,
      lucroEstimado: valorLucro,
    },
    materiais: [], // Será preenchido com os itens do orçamento
    maoDeObra: [], // Será preenchido com as horas de mão de obra
    composicaoBDI: {
      despesasFixas: {
        percentual: dados.despesasFixas,
        valor: valorDespesasFixas,
      },
      despesasFinanceiras: {
        percentual: dados.despesasFinanceiras,
        valor: valorDespesasFinanceiras,
      },
      lucro: {
        percentual: dados.lucro,
        valor: valorLucro,
      },
      impostos: {
        percentual: dados.impostos,
        valor: valorImpostos,
      },
    },
    dataEmissao: new Date().toISOString(),
    validadeOrcamento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 dias
    observacoes: dados.observacoes,
  };
}

/**
 * Formata valor monetário para exibição
 */
export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Formata percentual para exibição
 */
export function formatarPercentual(valor: number): string {
  return `${valor.toFixed(2)}%`;
}

/**
 * Calcula o impacto de mudança de margem no lucro
 */
export function simularMudancaMargem(
  custoTotal: number,
  margemAtual: number,
  novaMargem: number,
  despesasFixas: number,
  despesasFinanceiras: number,
  impostos: number
): {
  precoVendaAtual: number;
  precoVendaNovo: number;
  lucroAtual: number;
  lucroNovo: number;
  diferenca: number;
} {
  const resultadoAtual = calcularBDI(custoTotal, despesasFixas, despesasFinanceiras, margemAtual, impostos);
  const resultadoNovo = calcularBDI(custoTotal, despesasFixas, despesasFinanceiras, novaMargem, impostos);

  const lucroAtual = resultadoAtual.precoVenda * (margemAtual / 100);
  const lucroNovo = resultadoNovo.precoVenda * (novaMargem / 100);

  return {
    precoVendaAtual: resultadoAtual.precoVenda,
    precoVendaNovo: resultadoNovo.precoVenda,
    lucroAtual,
    lucroNovo,
    diferenca: lucroNovo - lucroAtual,
  };
}

/**
 * Valida os parâmetros de precificação
 */
export function validarParametros(
  despesasFixas: number,
  despesasFinanceiras: number,
  lucro: number,
  impostos: number
): { valido: boolean; erro?: string } {
  const soma = despesasFixas + despesasFinanceiras + lucro + impostos;

  if (soma >= 100) {
    return {
      valido: false,
      erro: 'A soma dos percentuais (DF + FI + L + I) deve ser menor que 100%',
    };
  }

  if (despesasFixas < 0 || despesasFinanceiras < 0 || lucro < 0 || impostos < 0) {
    return {
      valido: false,
      erro: 'Todos os percentuais devem ser positivos',
    };
  }

  return { valido: true };
}

/**
 * Exporta dados para PDF (placeholder - implementar com biblioteca de PDF)
 */
export async function exportarPDFDetalhado(memoria: MemoriaCalculo): Promise<Blob> {
  // TODO: Implementar com jsPDF ou similar
  throw new Error('Exportação de PDF não implementada ainda');
}

/**
 * Exporta versão simplificada para cliente (placeholder)
 */
export async function exportarPDFSimplificado(memoria: MemoriaCalculo): Promise<Blob> {
  // TODO: Implementar versão simplificada
  throw new Error('Exportação de PDF simplificado não implementada ainda');
}
