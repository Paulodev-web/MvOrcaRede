import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Settings,
  Image as ImageIcon,
  FileText,
  DollarSign,
  BarChart3,
  CheckSquare,
  MessageSquare,
  Monitor,
  Smartphone,
  Save,
  ExternalLink,
  Palette,
  Globe,
  Upload
} from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';

export function ModuloPortalCliente() {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState<'configurar' | 'preview' | 'aparencia'>('configurar');
  
  // Estado de visibilidade das seções
  const [secoes, setSecoes] = useState({
    progresso: true,
    timeline: true,
    galeria: true,
    documentos: false,
    financeiro: false,
    checklist: false,
    contato: true,
  });

  // Configurações de progresso
  const [progressoConfig, setProgressoConfig] = useState({
    mostrarPostes: true,
    mostrarRede: true,
    mostrarMateriais: false,
    mostrarPorcentagem: true,
    mostrarCronograma: true,
  });

  // Configurações financeiras
  const [financeiroConfig, setFinanceiroConfig] = useState({
    mostrarValorTotal: true,
    mostrarPagamentos: true,
    mostrarSaldo: false,
    mostrarDetalhamento: false,
  });

  // Configurações de galeria
  const [galeriaConfig, setGaleriaConfig] = useState({
    moderacaoFotos: true,
    permitirDownload: true,
    mostrarAntesDepois: true,
    organizarPorData: true,
  });

  const toggleSecao = (secao: string) => {
    setSecoes({ ...secoes, [secao]: !secoes[secao as keyof typeof secoes] });
  };

  const toggleProgressoConfig = (campo: string) => {
    setProgressoConfig({ 
      ...progressoConfig, 
      [campo]: !progressoConfig[campo as keyof typeof progressoConfig] 
    });
  };

  const toggleFinanceiroConfig = (campo: string) => {
    setFinanceiroConfig({ 
      ...financeiroConfig, 
      [campo]: !financeiroConfig[campo as keyof typeof financeiroConfig] 
    });
  };

  const toggleGaleriaConfig = (campo: string) => {
    setGaleriaConfig({ 
      ...galeriaConfig, 
      [campo]: !galeriaConfig[campo as keyof typeof galeriaConfig] 
    });
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-2xl shadow-lg">
                  👁️
                </div>
                Portal do Cliente
              </h1>
              <p className="text-gray-600 mt-2">
                Configure o que seus clientes podem visualizar
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => window.open('/portal/obra-123', '_blank')}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              Abrir Portal
            </button>
            <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 flex items-center gap-2">
              <Save className="h-4 w-4" />
              Salvar Configurações
            </button>
          </div>
        </div>

        {/* Seletor de Obra */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              Configurar portal para:
            </label>
            <select className="flex-1 max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500">
              <option>Obra: Instalação Rede - Bairro Centro</option>
              <option>Obra: Projeto Industrial - Zona Leste</option>
              <option>Obra: Expansão Residencial - Vila Nova</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-1 p-2">
              <button
                onClick={() => setAbaAtiva('configurar')}
                className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
                  abaAtiva === 'configurar'
                    ? 'bg-cyan-100 text-cyan-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Settings className="h-4 w-4 inline mr-2" />
                Configurar Visibilidade
              </button>
              <button
                onClick={() => setAbaAtiva('aparencia')}
                className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
                  abaAtiva === 'aparencia'
                    ? 'bg-cyan-100 text-cyan-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Palette className="h-4 w-4 inline mr-2" />
                Aparência
              </button>
              <button
                onClick={() => setAbaAtiva('preview')}
                className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
                  abaAtiva === 'preview'
                    ? 'bg-cyan-100 text-cyan-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Eye className="h-4 w-4 inline mr-2" />
                Preview
              </button>
            </nav>
          </div>

          <div className="p-6">
            {abaAtiva === 'configurar' && (
              <AbaConfigurar
                secoes={secoes}
                toggleSecao={toggleSecao}
                progressoConfig={progressoConfig}
                toggleProgressoConfig={toggleProgressoConfig}
                financeiroConfig={financeiroConfig}
                toggleFinanceiroConfig={toggleFinanceiroConfig}
                galeriaConfig={galeriaConfig}
                toggleGaleriaConfig={toggleGaleriaConfig}
              />
            )}
            {abaAtiva === 'aparencia' && <AbaAparencia />}
            {abaAtiva === 'preview' && <AbaPreview secoes={secoes} progressoConfig={progressoConfig} navigate={navigate} />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Aba Configurar Visibilidade
function AbaConfigurar({ 
  secoes, 
  toggleSecao, 
  progressoConfig, 
  toggleProgressoConfig,
  financeiroConfig,
  toggleFinanceiroConfig,
  galeriaConfig,
  toggleGaleriaConfig
}: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Configure o que o Cliente Pode Ver
        </h2>
        <p className="text-gray-600">
          Ative ou desative seções e informações que aparecerão no portal
        </p>
      </div>

      {/* Seções Principais */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Eye className="h-5 w-5 text-cyan-600" />
          Seções Principais do Portal
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ToggleCard
            icon={<BarChart3 className="h-5 w-5" />}
            titulo="Progresso da Obra"
            descricao="Barras de progresso e percentuais"
            ativo={secoes.progresso}
            onToggle={() => toggleSecao('progresso')}
          />
          <ToggleCard
            icon={<FileText className="h-5 w-5" />}
            titulo="Timeline da Obra"
            descricao="Marcos e fases concluídas"
            ativo={secoes.timeline}
            onToggle={() => toggleSecao('timeline')}
          />
          <ToggleCard
            icon={<ImageIcon className="h-5 w-5" />}
            titulo="Galeria de Fotos"
            descricao="Fotos do andamento da obra"
            ativo={secoes.galeria}
            onToggle={() => toggleSecao('galeria')}
          />
          <ToggleCard
            icon={<FileText className="h-5 w-5" />}
            titulo="Documentos"
            descricao="Certificados e relatórios"
            ativo={secoes.documentos}
            onToggle={() => toggleSecao('documentos')}
          />
          <ToggleCard
            icon={<DollarSign className="h-5 w-5" />}
            titulo="Financeiro"
            descricao="Pagamentos e saldo"
            ativo={secoes.financeiro}
            onToggle={() => toggleSecao('financeiro')}
          />
          <ToggleCard
            icon={<CheckSquare className="h-5 w-5" />}
            titulo="Checklist de Qualidade"
            descricao="Itens verificados"
            ativo={secoes.checklist}
            onToggle={() => toggleSecao('checklist')}
          />
          <ToggleCard
            icon={<MessageSquare className="h-5 w-5" />}
            titulo="Contato"
            descricao="Formulário de mensagens"
            ativo={secoes.contato}
            onToggle={() => toggleSecao('contato')}
          />
        </div>
      </div>

      {/* Configurações Detalhadas de Progresso */}
      {secoes.progresso && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Configurações: Progresso da Obra
          </h3>
          
          <div className="space-y-3">
            <CheckboxOption
              label="Mostrar Postes Instalados"
              descricao="Ex: 130 de 200 postes (65%)"
              checked={progressoConfig.mostrarPostes}
              onChange={() => toggleProgressoConfig('mostrarPostes')}
            />
            <CheckboxOption
              label="Mostrar Rede Instalada"
              descricao="Ex: 3.2km de 5km (64%)"
              checked={progressoConfig.mostrarRede}
              onChange={() => toggleProgressoConfig('mostrarRede')}
            />
            <CheckboxOption
              label="Mostrar Materiais Utilizados"
              descricao="Ex: 58% dos materiais"
              checked={progressoConfig.mostrarMateriais}
              onChange={() => toggleProgressoConfig('mostrarMateriais')}
            />
            <CheckboxOption
              label="Mostrar Porcentagem Geral"
              descricao="Barra de progresso principal"
              checked={progressoConfig.mostrarPorcentagem}
              onChange={() => toggleProgressoConfig('mostrarPorcentagem')}
            />
            <CheckboxOption
              label="Mostrar Cronograma"
              descricao="Início, previsão e dias restantes"
              checked={progressoConfig.mostrarCronograma}
              onChange={() => toggleProgressoConfig('mostrarCronograma')}
            />
          </div>
        </div>
      )}

      {/* Configurações Financeiras */}
      {secoes.financeiro && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Configurações: Financeiro
          </h3>
          
          <div className="space-y-3">
            <CheckboxOption
              label="Mostrar Valor Total"
              descricao="Valor contratado da obra"
              checked={financeiroConfig.mostrarValorTotal}
              onChange={() => toggleFinanceiroConfig('mostrarValorTotal')}
            />
            <CheckboxOption
              label="Mostrar Histórico de Pagamentos"
              descricao="Parcelas pagas e pendentes"
              checked={financeiroConfig.mostrarPagamentos}
              onChange={() => toggleFinanceiroConfig('mostrarPagamentos')}
            />
            <CheckboxOption
              label="Mostrar Saldo Devedor"
              descricao="Quanto ainda falta pagar"
              checked={financeiroConfig.mostrarSaldo}
              onChange={() => toggleFinanceiroConfig('mostrarSaldo')}
            />
            <CheckboxOption
              label="Mostrar Detalhamento de Custos"
              descricao="Breakdown de materiais e mão de obra"
              checked={financeiroConfig.mostrarDetalhamento}
              onChange={() => toggleFinanceiroConfig('mostrarDetalhamento')}
            />
          </div>
        </div>
      )}

      {/* Configurações de Galeria */}
      {secoes.galeria && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-purple-600" />
            Configurações: Galeria de Fotos
          </h3>
          
          <div className="space-y-3">
            <CheckboxOption
              label="Moderação de Fotos"
              descricao="Admin aprova fotos antes de exibir no portal"
              checked={galeriaConfig.moderacaoFotos}
              onChange={() => toggleGaleriaConfig('moderacaoFotos')}
            />
            <CheckboxOption
              label="Permitir Download"
              descricao="Cliente pode baixar as fotos"
              checked={galeriaConfig.permitirDownload}
              onChange={() => toggleGaleriaConfig('permitirDownload')}
            />
            <CheckboxOption
              label="Seção Antes/Depois"
              descricao="Comparação visual automática"
              checked={galeriaConfig.mostrarAntesDepois}
              onChange={() => toggleGaleriaConfig('mostrarAntesDepois')}
            />
            <CheckboxOption
              label="Organizar por Data"
              descricao="Fotos agrupadas cronologicamente"
              checked={galeriaConfig.organizarPorData}
              onChange={() => toggleGaleriaConfig('organizarPorData')}
            />
          </div>

          {/* Moderação de Fotos */}
          {galeriaConfig.moderacaoFotos && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Fotos Pendentes de Aprovação
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <FotoModeracaoCard 
                  foto="IMG_001.jpg"
                  data="13/02/2026 14:30"
                  status="pendente"
                />
                <FotoModeracaoCard 
                  foto="IMG_002.jpg"
                  data="13/02/2026 15:45"
                  status="pendente"
                />
                <FotoModeracaoCard 
                  foto="IMG_003.jpg"
                  data="13/02/2026 16:20"
                  status="aprovada"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Aba Aparência
function AbaAparencia() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Personalização Visual
        </h2>
        <p className="text-gray-600">
          Customize a aparência do portal para combinar com sua marca
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cores */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🎨 Cores do Portal
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cor Primária
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  defaultValue="#0891b2"
                  className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  defaultValue="#0891b2"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cor Secundária
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  defaultValue="#3b82f6"
                  className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  defaultValue="#3b82f6"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Logo e Textos */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📝 Textos e Logo
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo da Empresa
              </label>
              <button className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-cyan-500 transition-colors">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Clique para fazer upload</p>
                <p className="text-xs text-gray-500">PNG, JPG (máx 2MB)</p>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mensagem de Boas-Vindas
              </label>
              <textarea
                placeholder="Ex: Bem-vindo ao acompanhamento da sua obra!"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                defaultValue="Acompanhe o progresso da sua obra em tempo real"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rodapé Personalizado
              </label>
              <input
                type="text"
                placeholder="Ex: © 2026 Sua Empresa - Todos os direitos reservados"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Aba Preview
function AbaPreview({ secoes, progressoConfig, navigate }: any) {
  const abrirPortalDesktop = () => {
    window.open('/portal/obra-123', '_blank');
  };

  const abrirPortalMobile = () => {
    // Abre em nova aba com simulação mobile (mesmo link)
    const newWindow = window.open('/portal/obra-123', '_blank');
    if (newWindow) {
      // Opcional: Adicionar parâmetro para forçar view mobile
      newWindow.addEventListener('load', () => {
        newWindow.document.body.style.maxWidth = '428px';
        newWindow.document.body.style.margin = '0 auto';
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Preview do Portal do Cliente
          </h2>
          <p className="text-gray-600">
            Veja como o cliente visualizará a obra
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={abrirPortalDesktop}
            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-lg hover:from-cyan-700 hover:to-blue-800 flex items-center gap-2 shadow-sm"
          >
            <Monitor className="h-4 w-4" />
            Abrir em Desktop
          </button>
          <button 
            onClick={abrirPortalMobile}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <Smartphone className="h-4 w-4" />
            Mobile
          </button>
        </div>
      </div>

      {/* Preview do Portal */}
      <div className="bg-white border-2 border-gray-300 rounded-xl overflow-hidden shadow-xl">
        {/* Header do Portal Cliente */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">Sua Obra</h1>
              <p className="text-cyan-100 text-sm">Instalação Rede Elétrica - Bairro Centro</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">65%</div>
              <p className="text-cyan-100 text-sm">Concluído</p>
            </div>
          </div>
        </div>

        {/* Conteúdo do Portal */}
        <div className="p-6 space-y-6 bg-gray-50">
          {/* Progresso */}
          {secoes.progresso && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                📊 Progresso da Obra
              </h2>

              {progressoConfig.mostrarPorcentagem && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-900">Progresso Geral</span>
                    <span className="font-bold text-cyan-600">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 h-4 rounded-full transition-all"
                      style={{ width: '65%' }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {progressoConfig.mostrarPostes && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">Postes Instalados</span>
                      <span className="font-medium">130 de 200</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                )}

                {progressoConfig.mostrarRede && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">Rede Instalada</span>
                      <span className="font-medium">3.2km de 5km</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '64%' }}></div>
                    </div>
                  </div>
                )}
              </div>

              {progressoConfig.mostrarCronograma && (
                <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-600">Início</p>
                    <p className="font-semibold text-gray-900">15/01/2026</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Dias Restantes</p>
                    <p className="font-semibold text-orange-600">12 dias</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Previsão</p>
                    <p className="font-semibold text-gray-900">25/02/2026</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Timeline */}
          {secoes.timeline && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                📅 Timeline da Obra
              </h2>
              
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Início da Obra</p>
                    <p className="text-sm text-gray-600">15/01/2026</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                    ⏳
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Em Andamento</p>
                    <p className="text-sm text-gray-600">Instalação de postes e redes</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 flex-shrink-0">
                    ○
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Conclusão</p>
                    <p className="text-sm text-gray-500">25/02/2026</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Galeria */}
          {secoes.galeria && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                📸 Galeria de Fotos
              </h2>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
              </div>

              <button className="w-full mt-3 px-4 py-2 text-sm text-cyan-600 hover:text-cyan-700 font-medium">
                Ver todas as fotos (23) →
              </button>
            </div>
          )}

          {/* Financeiro */}
          {secoes.financeiro && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                💰 Informações Financeiras
              </h2>
              
              {financeiroConfig.mostrarValorTotal && (
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-green-700 mb-1">Valor Total da Obra</p>
                  <p className="text-2xl font-bold text-green-700">R$ 285.000,00</p>
                </div>
              )}

              {financeiroConfig.mostrarPagamentos && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">✅ Parcela 1 (Entrada)</span>
                    <span className="font-medium text-green-600">R$ 57.000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">✅ Parcela 2 (30%)</span>
                    <span className="font-medium text-green-600">R$ 85.500</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">⏳ Parcela 3 (Final)</span>
                    <span className="font-medium text-orange-600">R$ 142.500</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Contato */}
          {secoes.contato && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                💬 Fale Conosco
              </h2>
              
              <form className="space-y-3">
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                <textarea
                  placeholder="Sua mensagem..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                <button className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
                  Enviar Mensagem
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Componente ToggleCard
function ToggleCard({ icon, titulo, descricao, ativo, onToggle }: any) {
  return (
    <div 
      onClick={onToggle}
      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
        ativo 
          ? 'border-cyan-500 bg-cyan-50' 
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className={`p-2 rounded-lg ${ativo ? 'bg-cyan-100 text-cyan-600' : 'bg-gray-100 text-gray-600'}`}>
            {icon}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">{titulo}</h4>
            <p className="text-sm text-gray-600">{descricao}</p>
          </div>
        </div>
        {ativo ? (
          <Eye className="h-5 w-5 text-cyan-600" />
        ) : (
          <EyeOff className="h-5 w-5 text-gray-400" />
        )}
      </div>
    </div>
  );
}

// Componente CheckboxOption
function CheckboxOption({ label, descricao, checked, onChange }: any) {
  return (
    <label className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500 mt-0.5"
      />
      <div className="flex-1">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">{descricao}</p>
      </div>
    </label>
  );
}

// Componente FotoModeracaoCard
function FotoModeracaoCard({ foto, data, status }: any) {
  const ImageIconComponent = ImageIcon;
  
  return (
    <div className="relative group">
      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <ImageIconComponent className="h-8 w-8 text-gray-400" />
      </div>
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
        {status === 'pendente' ? (
          <>
            <button className="px-3 py-1.5 bg-green-600 text-white rounded text-xs font-medium">
              Aprovar
            </button>
            <button className="px-3 py-1.5 bg-red-600 text-white rounded text-xs font-medium">
              Rejeitar
            </button>
          </>
        ) : (
          <span className="px-3 py-1.5 bg-green-600 text-white rounded text-xs font-medium">
            ✓ Aprovada
          </span>
        )}
      </div>
      <p className="text-xs text-gray-600 mt-1 text-center">{data}</p>
    </div>
  );
}
