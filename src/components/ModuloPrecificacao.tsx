import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  FileText, 
  Download,
  ArrowLeft,
  Info,
  Percent,
  PieChart,
  Home
} from 'lucide-react';
import { DadosPrecificacao, VALORES_PADRAO_BDI, MemoriaCalculo } from '../types/precificacao';
import { OrcaRedeBreadcrumbs } from './OrcaRedeBreadcrumbs';

export function ModuloPrecificacao() {
  const navigate = useNavigate();
  const { currentOrcamento, setCurrentView, materiais } = useApp();
  
  const [custoMateriais, setCustoMateriais] = useState(0);
  const [custoMaoDeObra, setCustoMaoDeObra] = useState(0);
  const [horasHomem, setHorasHomem] = useState(0);
  const [valorHoraHomem, setValorHoraHomem] = useState(100);
  
  // Parâmetros BDI
  const [despesasFixas, setDespesasFixas] = useState(VALORES_PADRAO_BDI.despesasFixas);
  const [despesasFinanceiras, setDespesasFinanceiras] = useState(VALORES_PADRAO_BDI.despesasFinanceiras);
  const [lucro, setLucro] = useState(VALORES_PADRAO_BDI.lucro);
  const [impostos, setImpostos] = useState(VALORES_PADRAO_BDI.impostos);
  
  // Resultados
  const [custoTotal, setCustoTotal] = useState(0);
  const [bdi, setBdi] = useState(0);
  const [precoVenda, setPrecoVenda] = useState(0);
  const [lucroEstimado, setLucroEstimado] = useState(0);

  // Calcular custo dos materiais do orçamento
  useEffect(() => {
    if (currentOrcamento && materiais.length > 0) {
      const custoTotal = currentOrcamento.postes.reduce((total, poste) => {
        // Calcular custo de materiais deste poste
        // Aqui seria necessário mapear os materiais do poste com a lista de materiais
        // Por enquanto, vamos usar um valor placeholder
        return total;
      }, 0);
      setCustoMateriais(custoTotal);
    }
  }, [currentOrcamento, materiais]);

  // Calcular custo de mão de obra
  useEffect(() => {
    const custo = horasHomem * valorHoraHomem;
    setCustoMaoDeObra(custo);
  }, [horasHomem, valorHoraHomem]);

  // Calcular totais e BDI
  useEffect(() => {
    const CD = custoMateriais + custoMaoDeObra; // Custo Direto
    setCustoTotal(CD);

    // Fórmula BDI: PV = CD / (1 - (DF + FI + L + I))
    // Converter percentuais para decimais
    const DF = despesasFixas / 100;
    const FI = despesasFinanceiras / 100;
    const L = lucro / 100;
    const I = impostos / 100;

    const denominador = 1 - (DF + FI + L + I);
    
    if (denominador > 0) {
      const PV = CD / denominador;
      setPrecoVenda(PV);
      
      // BDI em percentual
      const bdiPercentual = ((PV - CD) / CD) * 100;
      setBdi(isFinite(bdiPercentual) ? bdiPercentual : 0);
      
      // Lucro estimado em reais
      const lucroReais = PV * L;
      setLucroEstimado(lucroReais);
    } else {
      setPrecoVenda(0);
      setBdi(0);
      setLucroEstimado(0);
    }
  }, [custoMateriais, custoMaoDeObra, despesasFixas, despesasFinanceiras, lucro, impostos]);

  const handleVoltar = () => {
    setCurrentView('dashboard');
  };

  const exportarPDFDetalhado = () => {
    // TODO: Implementar exportação detalhada
    alert('Exportação de PDF detalhado será implementada');
  };

  const exportarPDFSimplificado = () => {
    // TODO: Implementar exportação simplificada
    alert('Exportação de PDF simplificado será implementada');
  };

  if (!currentOrcamento) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Calculator className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Nenhum Orçamento Selecionado
          </h2>
          <p className="text-gray-600 mb-4">
            Selecione um orçamento para calcular a precificação
          </p>
          <button
            onClick={handleVoltar}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-7xl mx-auto py-6 space-y-6">
        {/* Breadcrumbs e Navegação */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate('/admin')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
            title="Voltar ao Painel Admin"
          >
            <Home className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
          </button>
          <OrcaRedeBreadcrumbs />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleVoltar}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Voltar ao Dashboard"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Calculator className="h-6 w-6 text-blue-600" />
                Módulo de Precificação
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Orçamento: <span className="font-medium">{currentOrcamento.nome}</span>
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={exportarPDFSimplificado}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              PDF Cliente
            </button>
            <button
              onClick={exportarPDFDetalhado}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              PDF Detalhado
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Esquerda - Inputs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Custos Diretos */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Custos Diretos
              </h2>

              <div className="space-y-4">
                {/* Custo de Materiais */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custo de Materiais
                  </label>
                  <input
                    type="number"
                    value={custoMateriais}
                    onChange={(e) => setCustoMateriais(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Soma de todos os materiais do orçamento
                  </p>
                </div>

                {/* Mão de Obra */}
                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mão de Obra (Homem-Hora)
                  </label>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Horas Estimadas
                      </label>
                      <input
                        type="number"
                        value={horasHomem}
                        onChange={(e) => setHorasHomem(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Valor por Hora (R$)
                      </label>
                      <input
                        type="number"
                        value={valorHoraHomem}
                        onChange={(e) => setValorHoraHomem(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <span className="font-medium">Custo Total MO:</span>{' '}
                      R$ {custoMaoDeObra.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Parâmetros BDI */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Percent className="h-5 w-5 text-purple-600" />
                  Parâmetros BDI
                </h2>
                <button
                  onClick={() => {
                    setDespesasFixas(VALORES_PADRAO_BDI.despesasFixas);
                    setDespesasFinanceiras(VALORES_PADRAO_BDI.despesasFinanceiras);
                    setLucro(VALORES_PADRAO_BDI.lucro);
                    setImpostos(VALORES_PADRAO_BDI.impostos);
                  }}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Restaurar Padrões
                </button>
              </div>

              <div className="space-y-6">
                {/* Despesas Fixas */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Despesas Fixas (DF)
                    </label>
                    <span className="text-sm font-bold text-gray-900">
                      {despesasFixas.toFixed(2)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.5"
                    value={despesasFixas}
                    onChange={(e) => setDespesasFixas(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Despesas administrativas, aluguel, etc.
                  </p>
                </div>

                {/* Despesas Financeiras */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Despesas Financeiras (FI)
                    </label>
                    <span className="text-sm font-bold text-gray-900">
                      {despesasFinanceiras.toFixed(2)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={despesasFinanceiras}
                    onChange={(e) => setDespesasFinanceiras(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Juros, taxas bancárias, etc.
                  </p>
                </div>

                {/* Lucro */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Margem de Lucro (L)
                    </label>
                    <span className="text-sm font-bold text-green-600">
                      {lucro.toFixed(2)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="0.5"
                    value={lucro}
                    onChange={(e) => setLucro(Number(e.target.value))}
                    className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Margem de lucro desejada
                  </p>
                </div>

                {/* Impostos */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Impostos (I)
                    </label>
                    <span className="text-sm font-bold text-gray-900">
                      {impostos.toFixed(2)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="0.5"
                    value={impostos}
                    onChange={(e) => setImpostos(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    ISS, PIS, COFINS, etc.
                  </p>
                </div>
              </div>

              {/* Info BDI */}
              <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex gap-2">
                  <Info className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-purple-900">
                    <p className="font-medium mb-1">Fórmula do BDI:</p>
                    <p className="font-mono">PV = CD / (1 - (DF + FI + L + I))</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita - Resultados */}
          <div className="space-y-6">
            {/* Resumo Financeiro */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Resumo Financeiro
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-blue-100 mb-1">Custo Total (CD)</p>
                  <p className="text-2xl font-bold">
                    R$ {custoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="border-t border-white/20 pt-3">
                  <p className="text-sm text-blue-100 mb-1">BDI Aplicado</p>
                  <p className="text-xl font-bold">
                    {bdi.toFixed(2)}%
                  </p>
                </div>

                <div className="border-t border-white/20 pt-3">
                  <p className="text-sm text-blue-100 mb-1">Preço de Venda (PV)</p>
                  <p className="text-3xl font-bold">
                    R$ {precoVenda.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="border-t border-white/20 pt-3">
                  <p className="text-sm text-blue-100 mb-1">Lucro Estimado</p>
                  <p className="text-xl font-bold text-green-300">
                    R$ {lucroEstimado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>

            {/* Composição do Preço */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-blue-600" />
                Composição do Preço
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Materiais</span>
                  <span className="text-sm font-medium text-gray-900">
                    R$ {custoMateriais.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Mão de Obra</span>
                  <span className="text-sm font-medium text-gray-900">
                    R$ {custoMaoDeObra.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="border-t pt-2 flex items-center justify-between">
                  <span className="text-sm text-gray-600">Despesas Fixas ({despesasFixas.toFixed(1)}%)</span>
                  <span className="text-sm font-medium text-gray-900">
                    R$ {(precoVenda * (despesasFixas / 100)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Desp. Financeiras ({despesasFinanceiras.toFixed(1)}%)</span>
                  <span className="text-sm font-medium text-gray-900">
                    R$ {(precoVenda * (despesasFinanceiras / 100)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Impostos ({impostos.toFixed(1)}%)</span>
                  <span className="text-sm font-medium text-gray-900">
                    R$ {(precoVenda * (impostos / 100)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Lucro ({lucro.toFixed(1)}%)</span>
                  <span className="text-sm font-medium text-green-600">
                    R$ {lucroEstimado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Dica */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex gap-2">
                <Info className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-yellow-900">
                  <p className="font-medium mb-1">💡 Dica</p>
                  <p>
                    Use os sliders para simular diferentes cenários e encontrar a margem ideal para seu projeto.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
