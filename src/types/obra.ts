export interface Obra {
  id: string;
  orcamentoId: string;
  nomeObra: string;
  endereco: string;
  dataInicio: string;
  previsaoTermino: string;
  status: 'planejamento' | 'em_andamento' | 'pausada' | 'concluida';
  progresso: number; // 0-100
  responsavelId: string;
  responsavelNome: string;
}

export interface ProgressoObra {
  obraId: string;
  
  // Postes
  totalPostes: number;
  postesInstalados: number;
  percentualPostes: number;
  
  // Rede Elétrica
  totalMetrosRede: number;
  metrosRedeInstalados: number;
  percentualRede: number;
  
  // Materiais
  totalMateriais: number;
  materiaisUtilizados: number;
  percentualMateriais: number;
  
  // Geral
  progressoGeral: number;
  dataAtualizacao: string;
}

export interface MensagemChat {
  id: string;
  obraId: string;
  remetenteId: string;
  remetente: string;
  papel: 'admin' | 'executor';
  tipo: 'texto' | 'imagem' | 'video' | 'audio' | 'localizacao' | 'documento';
  conteudo: string;
  arquivo?: {
    nome: string;
    url: string;
    tipo: string;
    tamanho: number;
  };
  lida: boolean;
  timestamp: string;
}

export interface ChecklistItem {
  id: string;
  obraId: string;
  descricao: string;
  categoria: 'seguranca' | 'instalacao' | 'qualidade' | 'documentacao';
  concluido: boolean;
  responsavel?: string;
  dataConlusao?: string;
  observacoes?: string;
}

export interface OcorrenciaObra {
  id: string;
  obraId: string;
  tipo: 'problema' | 'duvida' | 'alteracao' | 'conclusao';
  titulo: string;
  descricao: string;
  prioridade: 'baixa' | 'media' | 'alta';
  status: 'aberta' | 'em_analise' | 'resolvida';
  criadoPor: string;
  criadoEm: string;
  resolvidaEm?: string;
}
