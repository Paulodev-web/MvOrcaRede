export interface ConfiguracaoPortal {
  obraId: string;
  clienteId: string;
  ativo: boolean;
  
  // Visibilidade de Seções
  secoes: {
    progresso: boolean;
    timeline: boolean;
    galeria: boolean;
    documentos: boolean;
    financeiro: boolean;
    checklist: boolean;
    contato: boolean;
  };
  
  // Configuração de Progresso
  progressoConfig: {
    mostrarPostes: boolean;
    mostrarRede: boolean;
    mostrarMateriais: boolean;
    mostrarPorcentagem: boolean;
    mostrarCronograma: boolean;
  };
  
  // Configuração Financeira
  financeiroConfig: {
    mostrarValorTotal: boolean;
    mostrarPagamentos: boolean;
    mostrarSaldo: boolean;
    mostrarDetalhamento: boolean;
  };
  
  // Configuração de Galeria
  galeriaConfig: {
    moderacaoFotos: boolean; // Admin aprova antes de exibir
    permitirDownload: boolean;
    mostrarAntesDepois: boolean;
    organizarPorData: boolean;
  };
  
  // Configuração de Documentos
  documentosConfig: {
    mostrarProjeto: boolean;
    mostrarCertificados: boolean;
    mostrarRelatorios: boolean;
    permitirDownload: boolean;
  };
  
  // Customização Visual
  customizacao: {
    corPrimaria: string;
    logo?: string;
    mensagemBoasVindas?: string;
    rodape?: string;
  };
  
  // Metadata
  dataAtualizacao: string;
}

export interface ItemVisibilidadePortal {
  id: string;
  tipo: 'coluna' | 'secao' | 'dado';
  nome: string;
  descricao: string;
  visivel: boolean;
  categoria: 'progresso' | 'financeiro' | 'galeria' | 'documentos';
}

export interface FotoPortal {
  id: string;
  url: string;
  descricao: string;
  data: string;
  categoria: 'antes' | 'durante' | 'depois';
  aprovadaParaPortal: boolean;
  moderadaPor?: string;
  dataModeracao?: string;
}

export interface ProgressoCliente {
  percentualGeral: number;
  etapaAtual: string;
  dataInicio: string;
  previsaoTermino: string;
  diasRestantes: number;
  
  // Detalhes (se configurado para mostrar)
  postes?: { total: number; instalados: number; percentual: number };
  rede?: { total: number; instalada: number; percentual: number };
  
  // Timeline
  marcos: {
    id: string;
    titulo: string;
    data: string;
    concluido: boolean;
    descricao?: string;
  }[];
}

export interface FinanceiroCliente {
  valorTotal: number;
  valorPago: number;
  saldo: number;
  percentualPago: number;
  
  parcelas?: {
    numero: number;
    valor: number;
    vencimento: string;
    paga: boolean;
    dataPagamento?: string;
  }[];
}
