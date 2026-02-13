// Tipos para o Painel Executor
// Estas interfaces serão usadas quando as funcionalidades forem implementadas

// ============================================
// TIPOS PRINCIPAIS
// ============================================

export interface Obra {
  id: string;
  nome: string;
  endereco: string;
  dataInicio: Date;
  dataPrevisaoTermino: Date;
  status: 'planejamento' | 'em_andamento' | 'pausada' | 'concluida';
  responsavel: string;
  cliente: string;
}

export interface Executor {
  id: string;
  nome: string;
  cpf: string;
  email?: string;
  telefone: string;
  cargo: string;
  avatar?: string;
  obraAtual?: string;
}

export interface Tarefa {
  id: string;
  obraId: string;
  titulo: string;
  descricao?: string;
  material: string;
  codigoMaterial?: string;
  quantidade: number;
  quantidadeInstalada: number;
  unidade: string;
  status: 'pendente' | 'em_progresso' | 'concluida' | 'bloqueada';
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
  dataInicio?: Date;
  dataPrevisao?: Date;
  dataConclusao?: Date;
  executorId?: string;
  localizacao?: Coordenadas;
  observacoes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Coordenadas {
  latitude: number;
  longitude: number;
  precisao?: number; // em metros
  timestamp?: Date;
}

// ============================================
// QUANTITATIVOS
// ============================================

export interface Quantitativo {
  id: string;
  tarefaId: string;
  executorId: string;
  quantidade: number;
  unidade: string;
  observacao?: string;
  localizacao?: Coordenadas;
  timestamp: Date;
  sincronizado: boolean;
  sincronizadoEm?: Date;
}

export interface ReporteQuantitativoInput {
  tarefaId: string;
  quantidade: number;
  observacao?: string;
  capturarLocalizacao?: boolean;
}

// ============================================
// EVIDÊNCIAS MULTIMÍDIA
// ============================================

export type TipoEvidencia = 'foto' | 'audio' | 'video' | 'documento';

export interface EvidenciaBase {
  id: string;
  tarefaId: string;
  executorId: string;
  tipo: TipoEvidencia;
  timestamp: Date;
  localizacao?: Coordenadas;
  sincronizado: boolean;
  sincronizadoEm?: Date;
  metadados: Record<string, any>;
}

export interface EvidenciaFoto extends EvidenciaBase {
  tipo: 'foto';
  arquivoUrl?: string; // URL após upload
  arquivoLocal?: string; // Blob/Data URL local
  tamanhoBytes: number;
  largura: number;
  altura: number;
  marcaDagua: MarcaDagua;
  thumbnail?: string;
}

export interface EvidenciaAudio extends EvidenciaBase {
  tipo: 'audio';
  arquivoUrl?: string;
  arquivoLocal?: string;
  tamanhoBytes: number;
  duracaoSegundos: number;
  formato: 'mp3' | 'aac' | 'opus' | 'wav';
  transcricao?: string; // Transcrição automática (futuro)
}

export interface EvidenciaVideo extends EvidenciaBase {
  tipo: 'video';
  arquivoUrl?: string;
  arquivoLocal?: string;
  tamanhoBytes: number;
  duracaoSegundos: number;
  largura: number;
  altura: number;
  formato: 'mp4' | 'webm';
  thumbnail?: string;
}

export interface EvidenciaDocumento extends EvidenciaBase {
  tipo: 'documento';
  arquivoUrl?: string;
  arquivoLocal?: string;
  tamanhoBytes: number;
  nomeArquivo: string;
  formato: string; // pdf, doc, xls, etc
}

export type Evidencia = 
  | EvidenciaFoto 
  | EvidenciaAudio 
  | EvidenciaVideo 
  | EvidenciaDocumento;

// ============================================
// MARCA D'ÁGUA
// ============================================

export interface MarcaDagua {
  timestamp: Date;
  executorNome: string;
  executorId: string;
  obraId: string;
  obraNome: string;
  tarefaId: string;
  tarefaTitulo: string;
  localizacao?: Coordenadas;
  empresa?: string;
  logo?: string; // URL do logo da empresa
}

export interface ConfiguracaoMarcaDagua {
  posicao: 'superior-esquerda' | 'superior-direita' | 'inferior-esquerda' | 'inferior-direita';
  opacidade: number; // 0 a 1
  tamanhoFonte: number;
  corFonte: string;
  corFundo: string;
  incluirLogo: boolean;
  incluirGPS: boolean;
  incluirQRCode: boolean; // QR Code com link para a evidência
}

// ============================================
// SINCRONIZAÇÃO
// ============================================

export type StatusSincronizacao = 
  | 'pendente' 
  | 'sincronizando' 
  | 'sincronizado' 
  | 'erro' 
  | 'cancelado';

export type TipoOperacao = 
  | 'criar_quantitativo' 
  | 'atualizar_quantitativo'
  | 'criar_evidencia'
  | 'atualizar_tarefa'
  | 'criar_ocorrencia';

export interface OperacaoPendente {
  id: string;
  tipo: TipoOperacao;
  dados: any;
  timestamp: Date;
  tentativas: number;
  maximoTentativas: number;
  proximaTentativa?: Date;
  ultimaTentativa?: Date;
  erro?: string;
  prioridade: number; // 0 = mais alta
  tamanhoBytes?: number;
  dependencias?: string[]; // IDs de outras operações que devem ser sincronizadas primeiro
  status: StatusSincronizacao;
}

export interface FilaSincronizacao {
  operacoes: OperacaoPendente[];
  emProgresso: boolean;
  operacaoAtual?: string;
  ultimaSincronizacao?: Date;
  proximaSincronizacao?: Date;
}

export interface ResultadoSincronizacao {
  sucesso: boolean;
  operacoesSincronizadas: number;
  operacoesComErro: number;
  bytesEnviados: number;
  duracaoMs: number;
  erros?: Array<{
    operacaoId: string;
    erro: string;
  }>;
}

export interface StatusConexao {
  online: boolean;
  tipo?: 'wifi' | '4g' | '3g' | '2g' | 'ethernet' | 'desconhecido';
  velocidadeEstimada?: number; // em Mbps
  qualidade?: 'excelente' | 'boa' | 'regular' | 'ruim';
  ultimaVerificacao: Date;
}

// ============================================
// CACHE LOCAL
// ============================================

export interface CacheLocal {
  obras: Obra[];
  tarefas: Tarefa[];
  quantitativos: Quantitativo[];
  evidencias: Evidencia[];
  operacoesPendentes: OperacaoPendente[];
  ultimaAtualizacao: Date;
  tamanhoTotalBytes: number;
}

export interface EstatisticasCache {
  tamanhoTotal: number;
  tamanhoDisponivel: number;
  percentualUsado: number;
  quantidadeOperacoesPendentes: number;
  quantidadeEvidenciasPendentes: number;
  ultimaSincronizacao?: Date;
}

// ============================================
// CAPTURA DE MÍDIA
// ============================================

export interface ConfiguracaoCaptura {
  foto: {
    qualidade: number; // 0 a 1
    larguraMaxima: number;
    alturaMaxima: number;
    formato: 'jpeg' | 'webp' | 'png';
    incluirMarcaDagua: boolean;
    capturarGPS: boolean;
  };
  audio: {
    formato: 'mp3' | 'aac' | 'opus';
    bitrate: number; // em kbps
    duracaoMaxima: number; // em segundos
    mono: boolean;
  };
  video: {
    formato: 'mp4' | 'webm';
    qualidade: 'baixa' | 'media' | 'alta';
    duracaoMaxima: number;
    capturarGPS: boolean;
  };
}

export interface ResultadoCaptura<T> {
  sucesso: boolean;
  dados?: T;
  erro?: string;
}

// ============================================
// NOTIFICAÇÕES
// ============================================

export type TipoNotificacao = 
  | 'info' 
  | 'sucesso' 
  | 'aviso' 
  | 'erro';

export interface Notificacao {
  id: string;
  tipo: TipoNotificacao;
  titulo: string;
  mensagem: string;
  timestamp: Date;
  lida: boolean;
  acao?: {
    label: string;
    callback: () => void;
  };
}

// ============================================
// OCORRÊNCIAS
// ============================================

export type TipoOcorrencia = 
  | 'problema' 
  | 'duvida' 
  | 'alteracao' 
  | 'melhoria' 
  | 'seguranca';

export type PrioridadeOcorrencia = 
  | 'baixa' 
  | 'media' 
  | 'alta' 
  | 'critica';

export type StatusOcorrencia = 
  | 'aberta' 
  | 'em_analise' 
  | 'aguardando_resposta' 
  | 'resolvida' 
  | 'fechada';

export interface Ocorrencia {
  id: string;
  obraId: string;
  tarefaId?: string;
  tipo: TipoOcorrencia;
  titulo: string;
  descricao: string;
  prioridade: PrioridadeOcorrencia;
  status: StatusOcorrencia;
  reportadoPorId: string;
  reportadoPorNome: string;
  dataReporte: Date;
  dataResolucao?: Date;
  resolvidoPorId?: string;
  resolvidoPorNome?: string;
  resolucao?: string;
  evidencias?: string[]; // IDs de evidências
  comentarios?: ComentarioOcorrencia[];
  localizacao?: Coordenadas;
}

export interface ComentarioOcorrencia {
  id: string;
  ocorrenciaId: string;
  autorId: string;
  autorNome: string;
  texto: string;
  timestamp: Date;
  anexos?: string[]; // IDs de evidências
}

// ============================================
// CONFIGURAÇÕES DO EXECUTOR
// ============================================

export interface ConfiguracoesExecutor {
  captura: ConfiguracaoCaptura;
  marcaDagua: ConfiguracaoMarcaDagua;
  sincronizacao: {
    automatica: boolean;
    apenasWifi: boolean;
    sincronizarAoAbrir: boolean;
    intervaloMinutos: number;
    manterCacheDias: number;
  };
  notificacoes: {
    habilitadas: boolean;
    novasTarefas: boolean;
    mensagensChat: boolean;
    alteracoesObra: boolean;
    sincronizacaoConcluida: boolean;
  };
  interface: {
    tema: 'claro' | 'escuro' | 'auto';
    tamanhoFonte: 'pequeno' | 'medio' | 'grande';
    modoAltoContraste: boolean;
  };
}

// ============================================
// ESTATÍSTICAS DO EXECUTOR
// ============================================

export interface EstatisticasExecutor {
  periodo: {
    inicio: Date;
    fim: Date;
  };
  tarefasConcluidas: number;
  quantitativoTotal: Record<string, number>; // unidade -> quantidade
  evidenciasEnviadas: {
    fotos: number;
    audios: number;
    videos: number;
    documentos: number;
  };
  tempoMedioResposta: number; // em horas
  ocorrenciasReportadas: number;
  diasTrabalhados: number;
  horasTrabalhadas: number;
}

// ============================================
// HELPERS E UTILITÁRIOS
// ============================================

export interface ProgressoUpload {
  operacaoId: string;
  bytesEnviados: number;
  bytesTotal: number;
  percentual: number;
  velocidade: number; // bytes/segundo
  tempoRestanteEstimado: number; // segundos
}

export interface ValidacaoQuantitativo {
  valido: boolean;
  erros: string[];
  avisos: string[];
}

// ============================================
// TIPOS PARA API/SUPABASE
// ============================================

export interface SupabaseRow {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface ObraTarefaRow extends SupabaseRow {
  obra_id: string;
  titulo: string;
  descricao?: string;
  material: string;
  codigo_material?: string;
  quantidade: number;
  quantidade_instalada: number;
  unidade: string;
  status: string;
  prioridade: string;
  data_inicio?: string;
  data_previsao?: string;
  data_conclusao?: string;
  executor_id?: string;
  localizacao?: any;
  observacoes?: string;
}

export interface ObraQuantitativoRow extends SupabaseRow {
  tarefa_id: string;
  executor_id: string;
  quantidade: number;
  unidade: string;
  observacao?: string;
  localizacao?: any;
  timestamp: string;
  sincronizado_em: string;
}

export interface ObraEvidenciaRow extends SupabaseRow {
  tarefa_id: string;
  executor_id: string;
  tipo: string;
  arquivo_url: string;
  metadados: any;
  timestamp: string;
  sincronizado_em: string;
}

// ============================================
// EXPORTS ÚTEIS
// ============================================

export const UNIDADES = [
  'metros',
  'unidades',
  'quilogramas',
  'toneladas',
  'litros',
  'metros²',
  'metros³',
  'horas',
  'dias'
] as const;

export type Unidade = typeof UNIDADES[number];

export const TAMANHO_MAXIMO_FOTO = 5 * 1024 * 1024; // 5MB
export const TAMANHO_MAXIMO_AUDIO = 10 * 1024 * 1024; // 10MB
export const TAMANHO_MAXIMO_VIDEO = 50 * 1024 * 1024; // 50MB
export const TAMANHO_MAXIMO_DOCUMENTO = 20 * 1024 * 1024; // 20MB

export const DURACAO_MAXIMA_AUDIO = 5 * 60; // 5 minutos
export const DURACAO_MAXIMA_VIDEO = 10 * 60; // 10 minutos

export const TAMANHO_MAXIMO_CACHE = 500 * 1024 * 1024; // 500MB

export const INTERVALO_VERIFICACAO_CONEXAO = 30 * 1000; // 30 segundos
export const INTERVALO_SINCRONIZACAO_AUTO = 5 * 60 * 1000; // 5 minutos

export const MAXIMO_TENTATIVAS_SYNC = 3;
export const BACKOFF_INICIAL_MS = 1000; // 1 segundo
export const BACKOFF_MULTIPLICADOR = 5;
