import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AVAILABLE_TOOLS, Tool } from '../types/tools';
import { 
  ExternalLink, 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  TrendingUp,
  Activity,
  Package,
  Users,
  MapPin
} from 'lucide-react';

export function AdminDashboard() {
  const navigate = useNavigate();
  const enabledTools = AVAILABLE_TOOLS.filter(tool => tool.enabled);

  const notificacoesObra = [
    {
      id: 1,
      tipo: 'progresso',
      titulo: 'Instalação de Postes - 75% Concluído',
      obra: 'Bairro Centro',
      descricao: '15 de 20 postes instalados',
      tempo: 'Há 15 minutos',
      icon: TrendingUp,
      cor: 'blue'
    },
    {
      id: 2,
      tipo: 'sucesso',
      titulo: 'Material Entregue',
      obra: 'Zona Leste',
      descricao: 'Lote de cabos 10mm² recebido',
      tempo: 'Há 1 hora',
      icon: Package,
      cor: 'green'
    },
    {
      id: 3,
      tipo: 'alerta',
      titulo: 'Atraso na Entrega',
      obra: 'Vila Nova',
      descricao: 'Material previsto para hoje, nova previsão: amanhã',
      tempo: 'Há 2 horas',
      icon: AlertTriangle,
      cor: 'yellow'
    },
    {
      id: 4,
      tipo: 'equipe',
      titulo: 'Equipe em Campo',
      obra: 'Bairro Centro',
      descricao: '5 técnicos iniciaram trabalho',
      tempo: 'Há 3 horas',
      icon: Users,
      cor: 'cyan'
    },
    {
      id: 5,
      tipo: 'concluido',
      titulo: 'Etapa Finalizada',
      obra: 'Residencial Sol',
      descricao: 'Instalação de rede concluída',
      tempo: 'Há 4 horas',
      icon: CheckCircle,
      cor: 'green'
    },
    {
      id: 6,
      tipo: 'localizacao',
      titulo: 'Check-in no Local',
      obra: 'Industrial Park',
      descricao: 'Equipe chegou ao ponto de instalação',
      tempo: 'Há 5 horas',
      icon: MapPin,
      cor: 'purple'
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent mb-2">
          Bem-vindo ao Painel Administrativo
        </h1>
        <p className="text-gray-600">
          Gerencie suas ferramentas e acompanhe o andamento das obras em tempo real
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Ferramentas do Sistema
            </h2>
            <button
              onClick={() => navigate('/admin/tools')}
              className="text-sm text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1 transition-colors"
            >
              Ver detalhes
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enabledTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} onClick={() => navigate(tool.route)} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl shadow-lg border-2 border-cyan-200 p-6 sticky top-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center shadow-md">
                  <Bell className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Central de Notificações
                </h2>
              </div>
              <span className="px-2 py-1 bg-cyan-600 text-white text-xs font-bold rounded-full">
                {notificacoesObra.length}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Acompanhe o andamento das obras em tempo real
            </p>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {notificacoesObra.map((notificacao) => (
                <NotificacaoCard key={notificacao.id} notificacao={notificacao} />
              ))}
            </div>

            <button
              onClick={() => navigate('/tools/obra')}
              className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-lg hover:from-cyan-700 hover:to-blue-800 transition-all font-medium shadow-md flex items-center justify-center gap-2"
            >
              <Activity className="h-5 w-5" />
              Ver Todas as Obras
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
}

function ToolCard({ tool, onClick }: ToolCardProps) {
  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case 'finance': return 'Financeiro';
      case 'productivity': return 'Produtividade';
      case 'analytics': return 'Análise';
      case 'utilities': return 'Utilitários';
      default: return 'Outros';
    }
  };

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 hover:shadow-xl hover:border-cyan-300 hover:scale-105 transition-all text-left group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl shadow-md`}>
          {tool.icon}
        </div>
        {tool.version && (
          <span className="text-xs text-cyan-700 bg-cyan-50 px-2 py-1 rounded font-medium">
            v{tool.version}
          </span>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-cyan-700 transition-colors">
        {tool.name}
      </h3>
      
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {tool.description}
      </p>
      
      <div className="flex items-center justify-between">
        {tool.category && (
          <span className="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded font-medium">
            {getCategoryLabel(tool.category)}
          </span>
        )}
        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-cyan-600 transition-colors" />
      </div>
    </button>
  );
}

interface NotificacaoCardProps {
  notificacao: {
    id: number;
    tipo: string;
    titulo: string;
    obra: string;
    descricao: string;
    tempo: string;
    icon: React.ElementType;
    cor: string;
  };
}

function NotificacaoCard({ notificacao }: NotificacaoCardProps) {
  const Icon = notificacao.icon;
  
  const getCoresPorTipo = (cor: string) => {
    switch (cor) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          titleColor: 'text-blue-900'
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          titleColor: 'text-green-900'
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          titleColor: 'text-yellow-900'
        };
      case 'cyan':
        return {
          bg: 'bg-cyan-50',
          border: 'border-cyan-200',
          iconBg: 'bg-cyan-100',
          iconColor: 'text-cyan-600',
          titleColor: 'text-cyan-900'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600',
          titleColor: 'text-purple-900'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          iconBg: 'bg-gray-100',
          iconColor: 'text-gray-600',
          titleColor: 'text-gray-900'
        };
    }
  };

  const cores = getCoresPorTipo(notificacao.cor);

  return (
    <div className={`${cores.bg} border ${cores.border} rounded-lg p-4 hover:shadow-md transition-all cursor-pointer`}>
      <div className="flex items-start gap-3">
        <div className={`${cores.iconBg} ${cores.iconColor} p-2 rounded-lg flex-shrink-0`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-semibold ${cores.titleColor} mb-1`}>
            {notificacao.titulo}
          </h4>
          <p className="text-xs text-gray-600 mb-1 font-medium">
            📍 {notificacao.obra}
          </p>
          <p className="text-xs text-gray-500 mb-2">
            {notificacao.descricao}
          </p>
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-400">
              {notificacao.tempo}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
