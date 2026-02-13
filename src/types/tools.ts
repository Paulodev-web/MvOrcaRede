export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  route: string;
  enabled: boolean;
  version?: string;
  category?: 'finance' | 'productivity' | 'analytics' | 'utilities' | 'other';
}

export const AVAILABLE_TOOLS: Tool[] = [
  {
    id: 'orcared',
    name: 'OrçaRede',
    description: 'Sistema de orçamentos para projetos de redes elétricas',
    icon: '⚡',
    color: 'from-blue-500 to-blue-700',
    route: '/tools/orcared',
    enabled: true,
    version: '1.0.0',
    category: 'finance',
  },
  {
    id: 'precificacao',
    name: 'Módulo de Precificação',
    description: 'Inteligência de custos com cálculo automático de BDI',
    icon: '💰',
    color: 'from-emerald-500 to-green-700',
    route: '/tools/precificacao',
    enabled: true,
    version: '1.0.0',
    category: 'finance',
  },
  {
    id: 'sourcing',
    name: 'Comparação de Fornecedores',
    description: 'Sourcing estratégico e comparação de preços',
    icon: '🔍',
    color: 'from-orange-500 to-red-700',
    route: '/tools/sourcing',
    enabled: true,
    version: '1.0.0',
    category: 'finance',
  },
  {
    id: 'obra',
    name: 'Andamento de Obra',
    description: 'Gestão e acompanhamento de instalações em campo',
    icon: '🏗️',
    color: 'from-indigo-500 to-purple-700',
    route: '/tools/obra',
    enabled: true,
    version: '1.0.0',
    category: 'productivity',
  },
  {
    id: 'portal-cliente-config',
    name: 'Configurar Portal do Cliente',
    description: 'Configure o que seus clientes podem visualizar',
    icon: '⚙️',
    color: 'from-cyan-500 to-blue-700',
    route: '/tools/portal-cliente',
    enabled: true,
    version: '1.0.0',
    category: 'productivity',
  },
  {
    id: 'portal-cliente-view',
    name: 'Portal do Cliente',
    description: 'Visualize o portal público que o cliente acessa',
    icon: '👁️',
    color: 'from-purple-500 to-indigo-700',
    route: '/portal-cliente',
    enabled: true,
    version: '1.0.0',
    category: 'utilities',
  },
  {
    id: 'painel-executor',
    name: 'Painel do Executor',
    description: 'Interface mobile para executores em campo',
    icon: '👷',
    color: 'from-orange-500 to-amber-700',
    route: '/painel-executor',
    enabled: true,
    version: '1.0.0',
    category: 'utilities',
  },
  // Adicione novas ferramentas aqui no futuro
];
