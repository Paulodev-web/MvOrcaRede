# Painel Executor - Documentação

## Visão Geral

O Painel Executor é uma interface mobile-first desenvolvida especificamente para uso em canteiros de obra. Foi projetado com foco em **simplicidade, robustez e usabilidade em ambientes desafiadores**.

## Características Principais

### 🎯 Design Mobile-First
- Interface otimizada para smartphones e tablets
- Botões grandes e fáceis de tocar
- Texto legível mesmo sob luz solar
- Navegação simplificada

### 🏗️ Uso em Campo
- Interface resistente a condições adversas
- Feedback visual claro
- Mínimo de cliques necessários
- Suporte para uso com luvas (botões amplos)

## Funcionalidades (Status de Implementação)

### ✅ Implementado (Interface Visual)

#### 0. 💬 Chat em Tempo Real com Admin (NOVO!)
**Objetivo:** Comunicação instantânea entre executor e equipe administrativa

**Características:**
- Interface de chat mobile-first
- Design usando cores do painel admin (cyan-600 to blue-700)
- Mensagens de texto, imagens e áudios
- Badge de notificações com contador de não lidas
- Indicador de status online/offline
- Confirmação de leitura (✓ enviado, ✓✓ lido)
- Scroll automático para novas mensagens
- Botões para chamada de voz e vídeo (preparados)
- Avatar diferenciado para executor (👷) e admin (👨‍💼)

**Layout do Chat:**
```
Header: Avatar + Status + Botões de Ação
├── Área de Mensagens (scroll)
│   ├── Mensagens do Admin (esquerda)
│   └── Mensagens do Executor (direita)
└── Input de Mensagem
    ├── Botões de Anexo (📷 🎤 📎 📍)
    ├── Campo de texto
    └── Botão Enviar
```

**Casos de Uso:**
- Tirar dúvidas técnicas em tempo real
- Reportar problemas urgentes
- Receber orientações do admin
- Enviar fotos de situações específicas
- Coordenar logística de materiais
- Solicitar suporte técnico

**Status:** Interface completa (visual). Backend pendente.

#### 1. Identificação de Etapas
- Visualização das tarefas designadas para o dia
- Status visual de cada tarefa (Pendente, Em Progresso, Concluída)
- Informações sobre materiais e quantidades necessárias
- Progresso percentual de cada tarefa

#### 2. Reporte de Quantitativos
- Campo numérico para inserir quantidades instaladas
- Unidades de medida claras (metros, unidades, kg, etc.)
- Cálculo automático de percentual completado
- Salvamento local dos dados

#### 3. Evidências Multimídia (Interface)
- Botões para captura de fotos
- Botões para gravação de áudio
- Interface para seleção de galeria
- Upload de documentos
- Preview de evidências anexadas

#### 4. Status de Sincronização
- Indicador visual de conexão (Online/Offline)
- Badge mostrando itens pendentes de sincronização
- Feedback claro sobre o status de cada arquivo

### 🔧 A Implementar (Funcionalidades Backend)

#### 1. Câmera Integrada com Marca d'Água
**Objetivo:** Garantir autenticidade e rastreabilidade das fotos

**Funcionalidades:**
- Captura de foto usando a câmera do dispositivo
- Adição automática de marca d'água com:
  - Data e hora da captura
  - Coordenadas GPS (se disponível)
  - Nome do executor
  - ID da obra
  - Identificação da tarefa
- Compressão automática para otimizar armazenamento
- Preview antes de salvar

**Tecnologias Sugeridas:**
```typescript
// Exemplo de implementação futura
interface MarcaDagua {
  timestamp: Date;
  localizacao?: {
    latitude: number;
    longitude: number;
  };
  executor: string;
  obraId: string;
  tarefaId: string;
}

// API de captura
async function capturarFotoComMarcaDagua(
  tarefaId: string
): Promise<FotoComMetadata> {
  // 1. Capturar foto usando navigator.mediaDevices
  // 2. Obter geolocalização usando navigator.geolocation
  // 3. Adicionar marca d'água usando canvas
  // 4. Converter para Blob
  // 5. Armazenar localmente
}
```

#### 2. Upload de Áudio para Observações
**Objetivo:** Permitir registro rápido de observações sem necessidade de digitar

**Funcionalidades:**
- Gravação de áudio usando microfone do dispositivo
- Limite de tempo configurável (sugestão: 5 minutos)
- Indicador visual durante gravação
- Playback para revisão antes de enviar
- Compressão de áudio para otimizar tamanho
- Metadados automáticos (data, hora, tarefa, executor)

**Tecnologias Sugeridas:**
```typescript
// Exemplo de implementação futura
interface AudioObservacao {
  id: string;
  tarefaId: string;
  executorId: string;
  timestamp: Date;
  duracao: number; // em segundos
  arquivo: Blob;
  transcricao?: string; // opcional: transcrição automática
}

// API de gravação
class GravadorAudio {
  private mediaRecorder: MediaRecorder;
  
  async iniciarGravacao(): Promise<void>;
  async pararGravacao(): Promise<Blob>;
  async reproduzir(audio: Blob): Promise<void>;
}
```

#### 3. Sincronização Offline
**Objetivo:** Permitir trabalho sem conexão e sincronizar quando houver rede

**Arquitetura:**

```
┌─────────────────────┐
│   Painel Executor   │
│    (Interface)      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Camada de Cache    │
│   (IndexedDB ou     │
│    SQLite local)    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Sincronizador       │
│ (Service Worker)    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   API Supabase      │
│   (Backend)         │
└─────────────────────┘
```

**Funcionalidades:**
- Armazenamento local de todas as operações
- Fila de sincronização
- Detecção automática de conexão
- Sincronização automática quando online
- Resolução de conflitos
- Retry automático em caso de falha
- Indicadores visuais de status

**Estrutura de Dados Local:**
```typescript
interface OperacaoPendente {
  id: string;
  tipo: 'quantitativo' | 'foto' | 'audio' | 'documento';
  timestamp: Date;
  dados: any;
  tentativas: number;
  ultimaTentativa?: Date;
  erro?: string;
  sincronizado: boolean;
}

interface CacheSincronizacao {
  operacoes: OperacaoPendente[];
  ultimaSincronizacao?: Date;
  emProgresso: boolean;
}
```

**Fluxo de Sincronização:**

1. **Coleta de Dados (Offline)**
   - Usuário insere dados
   - Dados salvos no IndexedDB/SQLite
   - Operação adicionada à fila
   - Feedback visual de "salvo localmente"

2. **Detecção de Conexão**
   - Service Worker monitora status de rede
   - Evento dispara quando conexão é estabelecida

3. **Sincronização**
   - Processar fila em ordem cronológica
   - Upload de arquivos grandes em chunks
   - Atualizar status de cada operação
   - Notificar usuário sobre progresso

4. **Tratamento de Erros**
   - Retry automático com backoff exponencial
   - Log de erros para debug
   - Notificação ao usuário se falhar múltiplas vezes

**Tecnologias Sugeridas:**
- **IndexedDB:** Armazenamento local no browser
- **Service Workers:** Detecção de rede e sincronização em background
- **Background Sync API:** Sincronização automática quando online
- **Workbox:** Biblioteca para facilitar service workers

```typescript
// Exemplo de Service Worker
self.addEventListener('sync', async (event) => {
  if (event.tag === 'sync-obra-data') {
    event.waitUntil(sincronizarDados());
  }
});

async function sincronizarDados() {
  const operacoes = await obterOperacoesPendentes();
  
  for (const op of operacoes) {
    try {
      await enviarParaSupabase(op);
      await marcarComoSincronizado(op.id);
    } catch (erro) {
      await registrarErro(op.id, erro);
    }
  }
}
```

## Fluxo de Uso Completo

### Cenário: Executor em Campo (Sem Internet)

1. **Início do Dia (08:00)**
   - Executor abre o app
   - Vê suas tarefas do dia (carregadas previamente)
   - Status: 🔴 Offline

2. **Durante o Trabalho**
   - Instala 50 metros de cabo
   - Insere no campo: "50"
   - Clica em "Salvar"
   - ✅ Mensagem: "Salvo localmente"
   - Badge: "1 atualização pendente"

3. **Tirar Foto de Evidência**
   - Clica em "Tirar Foto"
   - Câmera abre
   - Tira foto do poste instalado
   - Marca d'água adicionada automaticamente
   - ✅ Foto salva localmente
   - Badge: "2 atualizações pendentes"

4. **Gravar Observação**
   - Clica em "Gravar Áudio"
   - Fala: "Poste 07 instalado com sucesso, mas cabo apresenta pequeno arranhão"
   - Para gravação
   - ✅ Áudio salvo localmente
   - Badge: "3 atualizações pendentes"

5. **Retorno à Área com Internet (17:00)**
   - Status muda para: 🟢 Online
   - Sincronização automática inicia
   - Progresso: "Sincronizando 1 de 3..."
   - ✅ Todas as atualizações enviadas
   - Badge desaparece

6. **Confirmação**
   - Gestor recebe notificação de atualização
   - Pode ver progresso em tempo real no ModuloObra
   - Fotos, quantitativos e áudios disponíveis imediatamente

## Estrutura de Banco de Dados (Supabase)

### Tabelas Necessárias

```sql
-- Tabela de tarefas/etapas
CREATE TABLE obra_tarefas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  obra_id UUID REFERENCES obras(id),
  titulo TEXT NOT NULL,
  material TEXT NOT NULL,
  quantidade DECIMAL NOT NULL,
  unidade TEXT NOT NULL,
  status TEXT CHECK (status IN ('pendente', 'em_progresso', 'concluida')),
  quantidade_instalada DECIMAL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de quantitativos reportados
CREATE TABLE obra_quantitativos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tarefa_id UUID REFERENCES obra_tarefas(id),
  executor_id UUID REFERENCES usuarios(id),
  quantidade DECIMAL NOT NULL,
  unidade TEXT NOT NULL,
  observacao TEXT,
  timestamp TIMESTAMP NOT NULL,
  sincronizado_em TIMESTAMP DEFAULT NOW(),
  localizacao JSONB -- { lat, lng }
);

-- Tabela de evidências (fotos, áudios, docs)
CREATE TABLE obra_evidencias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tarefa_id UUID REFERENCES obra_tarefas(id),
  executor_id UUID REFERENCES usuarios(id),
  tipo TEXT CHECK (tipo IN ('foto', 'audio', 'documento')),
  arquivo_url TEXT NOT NULL,
  metadados JSONB NOT NULL, -- marca d'água, GPS, etc
  timestamp TIMESTAMP NOT NULL,
  sincronizado_em TIMESTAMP DEFAULT NOW()
);

-- Tabela de sincronização (log)
CREATE TABLE sincronizacao_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  executor_id UUID REFERENCES usuarios(id),
  obra_id UUID REFERENCES obras(id),
  operacoes_sincronizadas INTEGER,
  timestamp TIMESTAMP DEFAULT NOW(),
  status TEXT CHECK (status IN ('sucesso', 'parcial', 'falha')),
  detalhes JSONB
);
```

## Segurança e Validações

### Autenticação
- Login obrigatório para acessar o painel
- Token JWT armazenado localmente
- Renovação automática do token

### Permissões
- Executores só veem suas próprias tarefas
- Gestores veem todas as tarefas da obra
- Administradores têm acesso completo

### Validações
- Quantidades devem ser positivas
- Quantidade instalada não pode exceder quantidade total (com margem de 10% para correções)
- Fotos devem ter tamanho máximo (ex: 5MB)
- Áudios devem ter duração máxima (ex: 5 minutos)

## Otimizações de Performance

### Imagens
- Compressão automática para 1920x1080 (Full HD)
- Qualidade ajustável (padrão: 85%)
- Formato WebP quando possível
- Fallback para JPEG

### Áudios
- Codec AAC ou Opus
- Taxa de bits: 64kbps (suficiente para voz)
- Mono (não precisa stereo para voz)

### Sincronização
- Upload em chunks de 1MB para arquivos grandes
- Prioridade: quantitativos > fotos > áudios
- Sincronização em background quando app não está em foco
- Limite de 3 tentativas por operação
- Backoff exponencial: 1s, 5s, 15s

## Interface de Teste/Debug

Adicionar um painel de debug (apenas para dev) que mostra:
- Status de conexão
- Tamanho do cache local
- Operações pendentes
- Logs de sincronização
- Botão para limpar cache
- Botão para forçar sincronização

## Próximos Passos

### Fase 1: Implementação Base (Prioridade Alta)
- [ ] Implementar armazenamento local (IndexedDB)
- [ ] Configurar Service Worker básico
- [ ] API de sincronização com Supabase
- [ ] Detecção de status de rede

### Fase 2: Captura de Mídia (Prioridade Alta)
- [ ] Integração com câmera do dispositivo
- [ ] Adicionar marca d'água em fotos
- [ ] Captura de geolocalização
- [ ] Gravação de áudio

### Fase 3: Sincronização Avançada (Prioridade Média)
- [ ] Upload em chunks
- [ ] Retry com backoff exponencial
- [ ] Resolução de conflitos
- [ ] Sincronização em background

### Fase 4: Melhorias UX (Prioridade Média)
- [ ] Notificações push
- [ ] Modo escuro
- [ ] Acessibilidade
- [ ] Internacionalização

### Fase 5: Features Avançadas (Prioridade Baixa)
- [ ] Transcrição automática de áudios
- [ ] OCR em fotos de documentos
- [ ] Relatórios offline
- [ ] Assinatura digital

## Considerações Importantes

### Bateria
- Minimizar uso de GPS (apenas quando necessário)
- Suspender sincronização se bateria < 15%
- Otimizar processamento de imagem

### Armazenamento
- Limite de cache local: 500MB
- Limpeza automática de itens sincronizados > 7 dias
- Aviso quando espaço < 100MB

### Conectividade
- Suporte para redes 3G/4G/5G
- Adaptação de qualidade baseada em velocidade
- Aviso se upload está demorando muito

### Testes de Campo
- Testar em diferentes dispositivos (Android/iOS)
- Testar em diferentes condições de rede
- Testar com luvas de trabalho
- Testar sob luz solar direta
- Testar com conectividade intermitente

## Recursos Adicionais

### Links Úteis
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Background Sync](https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API)
- [Workbox](https://developers.google.com/web/tools/workbox)
- [MediaDevices API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)

### Bibliotecas Recomendadas
- `workbox-webpack-plugin`: Service workers simplificados
- `idb`: Wrapper moderno para IndexedDB
- `react-use-offline`: Hook para detecção de conexão
- `compressorjs`: Compressão de imagens no cliente
- `lamejs`: Codificação MP3 no browser
