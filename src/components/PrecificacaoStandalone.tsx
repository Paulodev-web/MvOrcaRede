import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  FileText, 
  Download,
  Info,
  Percent,
  PieChart,
  Plus,
  Trash2,
  FolderOpen,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import { VALORES_PADRAO_BDI } from '../types/precificacao';
import { useApp } from '../contexts/AppContext';
import { Breadcrumbs } from './Breadcrumbs';

interface ItemPrecificacao {
  id: string;
  descricao: string;
  quantidade: number;
  unidade: string;
  valorUnitario: number;
  valorTotal: number;
}

export function PrecificacaoStandalone() {
  const navigate = useNavigate();
  const { budgets, materiais, fetchBudgets } = useApp();
  
  // Orçamento selecionado
  const [orcamentoSelecionado, setOrcamentoSelecionado] = useState<string>('');
  const [carregandoOrcamento, setCarregandoOrcamento] = useState(false);
  
  // Itens de custo
  const [itens, setItens] = useState<ItemPrecificacao[]>([]);
  const [novoItem, setNovoItem] = useState({
    descricao: '',
    quantidade: 0,
    unidade: 'UN',
    valorUnitario: 0,
  });

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

  // Buscar orçamentos ao montar
  useEffect(() => {
    if (budgets.length === 0) {
      fetchBudgets();
    }
  }, [budgets.length, fetchBudgets]);

  // Calcular custo total dos materiais
  useEffect(() => {
    const total = itens.reduce((acc, item) => acc + item.valorTotal, 0);
    setCustoMateriais(total);
  }, [itens]);

  // Carregar materiais do orçamento selecionado
  const carregarOrcamento = () => {
    if (!orcamentoSelecionado) {
      alert('Selecione um orçamento primeiro');
      return;
    }

    setCarregandoOrcamento(true);
    const orcamento = budgets.find(b => b.id === orcamentoSelecionado);
    
    if (!orcamento) {
      alert('Orçamento não encontrado');
      setCarregandoOrcamento(false);
      return;
    }

    // Mapear materiais dos postes para itens
    const novosItens: ItemPrecificacao[] = [];
    
    orcamento.postes.forEach(poste => {
      // Adicionar tipo de poste
      if (poste.tipoPosteId) {
        const tipoPoste = materiais.find(m => m.id === poste.tipoPosteId);
        if (tipoPoste) {
          novosItens.push({
            id: `poste-${poste.id}`,
            descricao: `Poste - ${tipoPoste.descricao}`,
            quantidade: 1,
            unidade: 'UN',
            valorUnitario: tipoPoste.precoUnit,
            valorTotal: tipoPoste.precoUnit,
          });
        }
      }

      // Adicionar materiais do poste
      poste.materiais?.forEach(mat => {
        const material = materiais.find(m => m.id === mat.materialId);
        if (material) {
          // Verificar se já existe esse material na lista
          const itemExistente = novosItens.find(i => i.descricao === material.descricao);
          if (itemExistente) {
            // Somar quantidade
            itemExistente.quantidade += mat.quantidade;
            itemExistente.valorTotal = itemExistente.quantidade * itemExistente.valorUnitario;
          } else {
            novosItens.push({
              id: `mat-${mat.materialId}-${Date.now()}`,
              descricao: material.descricao,
              quantidade: mat.quantidade,
              unidade: material.unidade,
              valorUnitario: material.precoUnit,
              valorTotal: mat.quantidade * material.precoUnit,
            });
          }
        }
      });
    });

    setItens(novosItens);
    setCarregandoOrcamento(false);
    
    if (novosItens.length > 0) {
      alert(`${novosItens.length} itens carregados do orçamento "${orcamento.nome}"`);
    } else {
      alert('Nenhum material encontrado neste orçamento');
    }
  };

  // Calcular custo de mão de obra
  useEffect(() => {
    const custo = horasHomem * valorHoraHomem;
    setCustoMaoDeObra(custo);
  }, [horasHomem, valorHoraHomem]);

  // Calcular totais e BDI
  useEffect(() => {
    const CD = custoMateriais + custoMaoDeObra;
    setCustoTotal(CD);

    const DF = despesasFixas / 100;
    const FI = despesasFinanceiras / 100;
    const L = lucro / 100;
    const I = impostos / 100;

    const denominador = 1 - (DF + FI + L + I);
    
    if (denominador > 0 && CD > 0) {
      const PV = CD / denominador;
      setPrecoVenda(PV);
      
      const bdiPercentual = ((PV - CD) / CD) * 100;
      setBdi(isFinite(bdiPercentual) ? bdiPercentual : 0);
      
      const lucroReais = PV * L;
      setLucroEstimado(lucroReais);
    } else {
      setPrecoVenda(0);
      setBdi(0);
      setLucroEstimado(0);
    }
  }, [custoMateriais, custoMaoDeObra, despesasFixas, despesasFinanceiras, lucro, impostos]);

  const adicionarItem = () => {
    if (!novoItem.descricao || novoItem.quantidade <= 0 || novoItem.valorUnitario <= 0) {
      alert('Preencha todos os campos do item corretamente');
      return;
    }

    const item: ItemPrecificacao = {
      id: Date.now().toString(),
      descricao: novoItem.descricao,
      quantidade: novoItem.quantidade,
      unidade: novoItem.unidade,
      valorUnitario: novoItem.valorUnitario,
      valorTotal: novoItem.quantidade * novoItem.valorUnitario,
    };

    setItens([...itens, item]);
    setNovoItem({ descricao: '', quantidade: 0, unidade: 'UN', valorUnitario: 0 });
  };

  const removerItem = (id: string) => {
    setItens(itens.filter(item => item.id !== id));
  };

  const exportarPDFDetalhado = () => {
    alert('Exportação de PDF detalhado será implementada');
  };

  const exportarPDFSimplificado = () => {
    alert('Exportação de PDF simplificado será implementada');
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin')}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              title="Voltar ao Painel Admin"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-2xl shadow-lg">
                  💰
                </div>
                Módulo de Precificação
              </h1>
              <p className="text-gray-600 mt-2">
                Inteligência de custos com cálculo automático de BDI
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={exportarPDFSimplificado}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 shadow-sm"
            >
              <Download className="h-4 w-4" />
              PDF Cliente
            </button>
            <button
              onClick={exportarPDFDetalhado}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-lg hover:from-emerald-700 hover:to-green-800 flex items-center gap-2 shadow-sm"
            >
              <FileText className="h-4 w-4" />
              PDF Detalhado
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Esquerda - Inputs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Importar Orçamento */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FolderOpen className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Importar de Orçamento Existente
                  </h2>
                  <p className="text-sm text-gray-600">
                    Selecione um orçamento do OrçaRede para carregar materiais automaticamente
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <select
                  value={orcamentoSelecionado}
                  onChange={(e) => setOrcamentoSelecionado(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  disabled={carregandoOrcamento}
                >
                  <option value="">-- Selecione um orçamento --</option>
                  {budgets.map(budget => (
                    <option key={budget.id} value={budget.id}>
                      {budget.nome} ({budget.status})
                    </option>
                  ))}
                </select>
                <button
                  onClick={carregarOrcamento}
                  disabled={!orcamentoSelecionado || carregandoOrcamento}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-sm"
                >
                  {carregandoOrcamento ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Carregando...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Importar
                    </>
                  )}
                </button>
              </div>

              {budgets.length === 0 && (
                <p className="text-sm text-amber-700 mt-3 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Nenhum orçamento disponível. Crie um no OrçaRede primeiro.
                </p>
              )}
            </div>

            {/* Lista de Materiais */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Lista de Materiais/Serviços
              </h2>

              {/* Adicionar Item */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-12 gap-3">
                  <input
                    type="text"
                    placeholder="Descrição"
                    value={novoItem.descricao}
                    onChange={(e) => setNovoItem({ ...novoItem, descricao: e.target.value })}
                    className="col-span-4 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Qtd"
                    value={novoItem.quantidade || ''}
                    onChange={(e) => setNovoItem({ ...novoItem, quantidade: Number(e.target.value) })}
                    className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                  />
                  <select
                    value={novoItem.unidade}
                    onChange={(e) => setNovoItem({ ...novoItem, unidade: e.target.value })}
                    className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                  >
                    <option value="UN">UN</option>
                    <option value="M">M</option>
                    <option value="M2">M²</option>
                    <option value="M3">M³</option>
                    <option value="KG">KG</option>
                    <option value="H">H</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Valor Unit."
                    value={novoItem.valorUnitario || ''}
                    onChange={(e) => setNovoItem({ ...novoItem, valorUnitario: Number(e.target.value) })}
                    className="col-span-3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                  />
                  <button
                    onClick={adicionarItem}
                    className="col-span-1 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Lista de Itens */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {itens.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Nenhum item adicionado. Adicione materiais ou serviços acima.
                  </p>
                ) : (
                  itens.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.descricao}</p>
                        <p className="text-sm text-gray-600">
                          {item.quantidade} {item.unidade} × R$ {item.valorUnitario.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900">
                          R$ {item.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <button
                          onClick={() => removerItem(item.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {itens.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">Total de Materiais:</span>
                    <span className="text-xl font-bold text-emerald-600">
                      R$ {custoMateriais.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Mão de Obra */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Mão de Obra (Homem-Hora)
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horas Estimadas
                  </label>
                  <input
                    type="number"
                    value={horasHomem}
                    onChange={(e) => setHorasHomem(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor por Hora (R$)
                  </label>
                  <input
                    type="number"
                    value={valorHoraHomem}
                    onChange={(e) => setValorHoraHomem(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                <p className="text-sm text-emerald-900">
                  <span className="font-medium">Custo Total MO:</span>{' '}
                  R$ {custoMaoDeObra.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
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
                  className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Restaurar Padrões
                </button>
              </div>

              <div className="space-y-6">
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
                  <p className="text-xs text-gray-500 mt-1">Despesas administrativas</p>
                </div>

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
                  <p className="text-xs text-gray-500 mt-1">Juros e taxas</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Margem de Lucro (L)
                    </label>
                    <span className="text-sm font-bold text-emerald-600">
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
                    className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">Margem de lucro desejada</p>
                </div>

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
                  <p className="text-xs text-gray-500 mt-1">ISS, PIS, COFINS, etc.</p>
                </div>
              </div>

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
            <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl shadow-lg p-6 text-white">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Resumo Financeiro
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-emerald-100 mb-1">Custo Total (CD)</p>
                  <p className="text-2xl font-bold">
                    R$ {custoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="border-t border-white/20 pt-3">
                  <p className="text-sm text-emerald-100 mb-1">BDI Aplicado</p>
                  <p className="text-xl font-bold">
                    {bdi.toFixed(2)}%
                  </p>
                </div>

                <div className="border-t border-white/20 pt-3">
                  <p className="text-sm text-emerald-100 mb-1">Preço de Venda (PV)</p>
                  <p className="text-3xl font-bold">
                    R$ {precoVenda.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="border-t border-white/20 pt-3">
                  <p className="text-sm text-emerald-100 mb-1">Lucro Estimado</p>
                  <p className="text-xl font-bold text-green-200">
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
                  <span className="text-sm font-medium text-emerald-600">
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
                    Adicione itens na lista acima e ajuste os sliders para ver o impacto no preço final em tempo real!
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
