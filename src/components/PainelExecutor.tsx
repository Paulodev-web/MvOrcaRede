import { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Mic, 
  CheckCircle2, 
  AlertCircle,
  WifiOff,
  Wifi,
  Calendar,
  MapPin,
  Ruler,
  Save,
  Upload,
  Clock,
  User,
  List,
  Image as ImageIcon,
  ChevronRight,
  MessageSquare,
  Send,
  Paperclip,
  Phone,
  Video
} from 'lucide-react';

/**
 * PAINEL EXECUTOR - Mobile First com Chat Integrado
 * 
 * Interface otimizada para uso em campo por executores de obra.
 * Cores do Admin: cyan-600 to blue-700
 */

interface TarefaDia {
  id: string;
  tipo: 'poste' | 'cabo' | 'transformador' | 'material';
  descricao: string;
  quantidadePrevista: number;
  unidade: string;
  quantidadeRealizada: number;
  status: 'pendente' | 'em_andamento' | 'concluida';
}

interface Evidencia {
  id: string;
  tipo: 'foto' | 'audio';
  dataHora: string;
  arquivo?: File;
  url?: string;
  observacao?: string;
}

interface MensagemChat {
  id: string;
  remetente: 'executor' | 'admin';
  tipo: 'texto' | 'imagem' | 'audio' | 'video';
  conteudo: string;
  timestamp: string;
  lida: boolean;
  arquivo?: {
    nome: string;
    tipo: string;
    duracao?: string;
  };
}

export function PainelExecutor() {
  const [modoOffline, setModoOffline] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState<'tarefas' | 'evidencias' | 'chat'>('tarefas');
  const [tarefaExpandida, setTarefaExpandida] = useState<string | null>(null);
  const [mensagensNaoLidas, setMensagensNaoLidas] = useState(3);

  // Dados mockados
  const [tarefasDoDia] = useState<TarefaDia[]>([
    {
      id: '1',
      tipo: 'poste',
      descricao: 'Instalação de Postes 9m',
      quantidadePrevista: 15,
      unidade: 'unidades',
      quantidadeRealizada: 8,
      status: 'em_andamento'
    },
    {
      id: '2',
      tipo: 'cabo',
      descricao: 'Lançamento de Cabo Primário',
      quantidadePrevista: 250,
      unidade: 'metros',
      quantidadeRealizada: 0,
      status: 'pendente'
    },
    {
      id: '3',
      tipo: 'transformador',
      descricao: 'Instalação de Transformadores 75kVA',
      quantidadePrevista: 2,
      unidade: 'unidades',
      quantidadeRealizada: 0,
      status: 'pendente'
    }
  ]);

  const [evidencias] = useState<Evidencia[]>([
    {
      id: '1',
      tipo: 'foto',
      dataHora: '13/02/2026 09:15',
      observacao: 'Início da instalação - Postes 1 a 5'
    },
    {
      id: '2',
      tipo: 'audio',
      dataHora: '13/02/2026 11:30',
      observacao: 'Explicação sobre atraso no transporte'
    },
    {
      id: '3',
      tipo: 'foto',
      dataHora: '13/02/2026 14:45',
      observacao: 'Progresso - 8 postes concluídos'
    }
  ]);

  const infoExecutor = {
    nome: 'João Silva',
    equipe: 'Equipe A',
    obra: 'Instalação Rede Elétrica - Bairro Centro',
    data: '13/02/2026'
  };

  const getTarefaIcon = (tipo: string) => {
    switch (tipo) {
      case 'poste': return '📍';
      case 'cabo': return '⚡';
      case 'transformador': return '🔌';
      case 'material': return '📦';
      default: return '📋';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluida': return 'bg-green-500';
      case 'em_andamento': return 'bg-blue-500';
      case 'pendente': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'concluida': return 'Concluída';
      case 'em_andamento': return 'Em Andamento';
      case 'pendente': return 'Pendente';
      default: return 'Pendente';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Fixo - Mobile Optimized com cores do Admin */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white sticky top-0 z-50 shadow-lg">
        {/* Status de Conexão */}
        <div className={`px-4 py-2 text-xs font-medium flex items-center justify-between ${
          modoOffline ? 'bg-orange-500' : 'bg-green-500'
        }`}>
          <div className="flex items-center gap-2">
            {modoOffline ? (
              <>
                <WifiOff className="h-3 w-3" />
                <span>Modo Offline - Dados serão sincronizados</span>
              </>
            ) : (
              <>
                <Wifi className="h-3 w-3" />
                <span>Online - Sincronizado</span>
              </>
            )}
          </div>
          <button
            onClick={() => setModoOffline(!modoOffline)}
            className="text-xs underline"
          >
            {modoOffline ? 'Conectar' : 'Desconectar'}
          </button>
        </div>

        {/* Info do Executor */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl backdrop-blur-sm">
                👷
              </div>
              <div>
                <p className="font-semibold text-sm">{infoExecutor.nome}</p>
                <p className="text-xs text-white/80">{infoExecutor.equipe}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <User className="h-5 w-5" />
            </button>
          </div>

          <div className="bg-white/10 rounded-lg p-3 text-xs space-y-1 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              <span className="line-clamp-1">{infoExecutor.obra}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              <span>{infoExecutor.data}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-white/20">
          <button
            onClick={() => setAbaAtiva('tarefas')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              abaAtiva === 'tarefas'
                ? 'bg-white/20 border-b-2 border-white'
                : 'hover:bg-white/10'
            }`}
          >
            <List className="h-4 w-4 inline mr-2" />
            Tarefas
          </button>
          <button
            onClick={() => setAbaAtiva('evidencias')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              abaAtiva === 'evidencias'
                ? 'bg-white/20 border-b-2 border-white'
                : 'hover:bg-white/10'
            }`}
          >
            <Camera className="h-4 w-4 inline mr-2" />
            Evidências
          </button>
          <button
            onClick={() => {
              setAbaAtiva('chat');
              setMensagensNaoLidas(0);
            }}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              abaAtiva === 'chat'
                ? 'bg-white/20 border-b-2 border-white'
                : 'hover:bg-white/10'
            }`}
          >
            <MessageSquare className="h-4 w-4 inline mr-2" />
            Chat
            {mensagensNaoLidas > 0 && (
              <span className="absolute -top-1 right-1/4 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                {mensagensNaoLidas}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="p-4 pb-24">
        {/* Card de Acesso ao Admin - Visível em todas as abas */}
        <div className="mb-4">
          <a
            href="/admin"
            className="block bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white rounded-2xl p-5 shadow-lg transition-all active:scale-98"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-2xl backdrop-blur-sm">
                  🎯
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Painel Administrativo</h3>
                  <p className="text-sm text-white/80">Acesse o sistema completo de gestão</p>
                </div>
              </div>
              <ChevronRight className="h-6 w-6 text-white/80" />
            </div>
          </a>
        </div>

        {abaAtiva === 'tarefas' && (
          <AbaTarefas 
            tarefas={tarefasDoDia}
            tarefaExpandida={tarefaExpandida}
            setTarefaExpandida={setTarefaExpandida}
            getTarefaIcon={getTarefaIcon}
            getStatusColor={getStatusColor}
            getStatusText={getStatusText}
          />
        )}
        {abaAtiva === 'evidencias' && <AbaEvidencias evidencias={evidencias} />}
        {abaAtiva === 'chat' && <AbaChat />}
      </div>

      {/* Footer Fixo com Ações Rápidas */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <button className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white py-4 rounded-xl font-medium flex flex-col items-center gap-1 shadow-lg active:scale-95 transition-all">
            <Camera className="h-6 w-6" />
            <span className="text-xs">Foto</span>
          </button>
          <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-medium flex flex-col items-center gap-1 shadow-lg active:scale-95 transition-all">
            <Mic className="h-6 w-6" />
            <span className="text-xs">Áudio</span>
          </button>
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-medium flex flex-col items-center gap-1 shadow-lg active:scale-95 transition-all">
            <Save className="h-6 w-6" />
            <span className="text-xs">Salvar</span>
          </button>
          <button className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white py-4 rounded-xl font-medium flex flex-col items-center gap-1 shadow-lg active:scale-95 transition-all">
            <Upload className="h-6 w-6" />
            <span className="text-xs">Enviar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Aba de Tarefas
function AbaTarefas({ 
  tarefas, 
  tarefaExpandida, 
  setTarefaExpandida,
  getTarefaIcon,
  getStatusColor,
  getStatusText
}: {
  tarefas: TarefaDia[];
  tarefaExpandida: string | null;
  setTarefaExpandida: (id: string | null) => void;
  getTarefaIcon: (tipo: string) => string;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
}) {
  const [quantidades, setQuantidades] = useState<{[key: string]: string}>({});

  return (
    <div className="space-y-4">
      {/* Resumo do Dia */}
      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Resumo do Dia
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/20 rounded-xl p-3 text-center backdrop-blur-sm">
            <p className="text-2xl font-bold mb-1">
              {tarefas.filter(t => t.status === 'concluida').length}
            </p>
            <p className="text-xs">Concluídas</p>
          </div>
          <div className="bg-white/20 rounded-xl p-3 text-center backdrop-blur-sm">
            <p className="text-2xl font-bold mb-1">
              {tarefas.filter(t => t.status === 'em_andamento').length}
            </p>
            <p className="text-xs">Em Andamento</p>
          </div>
          <div className="bg-white/20 rounded-xl p-3 text-center backdrop-blur-sm">
            <p className="text-2xl font-bold mb-1">
              {tarefas.filter(t => t.status === 'pendente').length}
            </p>
            <p className="text-xs">Pendentes</p>
          </div>
        </div>
      </div>

      {/* Lista de Tarefas */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-600 px-1">
          TAREFAS DE HOJE
        </h3>
        
        {tarefas.map((tarefa) => {
          const percentual = Math.round((tarefa.quantidadeRealizada / tarefa.quantidadePrevista) * 100);
          const isExpandida = tarefaExpandida === tarefa.id;

          return (
            <div 
              key={tarefa.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => setTarefaExpandida(isExpandida ? null : tarefa.id)}
                className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="text-3xl mb-1">{getTarefaIcon(tarefa.tipo)}</div>
                    <div className={`w-12 h-2 rounded-full ${getStatusColor(tarefa.status)}`}></div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {tarefa.descricao}
                    </h4>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        tarefa.status === 'concluida' ? 'bg-green-100 text-green-700' :
                        tarefa.status === 'em_andamento' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {getStatusText(tarefa.status)}
                      </span>
                      <span className="text-gray-600">
                        {tarefa.quantidadeRealizada}/{tarefa.quantidadePrevista} {tarefa.unidade}
                      </span>
                    </div>

                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progresso</span>
                        <span className="font-medium">{percentual}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            percentual === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-cyan-500 to-blue-600'
                          }`}
                          style={{ width: `${percentual}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <ChevronRight 
                    className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform ${
                      isExpandida ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </button>

              {isExpandida && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <h5 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Ruler className="h-4 w-4" />
                    Reportar Quantitativo
                  </h5>

                  <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Quantidade Instalada
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={quantidades[tarefa.id] || ''}
                        onChange={(e) => setQuantidades({
                          ...quantidades,
                          [tarefa.id]: e.target.value
                        })}
                        placeholder="0"
                        className="flex-1 text-3xl font-bold text-center border-2 border-cyan-300 rounded-xl py-4 px-4 focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 transition-all"
                        min="0"
                        max={tarefa.quantidadePrevista}
                      />
                      <div className="flex flex-col justify-center bg-cyan-100 rounded-xl px-4 min-w-[80px]">
                        <span className="text-lg font-bold text-cyan-700 text-center">
                          {tarefa.unidade}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Meta: {tarefa.quantidadePrevista} {tarefa.unidade}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <button
                      onClick={() => setQuantidades({
                        ...quantidades,
                        [tarefa.id]: Math.floor(tarefa.quantidadePrevista * 0.25).toString()
                      })}
                      className="py-2 px-3 bg-cyan-100 text-cyan-700 rounded-lg text-sm font-medium hover:bg-cyan-200 active:scale-95 transition-all"
                    >
                      25%
                    </button>
                    <button
                      onClick={() => setQuantidades({
                        ...quantidades,
                        [tarefa.id]: Math.floor(tarefa.quantidadePrevista * 0.5).toString()
                      })}
                      className="py-2 px-3 bg-cyan-100 text-cyan-700 rounded-lg text-sm font-medium hover:bg-cyan-200 active:scale-95 transition-all"
                    >
                      50%
                    </button>
                    <button
                      onClick={() => setQuantidades({
                        ...quantidades,
                        [tarefa.id]: tarefa.quantidadePrevista.toString()
                      })}
                      className="py-2 px-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 active:scale-95 transition-all"
                    >
                      100%
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Observações (opcional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Adicione detalhes sobre o trabalho realizado..."
                      className="w-full border-2 border-gray-300 rounded-xl py-2 px-3 text-sm focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 transition-all"
                    />
                  </div>

                  <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all">
                    <CheckCircle2 className="h-5 w-5" />
                    Confirmar e Salvar
                  </button>

                  {tarefa.status === 'pendente' && (
                    <div className="mt-3 flex items-start gap-2 text-xs text-orange-600 bg-orange-50 p-3 rounded-lg">
                      <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <p>Esta tarefa ainda não foi iniciada. Ao reportar valores, ela será marcada como "Em Andamento".</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Aba de Evidências
function AbaEvidencias({ evidencias }: { evidencias: Evidencia[] }) {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-2xl p-4">
        <h3 className="font-semibold text-cyan-900 mb-2 flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Evidências Multimídia
        </h3>
        <p className="text-sm text-cyan-700 mb-3">
          Registre fotos e áudios com marca d'água automática (data/hora).
        </p>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 text-xs text-cyan-600 bg-cyan-100 px-2 py-1 rounded-lg">
            <Camera className="h-3 w-3" />
            <span>Foto</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-cyan-600 bg-cyan-100 px-2 py-1 rounded-lg">
            <Mic className="h-3 w-3" />
            <span>Áudio</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-cyan-600 bg-cyan-100 px-2 py-1 rounded-lg">
            <Clock className="h-3 w-3" />
            <span>Data/Hora</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-600 px-1">
          EVIDÊNCIAS REGISTRADAS HOJE
        </h3>

        {evidencias.map((evidencia) => (
          <div 
            key={evidencia.id}
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                evidencia.tipo === 'foto' ? 'bg-purple-100' : 'bg-blue-100'
              }`}>
                {evidencia.tipo === 'foto' ? (
                  <ImageIcon className="h-6 w-6 text-purple-600" />
                ) : (
                  <Mic className="h-6 w-6 text-blue-600" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    evidencia.tipo === 'foto' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {evidencia.tipo === 'foto' ? '📷 Foto' : '🎤 Áudio'}
                  </span>
                  <span className="text-xs text-gray-500">{evidencia.dataHora}</span>
                </div>
                <p className="text-sm text-gray-700 font-medium mb-2">
                  {evidencia.observacao}
                </p>

                <div className="flex gap-2">
                  <button className="text-xs text-cyan-600 font-medium hover:text-cyan-700">
                    Ver detalhes →
                  </button>
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-green-500" title="Sincronizado"></div>
              </div>
            </div>
          </div>
        ))}

        {evidencias.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
              <Camera className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium mb-1">Nenhuma evidência ainda</p>
            <p className="text-sm text-gray-500">
              Use os botões abaixo para registrar fotos ou áudios
            </p>
          </div>
        )}
      </div>

      <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4">
        <h3 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
          <WifiOff className="h-5 w-5" />
          Modo Offline
        </h3>
        <p className="text-sm text-orange-700">
          Suas evidências serão armazenadas localmente e enviadas automaticamente quando houver conexão com a internet.
        </p>
      </div>
    </div>
  );
}

// Aba de Chat - NOVA!
function AbaChat() {
  const [mensagemTexto, setMensagemTexto] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [mensagens] = useState<MensagemChat[]>([
    {
      id: '1',
      remetente: 'admin',
      tipo: 'texto',
      conteudo: 'Bom dia, João! Como está o andamento da obra hoje?',
      timestamp: '08:30',
      lida: true
    },
    {
      id: '2',
      remetente: 'executor',
      tipo: 'texto',
      conteudo: 'Bom dia! Iniciamos a instalação dos postes. Já instalamos 5 até agora.',
      timestamp: '08:35',
      lida: true
    },
    {
      id: '3',
      remetente: 'admin',
      tipo: 'texto',
      conteudo: 'Ótimo progresso! Lembre-se de tirar fotos de cada etapa concluída.',
      timestamp: '08:37',
      lida: true
    },
    {
      id: '4',
      remetente: 'executor',
      tipo: 'imagem',
      conteudo: 'Seguem fotos dos 5 primeiros postes instalados',
      timestamp: '10:15',
      lida: true,
      arquivo: {
        nome: 'IMG_2026_001.jpg',
        tipo: 'imagem'
      }
    },
    {
      id: '5',
      remetente: 'admin',
      tipo: 'texto',
      conteudo: 'Perfeito! Qualidade excelente. Continue assim! 👍',
      timestamp: '10:20',
      lida: true
    },
    {
      id: '6',
      remetente: 'executor',
      tipo: 'audio',
      conteudo: 'Áudio sobre situação do material',
      timestamp: '11:45',
      lida: true,
      arquivo: {
        nome: 'audio_001.mp3',
        tipo: 'audio',
        duracao: '1:23'
      }
    },
    {
      id: '7',
      remetente: 'admin',
      tipo: 'texto',
      conteudo: 'Entendi a situação. Vou providenciar o material adicional ainda hoje.',
      timestamp: '12:00',
      lida: false
    },
    {
      id: '8',
      remetente: 'admin',
      tipo: 'texto',
      conteudo: 'Alguma dúvida sobre a instalação dos transformadores?',
      timestamp: '13:15',
      lida: false
    },
    {
      id: '9',
      remetente: 'admin',
      tipo: 'texto',
      conteudo: 'O caminhão com material sai em 30 minutos. Previsão de chegada: 15h.',
      timestamp: '14:30',
      lida: false
    }
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens]);

  const handleEnviarMensagem = () => {
    if (mensagemTexto.trim()) {
      // Aqui seria enviada a mensagem para o backend
      console.log('Enviando mensagem:', mensagemTexto);
      setMensagemTexto('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-280px)] bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header do Chat com cores do Admin */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            👨‍💼
          </div>
          <div>
            <h3 className="font-semibold text-sm">Admin - Central</h3>
            <p className="text-xs text-white/80 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Phone className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Video className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-cyan-50 border-b border-cyan-200 px-4 py-2 text-xs text-cyan-700">
        💬 Chat direto com a equipe administrativa
      </div>

      {/* Área de Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {mensagens.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${msg.remetente === 'executor' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 text-lg shadow-md">
              {msg.remetente === 'executor' ? '👷' : '👨‍💼'}
            </div>
            
            {/* Mensagem */}
            <div className={`max-w-[75%] ${msg.remetente === 'executor' ? 'items-end' : 'items-start'}`}>
              <div className={`rounded-2xl px-4 py-3 shadow-md ${
                msg.remetente === 'executor' 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-tr-none' 
                  : 'bg-white text-gray-900 rounded-tl-none border border-gray-200'
              }`}>
                {msg.tipo === 'texto' && (
                  <p className="text-sm leading-relaxed">{msg.conteudo}</p>
                )}

                {msg.tipo === 'imagem' && (
                  <div>
                    <p className="text-sm mb-2">{msg.conteudo}</p>
                    <div className={`${msg.remetente === 'executor' ? 'bg-white/10' : 'bg-gray-100'} rounded-lg p-3 border ${msg.remetente === 'executor' ? 'border-white/20' : 'border-gray-200'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <ImageIcon className="h-4 w-4" />
                        <span className="text-xs font-medium">{msg.arquivo?.nome}</span>
                      </div>
                      <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center">
                        <ImageIcon className="h-10 w-10 text-gray-400" />
                        <span className="text-sm text-gray-500 ml-2">[Imagem]</span>
                      </div>
                    </div>
                  </div>
                )}

                {msg.tipo === 'audio' && (
                  <div className={`${msg.remetente === 'executor' ? 'bg-white/10' : 'bg-gray-100'} rounded-lg p-3 border ${msg.remetente === 'executor' ? 'border-white/20' : 'border-gray-200'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${msg.remetente === 'executor' ? 'bg-white/20' : 'bg-cyan-100'} flex items-center justify-center`}>
                        <Mic className={`h-5 w-5 ${msg.remetente === 'executor' ? 'text-white' : 'text-cyan-600'}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium mb-1">{msg.conteudo}</p>
                        <div className="flex items-center gap-2">
                          <div className={`flex-1 h-1 ${msg.remetente === 'executor' ? 'bg-white/20' : 'bg-gray-300'} rounded-full`}>
                            <div className={`w-1/3 h-full ${msg.remetente === 'executor' ? 'bg-white' : 'bg-cyan-600'} rounded-full`}></div>
                          </div>
                          <span className="text-xs opacity-75">{msg.arquivo?.duracao}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Timestamp */}
              <div className={`flex items-center gap-1 mt-1 px-2 ${msg.remetente === 'executor' ? 'justify-end' : 'justify-start'}`}>
                <span className="text-xs text-gray-500">{msg.timestamp}</span>
                {msg.remetente === 'executor' && (
                  <span className="text-xs text-cyan-600">
                    {msg.lida ? '✓✓' : '✓'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input de Mensagem */}
      <div className="border-t border-gray-200 bg-white p-3">
        {/* Botões de Anexo */}
        <div className="flex gap-1 mb-2 overflow-x-auto pb-1">
          <button className="p-2 hover:bg-cyan-50 rounded-lg transition-colors text-cyan-600 flex-shrink-0" title="Anexar Foto">
            <Camera className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-cyan-50 rounded-lg transition-colors text-cyan-600 flex-shrink-0" title="Gravar Áudio">
            <Mic className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-cyan-50 rounded-lg transition-colors text-cyan-600 flex-shrink-0" title="Anexar Arquivo">
            <Paperclip className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-cyan-50 rounded-lg transition-colors text-cyan-600 flex-shrink-0" title="Enviar Localização">
            <MapPin className="h-5 w-5" />
          </button>
        </div>

        {/* Input e Botão Enviar */}
        <div className="flex gap-2">
          <input
            type="text"
            value={mensagemTexto}
            onChange={(e) => setMensagemTexto(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleEnviarMensagem()}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 transition-all text-sm"
          />
          
          <button 
            onClick={handleEnviarMensagem}
            disabled={!mensagemTexto.trim()}
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-xl transition-all flex items-center gap-2 shadow-lg active:scale-95 font-medium disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>

        {/* Dica */}
        <p className="text-xs text-gray-500 mt-2 text-center">
          💡 Use o áudio para mensagens mais detalhadas
        </p>
      </div>
    </div>
  );
}
