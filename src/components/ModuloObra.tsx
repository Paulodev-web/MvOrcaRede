import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MessageSquare,
  BarChart3,
  CheckSquare,
  AlertTriangle,
  Send,
  Paperclip,
  Image as ImageIcon,
  Video,
  Mic,
  MapPin,
  FileText,
  Users,
  Clock,
  TrendingUp,
  Activity,
  Home
} from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';

export function ModuloObra() {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState<'chat' | 'progresso' | 'checklist' | 'ocorrencias'>('progresso');

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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center text-2xl shadow-lg">
                  🏗️
                </div>
                Andamento de Obra
              </h1>
              <p className="text-gray-600 mt-2">
                Gestão e acompanhamento de instalações em campo
              </p>
            </div>
          </div>
        </div>

        {/* Info da Obra */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Obra: Instalação Rede Elétrica - Bairro Centro
              </h2>
              <p className="text-sm text-gray-600">
                Endereço: Rua Principal, 1000 - Centro • Iniciada em 15/01/2026
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Em Andamento
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                65% Concluído
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-1 p-2">
              <button
                onClick={() => setAbaAtiva('progresso')}
                className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
                  abaAtiva === 'progresso'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="h-4 w-4 inline mr-2" />
                Progresso
              </button>
              <button
                onClick={() => setAbaAtiva('chat')}
                className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors relative ${
                  abaAtiva === 'chat'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <MessageSquare className="h-4 w-4 inline mr-2" />
                Chat
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <button
                onClick={() => setAbaAtiva('checklist')}
                className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
                  abaAtiva === 'checklist'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <CheckSquare className="h-4 w-4 inline mr-2" />
                Checklist
              </button>
              <button
                onClick={() => setAbaAtiva('ocorrencias')}
                className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
                  abaAtiva === 'ocorrencias'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <AlertTriangle className="h-4 w-4 inline mr-2" />
                Ocorrências
              </button>
            </nav>
          </div>

          <div className="p-6">
            {abaAtiva === 'progresso' && <AbaProgresso />}
            {abaAtiva === 'chat' && <AbaChat />}
            {abaAtiva === 'checklist' && <AbaChecklist />}
            {abaAtiva === 'ocorrencias' && <AbaOcorrencias />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Aba Progresso
function AbaProgresso() {
  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-200 rounded-lg">
              <Activity className="h-5 w-5 text-blue-700" />
            </div>
            <span className="text-2xl font-bold text-blue-700">65%</span>
          </div>
          <p className="text-sm font-medium text-blue-900">Progresso Geral</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-200 rounded-lg">
              <CheckSquare className="h-5 w-5 text-green-700" />
            </div>
            <span className="text-2xl font-bold text-green-700">130/200</span>
          </div>
          <p className="text-sm font-medium text-green-900">Postes Instalados</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-purple-200 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-700" />
            </div>
            <span className="text-2xl font-bold text-purple-700">3.2km</span>
          </div>
          <p className="text-sm font-medium text-purple-900">Rede Instalada</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-orange-200 rounded-lg">
              <Clock className="h-5 w-5 text-orange-700" />
            </div>
            <span className="text-2xl font-bold text-orange-700">12 dias</span>
          </div>
          <p className="text-sm font-medium text-orange-900">Para Conclusão</p>
        </div>
      </div>

      {/* Detalhamento do Progresso */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Postes */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Instalação de Postes
            </h3>
            <span className="text-sm font-medium text-gray-600">65% concluído</span>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">130 de 200 postes</span>
              <span className="font-medium text-gray-900">70 restantes</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all"
                style={{ width: '65%' }}
              ></div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">📍 Postes de 9m:</span>
              <span className="font-medium">80/120</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">📍 Postes de 12m:</span>
              <span className="font-medium">50/80</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <p className="text-xs text-green-700">
                ✅ Última atualização: Hoje às 14:30
              </p>
            </div>
          </div>
        </div>

        {/* Rede Elétrica */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Extensão de Rede
            </h3>
            <span className="text-sm font-medium text-gray-600">64% concluído</span>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">3.2km de 5km</span>
              <span className="font-medium text-gray-900">1.8km restantes</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-indigo-600 h-3 rounded-full transition-all"
                style={{ width: '64%' }}
              ></div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">⚡ Cabo primário:</span>
              <span className="font-medium">2.8km/4.2km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">⚡ Cabo secundário:</span>
              <span className="font-medium">3.5km/5.8km</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <p className="text-xs text-purple-700">
                ✅ Última atualização: Hoje às 16:15
              </p>
            </div>
          </div>
        </div>

        {/* Materiais */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Materiais Utilizados
            </h3>
            <span className="text-sm font-medium text-gray-600">58% utilizado</span>
          </div>
          
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-600 h-3 rounded-full transition-all"
                style={{ width: '58%' }}
              ></div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">📦 Transformadores:</span>
              <span className="font-medium">8/15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">📦 Isoladores:</span>
              <span className="font-medium">580/1000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">📦 Conectores:</span>
              <span className="font-medium">320/500</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Linha do Tempo
          </h3>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white flex-shrink-0">
                  ✓
                </div>
                <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
              </div>
              <div className="pb-4">
                <p className="font-medium text-gray-900">Início da Obra</p>
                <p className="text-sm text-gray-600">15/01/2026</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white flex-shrink-0">
                  ✓
                </div>
                <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
              </div>
              <div className="pb-4">
                <p className="font-medium text-gray-900">Fundações Concluídas</p>
                <p className="text-sm text-gray-600">28/01/2026</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0 animate-pulse">
                  ⏳
                </div>
                <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
              </div>
              <div className="pb-4">
                <p className="font-medium text-gray-900">Instalação em Andamento</p>
                <p className="text-sm text-gray-600">Atual</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 flex-shrink-0">
                  ○
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-600">Previsão de Conclusão</p>
                <p className="text-sm text-gray-500">25/02/2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Aba Chat
function AbaChat() {
  const [mensagem, setMensagem] = useState('');

  const mensagens = [
    {
      id: 1,
      remetente: 'João Silva',
      papel: 'executor',
      tipo: 'texto',
      conteudo: 'Bom dia! Iniciamos a instalação dos postes da Rua B hoje.',
      timestamp: '09:15',
      avatar: '👷'
    },
    {
      id: 2,
      remetente: 'Você (Admin)',
      papel: 'admin',
      tipo: 'texto',
      conteudo: 'Ótimo! Quantos postes conseguiram instalar até agora?',
      timestamp: '09:20',
      avatar: '👨‍💼'
    },
    {
      id: 3,
      remetente: 'João Silva',
      papel: 'executor',
      tipo: 'imagem',
      conteudo: 'Já instalamos 8 postes. Segue foto do progresso:',
      arquivo: { nome: 'IMG_1234.jpg', tipo: 'imagem' },
      timestamp: '11:30',
      avatar: '👷'
    },
    {
      id: 4,
      remetente: 'João Silva',
      papel: 'executor',
      tipo: 'audio',
      conteudo: 'Áudio explicando situação do transformador',
      arquivo: { nome: 'audio_001.mp3', tipo: 'audio', duracao: '1:23' },
      timestamp: '14:15',
      avatar: '👷'
    },
    {
      id: 5,
      remetente: 'Você (Admin)',
      papel: 'admin',
      tipo: 'texto',
      conteudo: 'Perfeito! Continue assim. Lembre-se de seguir o checklist de segurança.',
      timestamp: '14:25',
      avatar: '👨‍💼'
    }
  ];

  return (
    <div className="h-[600px] flex flex-col bg-white rounded-lg border border-gray-200">
      {/* Header do Chat */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg">
            👷
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">João Silva</h3>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Online
            </p>
          </div>
        </div>
      </div>

      {/* Área de Mensagens */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {mensagens.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.papel === 'admin' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-lg">
              {msg.avatar}
            </div>
            
            <div className={`max-w-[70%] ${msg.papel === 'admin' ? 'items-end' : 'items-start'}`}>
              <div className={`rounded-2xl px-4 py-3 ${
                msg.papel === 'admin' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                {msg.tipo === 'texto' && (
                  <p className="text-sm">{msg.conteudo}</p>
                )}

                {msg.tipo === 'imagem' && (
                  <div>
                    <p className="text-sm mb-2">{msg.conteudo}</p>
                    <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-5 w-5" />
                        <span className="text-sm font-medium">{msg.arquivo?.nome}</span>
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-lg h-40 flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                        <span className="text-sm text-gray-500 ml-2">[Imagem]</span>
                      </div>
                    </div>
                  </div>
                )}

                {msg.tipo === 'audio' && (
                  <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <Mic className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{msg.conteudo}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1 bg-white/20 rounded-full">
                            <div className="w-1/3 h-full bg-white rounded-full"></div>
                          </div>
                          <span className="text-xs">{msg.arquivo?.duracao}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <p className={`text-xs text-gray-500 mt-1 ${msg.papel === 'admin' ? 'text-right' : 'text-left'}`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input de Mensagem */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex gap-2">
          {/* Botões de Anexo */}
          <div className="flex gap-1">
            <button 
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600"
              title="Anexar Imagem"
            >
              <ImageIcon className="h-5 w-5" />
            </button>
            <button 
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600"
              title="Anexar Vídeo"
            >
              <Video className="h-5 w-5" />
            </button>
            <button 
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600"
              title="Gravar Áudio"
            >
              <Mic className="h-5 w-5" />
            </button>
            <button 
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600"
              title="Enviar Localização"
            >
              <MapPin className="h-5 w-5" />
            </button>
            <button 
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600"
              title="Anexar Documento"
            >
              <Paperclip className="h-5 w-5" />
            </button>
          </div>

          {/* Input */}
          <input
            type="text"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          
          {/* Botão Enviar */}
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <Send className="h-4 w-4" />
            Enviar
          </button>
        </div>

        {/* Info sobre funcionalidades */}
        <div className="mt-3 text-xs text-gray-500 flex items-center gap-2">
          <span>💡 Funcionalidades disponíveis:</span>
          <span className="px-2 py-1 bg-gray-200 rounded">📷 Fotos</span>
          <span className="px-2 py-1 bg-gray-200 rounded">🎥 Vídeos</span>
          <span className="px-2 py-1 bg-gray-200 rounded">🎤 Áudio</span>
          <span className="px-2 py-1 bg-gray-200 rounded">📍 Localização</span>
          <span className="px-2 py-1 bg-gray-200 rounded">📎 Arquivos</span>
        </div>
      </div>
    </div>
  );
}

// Aba Checklist
function AbaChecklist() {
  const checklist = [
    { id: 1, categoria: 'seguranca', item: 'EPIs verificados', concluido: true },
    { id: 2, categoria: 'seguranca', item: 'Área sinalizada', concluido: true },
    { id: 3, categoria: 'seguranca', item: 'Treinamento de segurança', concluido: true },
    { id: 4, categoria: 'instalacao', item: 'Fundações dos postes', concluido: true },
    { id: 5, categoria: 'instalacao', item: 'Içamento dos postes', concluido: false },
    { id: 6, categoria: 'instalacao', item: 'Instalação de transformadores', concluido: false },
    { id: 7, categoria: 'qualidade', item: 'Verificação de níveis', concluido: false },
    { id: 8, categoria: 'qualidade', item: 'Testes elétricos', concluido: false },
    { id: 9, categoria: 'documentacao', item: 'Registro fotográfico', concluido: false },
    { id: 10, categoria: 'documentacao', item: 'As-built', concluido: false },
  ];

  const categorias = {
    seguranca: { nome: 'Segurança', cor: 'red', icon: '🛡️' },
    instalacao: { nome: 'Instalação', cor: 'blue', icon: '🔧' },
    qualidade: { nome: 'Qualidade', cor: 'green', icon: '✅' },
    documentacao: { nome: 'Documentação', cor: 'yellow', icon: '📄' },
  };

  return (
    <div className="space-y-6">
      {Object.entries(categorias).map(([key, cat]) => {
        const itens = checklist.filter(item => item.categoria === key);
        const concluidos = itens.filter(item => item.concluido).length;
        const percentual = Math.round((concluidos / itens.length) * 100);

        return (
          <div key={key} className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <span>{cat.icon}</span>
                {cat.nome}
              </h3>
              <span className="text-sm font-medium text-gray-600">
                {concluidos}/{itens.length} ({percentual}%)
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className={`bg-${cat.cor}-500 h-2 rounded-full transition-all`}
                style={{ width: `${percentual}%` }}
              ></div>
            </div>

            <div className="space-y-2">
              {itens.map(item => (
                <label 
                  key={item.id}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={item.concluido}
                    readOnly
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <span className={`flex-1 ${item.concluido ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {item.item}
                  </span>
                  {item.concluido && (
                    <span className="text-xs text-green-600">✓ Concluído</span>
                  )}
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Aba Ocorrências
function AbaOcorrencias() {
  const ocorrencias = [
    {
      id: 1,
      tipo: 'problema',
      titulo: 'Poste danificado durante transporte',
      descricao: 'Um dos postes de 12m apresentou rachadura na base.',
      prioridade: 'alta',
      status: 'resolvida',
      data: '20/01/2026 14:30'
    },
    {
      id: 2,
      tipo: 'duvida',
      titulo: 'Dúvida sobre especificação de transformador',
      descricao: 'Transformador no projeto está com especificação diferente do estoque.',
      prioridade: 'media',
      status: 'em_analise',
      data: '22/01/2026 09:15'
    },
    {
      id: 3,
      tipo: 'alteracao',
      titulo: 'Necessário mudar posição de 3 postes',
      descricao: 'Encontramos tubulação de água que não constava no projeto.',
      prioridade: 'alta',
      status: 'aberta',
      data: 'Hoje 10:45'
    }
  ];

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'bg-red-100 text-red-700 border-red-200';
      case 'media': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'baixa': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolvida': return 'bg-green-100 text-green-700';
      case 'em_analise': return 'bg-yellow-100 text-yellow-700';
      case 'aberta': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Registro de Ocorrências
        </h3>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Nova Ocorrência
        </button>
      </div>

      {ocorrencias.map((ocorrencia) => (
        <div 
          key={ocorrencia.id}
          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3 flex-1">
              <div className={`px-3 py-1 rounded-full border ${getPrioridadeColor(ocorrencia.prioridade)} text-xs font-medium`}>
                {ocorrencia.prioridade.toUpperCase()}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  {ocorrencia.titulo}
                </h4>
                <p className="text-sm text-gray-600">
                  {ocorrencia.descricao}
                </p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ocorrencia.status)}`}>
              {ocorrencia.status === 'resolvida' && 'Resolvida'}
              {ocorrencia.status === 'em_analise' && 'Em Análise'}
              {ocorrencia.status === 'aberta' && 'Aberta'}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{ocorrencia.data}</span>
            <button className="text-indigo-600 hover:text-indigo-700 font-medium">
              Ver Detalhes →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
