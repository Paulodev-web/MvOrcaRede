import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  FileSpreadsheet,
  ArrowLeft,
  Plus,
  Trash2,
  TrendingDown,
  TrendingUp,
  ShoppingCart,
  BarChart3,
  Download,
  Package,
  Truck,
  Info,
  Search,
  Filter,
  ChevronDown,
  Home
} from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';

export function ModuloSourcing() {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState<'importar' | 'comparar' | 'cenarios' | 'historico'>('importar');
  const [fornecedores, setFornecedores] = useState<any[]>([]);

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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-700 flex items-center justify-center text-2xl shadow-lg">
                  🔍
                </div>
                Comparação de Fornecedores
              </h1>
              <p className="text-gray-600 mt-2">
                Sourcing estratégico e análise de preços
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-1 p-2">
              <button
                onClick={() => setAbaAtiva('importar')}
                className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
                  abaAtiva === 'importar'
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Upload className="h-4 w-4 inline mr-2" />
                Importar Planilhas
              </button>
              <button
                onClick={() => setAbaAtiva('comparar')}
                className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
                  abaAtiva === 'comparar'
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="h-4 w-4 inline mr-2" />
                Comparar Preços
              </button>
              <button
                onClick={() => setAbaAtiva('cenarios')}
                className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
                  abaAtiva === 'cenarios'
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ShoppingCart className="h-4 w-4 inline mr-2" />
                Cenários de Compra
              </button>
              <button
                onClick={() => setAbaAtiva('historico')}
                className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
                  abaAtiva === 'historico'
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <TrendingUp className="h-4 w-4 inline mr-2" />
                Histórico de Preços
              </button>
            </nav>
          </div>

          <div className="p-6">
            {abaAtiva === 'importar' && <AbaImportar />}
            {abaAtiva === 'comparar' && <AbaComparar />}
            {abaAtiva === 'cenarios' && <AbaCenarios />}
            {abaAtiva === 'historico' && <AbaHistorico />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Aba Importar Planilhas
function AbaImportar() {
  const [arquivoSelecionado, setArquivoSelecionado] = useState<File | null>(null);
  const [etapaImportacao, setEtapaImportacao] = useState<'selecionar' | 'mapear' | 'confirmar'>('selecionar');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArquivoSelecionado(e.target.files[0]);
      setEtapaImportacao('mapear');
    }
  };

  if (etapaImportacao === 'selecionar') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Importe Planilhas de Fornecedores
          </h2>
          <p className="text-gray-600">
            Faça upload de arquivos CSV ou Excel de diferentes fornecedores
          </p>
        </div>

        {/* Área de Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 hover:border-orange-500 transition-colors cursor-pointer">
          <label className="flex flex-col items-center cursor-pointer">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Upload className="h-10 w-10 text-orange-600" />
            </div>
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Clique para fazer upload ou arraste o arquivo
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Formatos aceitos: CSV, XLSX, XLS (máximo 10MB)
            </p>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
              Selecionar Arquivo
            </button>
          </label>
        </div>

        {/* Instruções */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-2">💡 Dicas para importação:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>A planilha deve conter colunas com: código, descrição, unidade e preço</li>
                <li>Cada fornecedor pode ter formato diferente - vamos mapear na próxima etapa</li>
                <li>Você pode importar quantos fornecedores quiser para comparação</li>
                <li>Os dados serão salvos e você poderá atualizar depois</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Fornecedores Já Importados */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Fornecedores Cadastrados
          </h3>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Fornecedor A</p>
                <p className="text-sm text-gray-600">150 itens • Atualizado há 2 dias</p>
              </div>
              <button className="text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Fornecedor B</p>
                <p className="text-sm text-gray-600">230 itens • Atualizado há 5 dias</p>
              </div>
              <button className="text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (etapaImportacao === 'mapear') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Mapeamento de Colunas
          </h2>
          <p className="text-gray-600">
            Arquivo: <span className="font-medium">{arquivoSelecionado?.name}</span>
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-900">
            <strong>Arraste e solte</strong> as colunas do arquivo para os campos correspondentes abaixo
          </p>
        </div>

        {/* Preview da Planilha */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 overflow-x-auto">
          <p className="text-sm font-medium text-gray-700 mb-3">Preview dos dados:</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-3 py-2 text-left bg-gray-50">COD</th>
                <th className="px-3 py-2 text-left bg-gray-50">DESC_PRODUTO</th>
                <th className="px-3 py-2 text-left bg-gray-50">UND</th>
                <th className="px-3 py-2 text-left bg-gray-50">VALOR</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-3 py-2">CAB001</td>
                <td className="px-3 py-2">Cabo 10mm</td>
                <td className="px-3 py-2">RL</td>
                <td className="px-3 py-2">R$ 450,00</td>
              </tr>
              <tr className="border-b">
                <td className="px-3 py-2">TRF002</td>
                <td className="px-3 py-2">Transformador 150KVA</td>
                <td className="px-3 py-2">UN</td>
                <td className="px-3 py-2">R$ 12.500,00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mapeamento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código do Item
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>Selecione a coluna...</option>
              <option>COD</option>
              <option>DESC_PRODUTO</option>
              <option>UND</option>
              <option>VALOR</option>
            </select>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>Selecione a coluna...</option>
              <option>COD</option>
              <option>DESC_PRODUTO</option>
              <option>UND</option>
              <option>VALOR</option>
            </select>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unidade
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>Selecione a coluna...</option>
              <option>COD</option>
              <option>DESC_PRODUTO</option>
              <option>UND</option>
              <option>VALOR</option>
            </select>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preço
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>Selecione a coluna...</option>
              <option>COD</option>
              <option>DESC_PRODUTO</option>
              <option>UND</option>
              <option>VALOR</option>
            </select>
          </div>
        </div>

        {/* Nome do Fornecedor */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Fornecedor
          </label>
          <input
            type="text"
            placeholder="Ex: Distribuidora ABC Ltda"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Botões */}
        <div className="flex justify-between">
          <button
            onClick={() => setEtapaImportacao('selecionar')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Voltar
          </button>
          <button
            onClick={() => setEtapaImportacao('confirmar')}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Importar Dados
          </button>
        </div>
      </div>
    );
  }

  return null;
}

// Aba Comparar Preços
function AbaComparar() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Comparação de Preços
          </h2>
          <p className="text-gray-600">
            Compare preços entre diferentes fornecedores
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </button>
        </div>
      </div>

      {/* Busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por código ou descrição..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Tabela de Comparação */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Item
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Fornecedor A
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Fornecedor B
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Fornecedor C
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Melhor
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">Cabo 10mm</p>
                  <p className="text-sm text-gray-500">100M</p>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium">R$ 450,00</p>
                  <p className="text-sm text-gray-500">RL/100M</p>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium">R$ 4,80</p>
                  <p className="text-sm text-gray-500">M</p>
                  <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded mt-1">
                    -5%
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400">
                  Indisponível
                </td>
                <td className="px-4 py-3">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-lg font-medium">
                    Fornecedor B
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">Transformador 150KVA</p>
                  <p className="text-sm text-gray-500">1 UN</p>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium">R$ 12.500,00</p>
                  <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded mt-1">
                    Melhor
                  </span>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium">R$ 13.200,00</p>
                  <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-700 rounded mt-1">
                    +5.6%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium">R$ 12.800,00</p>
                  <span className="inline-block px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded mt-1">
                    +2.4%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-lg font-medium">
                    Fornecedor A
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Aba Cenários de Compra
function AbaCenarios() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Cenários de Compra
        </h2>
        <p className="text-gray-600">
          Compare diferentes estratégias de sourcing
        </p>
      </div>

      {/* Cenários */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cenário Econômico */}
        <div className="bg-white border-2 border-green-200 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                💰 Cenário Econômico
              </h3>
              <p className="text-sm text-gray-600">
                Cada item no fornecedor mais barato
              </p>
            </div>
            <TrendingDown className="h-6 w-6 text-green-600" />
          </div>

          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-700 mb-1">Total Estimado</p>
              <p className="text-3xl font-bold text-green-700">R$ 45.230,00</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal Materiais:</span>
                <span className="font-medium">R$ 42.500,00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estimativa Frete:</span>
                <span className="font-medium">R$ 2.730,00</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2">
                <span className="text-gray-900 font-medium">Fornecedores:</span>
                <span className="font-medium">5 diferentes</span>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-yellow-800">
                ⚠️ Múltiplos fornecedores podem gerar mais custos de frete e logística
              </p>
            </div>
          </div>
        </div>

        {/* Cenário Consolidado */}
        <div className="bg-white border-2 border-blue-200 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                📦 Cenário Consolidado
              </h3>
              <p className="text-sm text-gray-600">
                Concentrar em 1-2 fornecedores
              </p>
            </div>
            <Package className="h-6 w-6 text-blue-600" />
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-700 mb-1">Total Estimado</p>
              <p className="text-3xl font-bold text-blue-700">R$ 47.850,00</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal Materiais:</span>
                <span className="font-medium">R$ 46.200,00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estimativa Frete:</span>
                <span className="font-medium text-green-600">R$ 1.650,00</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2">
                <span className="text-gray-900 font-medium">Fornecedores:</span>
                <span className="font-medium">2 principais</span>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-xs text-green-800">
                ✅ Poder de negociação e desconto por volume
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparação */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          📊 Análise Comparativa
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Diferença de Custo</p>
            <p className="text-2xl font-bold text-orange-600">+ R$ 2.620</p>
            <p className="text-xs text-gray-500 mt-1">Consolidado vs Econômico</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Economia no Frete</p>
            <p className="text-2xl font-bold text-green-600">- R$ 1.080</p>
            <p className="text-xs text-gray-500 mt-1">Com consolidação</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Menos Fornecedores</p>
            <p className="text-2xl font-bold text-blue-600">-60%</p>
            <p className="text-xs text-gray-500 mt-1">Redução logística</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Aba Histórico de Preços
function AbaHistorico() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Histórico de Preços
        </h2>
        <p className="text-gray-600">
          Acompanhe a variação de preços ao longo do tempo
        </p>
      </div>

      {/* Filtros */}
      <div className="flex gap-3">
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>Todos os itens</option>
          <option>Cabos</option>
          <option>Transformadores</option>
          <option>Postes</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>Últimos 30 dias</option>
          <option>Últimos 3 meses</option>
          <option>Últimos 6 meses</option>
          <option>Último ano</option>
        </select>
      </div>

      {/* Gráfico Placeholder */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Cabo 10mm - Variação de Preço
        </h3>
        <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <BarChart3 className="h-16 w-16 mx-auto mb-3 opacity-50" />
            <p className="text-sm">
              Gráfico será implementado com biblioteca de charts
            </p>
            <p className="text-xs mt-1">(Recharts, Chart.js ou similar)</p>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <TrendingDown className="h-6 w-6 text-green-600 mb-2" />
          <p className="text-sm text-green-700 mb-1">Tendência de Queda</p>
          <p className="text-2xl font-bold text-green-700">-12%</p>
          <p className="text-xs text-green-600 mt-1">Nos últimos 3 meses</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <Package className="h-6 w-6 text-blue-600 mb-2" />
          <p className="text-sm text-blue-700 mb-1">Preço Médio</p>
          <p className="text-2xl font-bold text-blue-700">R$ 4,65/M</p>
          <p className="text-xs text-blue-600 mt-1">Média dos fornecedores</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <TrendingUp className="h-6 w-6 text-orange-600 mb-2" />
          <p className="text-sm text-orange-700 mb-1">Volatilidade</p>
          <p className="text-2xl font-bold text-orange-700">Média</p>
          <p className="text-xs text-orange-600 mt-1">Variação de ±8%</p>
        </div>
      </div>
    </div>
  );
}
