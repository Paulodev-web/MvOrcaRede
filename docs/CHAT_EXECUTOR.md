# Chat Executor-Admin - Documentação

## 📱 Visão Geral

Sistema de **chat em tempo real** integrado ao Painel Executor, permitindo comunicação direta entre executores em campo e a equipe administrativa. Desenvolvido com design mobile-first e cores do painel admin (cyan-600 to blue-700).

## 🎨 Design e Identidade Visual

### Cores do Painel Admin
O chat utiliza o esquema de cores do painel administrativo para manter consistência visual:

```css
/* Gradiente Principal */
from-cyan-600 to-blue-700

/* Estados de UI */
cyan-600, cyan-700  /* Hover states */
blue-600, blue-700  /* Secondary states */
cyan-50, cyan-100   /* Backgrounds light */

/* Destaques */
green-400  /* Online status */
red-500    /* Notificações */
```

### Identidade Visual Mobile-First
- **Bolhas de Chat**: Design moderno com cantos arredondados
- **Gradientes**: Mensagens do executor com gradiente cyan-blue
- **Sombras**: Elevação sutil para destacar mensagens
- **Avatares**: Ícones grandes (emojis) para fácil identificação
- **Scroll Suave**: Animações fluidas ao enviar mensagens

## 🚀 Funcionalidades

### 1. 📨 Mensagens de Texto

Interface otimizada para digitação rápida em dispositivos móveis:

```typescript
// Exemplo de mensagem de texto
{
  id: '1',
  remetente: 'executor' | 'admin',
  tipo: 'texto',
  conteudo: 'Bom dia! Iniciamos a instalação...',
  timestamp: '08:35',
  lida: true
}
```

**Características:**
- Input grande com bordas destacadas
- Enter para enviar (mobile keyboard)
- Botão de envio sempre visível
- Contador de caracteres (futuro)
- Suporte a emojis

### 2. 🖼️ Envio de Imagens

Compartilhamento de fotos da obra:

```typescript
// Exemplo de mensagem com imagem
{
  id: '4',
  remetente: 'executor',
  tipo: 'imagem',
  conteudo: 'Seguem fotos dos 5 primeiros postes',
  timestamp: '10:15',
  arquivo: {
    nome: 'IMG_2026_001.jpg',
    tipo: 'imagem'
  }
}
```

**Características:**
- Preview da imagem inline
- Nome do arquivo visível
- Compressão automática (futuro)
- Múltiplas imagens (futuro)
- Marca d'água mantida

### 3. 🎤 Mensagens de Áudio

Gravação de áudios para explicações detalhadas:

```typescript
// Exemplo de mensagem com áudio
{
  id: '6',
  remetente: 'executor',
  tipo: 'audio',
  conteudo: 'Áudio sobre situação do material',
  timestamp: '11:45',
  arquivo: {
    nome: 'audio_001.mp3',
    tipo: 'audio',
    duracao: '1:23'
  }
}
```

**Características:**
- Player inline com barra de progresso
- Duração visível
- Ícone de play/pause
- Qualidade configurável
- Indicador de reprodução

### 4. 📍 Compartilhamento de Localização

Envio da localização GPS (planejado):

```typescript
// Futuro: Mensagem com localização
{
  id: '10',
  remetente: 'executor',
  tipo: 'localizacao',
  conteudo: 'Estou no ponto de instalação',
  timestamp: '14:00',
  localizacao: {
    latitude: -23.550520,
    longitude: -46.633308,
    endereco: 'Rua Principal, 1000'
  }
}
```

### 5. 📎 Anexos de Arquivos

Envio de documentos e arquivos (planejado):
- PDFs
- Planilhas
- Documentos de texto
- Outros formatos relevantes

## 💬 Interface do Chat

### Header do Chat
```
┌─────────────────────────────────────┐
│ 👨‍💼 Admin - Central        📞 📹  │
│ ● Online                            │
│ 💬 Chat direto com equipe admin    │
└─────────────────────────────────────┘
```

**Elementos:**
- Avatar do admin
- Status online/offline
- Botões de chamada de voz
- Botão de chamada de vídeo
- Banner informativo

### Área de Mensagens

```
┌─────────────────────────────────────┐
│                                     │
│  👨‍💼 [Mensagem do admin]           │
│     08:30                           │
│                                     │
│         [Mensagem do executor] 👷  │
│                             08:35 ✓✓│
│                                     │
│  👨‍💼 [Mensagem do admin]           │
│     08:37                           │
│                                     │
│         [📸 Imagem anexada]    👷  │
│                             10:15 ✓✓│
│                                     │
│  👨‍💼 [Mensagem do admin]           │
│     10:20                           │
│                                     │
└─────────────────────────────────────┘
```

**Características:**
- Scroll automático para última mensagem
- Diferenciação clara executor/admin
- Timestamps em todas as mensagens
- Indicador de leitura (✓ enviado, ✓✓ lido)
- Espaçamento adequado entre mensagens

### Input de Mensagem

```
┌─────────────────────────────────────┐
│ [📷] [🎤] [📎] [📍]                 │
│                                     │
│ ┌───────────────────────────┬─────┐│
│ │ Digite sua mensagem...    │ ➤   ││
│ └───────────────────────────┴─────┘│
│                                     │
│ 💡 Use o áudio para mensagens      │
│    mais detalhadas                 │
└─────────────────────────────────────┘
```

**Elementos:**
- Botões de anexo sempre visíveis
- Input expansível
- Botão de envio destacado
- Dica contextual

## 🔄 Estados e Interações

### Estados das Mensagens

1. **Enviando** (futuro)
   ```
   [Mensagem] ⏳
   ```

2. **Enviada**
   ```
   [Mensagem] ✓
   ```

3. **Lida**
   ```
   [Mensagem] ✓✓
   ```

4. **Erro** (futuro)
   ```
   [Mensagem] ❌ Tentar novamente
   ```

### Notificações

```typescript
// Badge de mensagens não lidas na aba
{mensagensNaoLidas > 0 && (
  <span className="badge">
    {mensagensNaoLidas}
  </span>
)}
```

**Comportamento:**
- Badge vermelho com contador
- Desaparece ao abrir o chat
- Som de notificação (futuro)
- Vibração no mobile (futuro)

### Typing Indicator (futuro)

```
👨‍💼 Admin está digitando...
```

## 📊 Estrutura de Dados

### Interface MensagemChat

```typescript
interface MensagemChat {
  id: string;
  remetente: 'executor' | 'admin';
  tipo: 'texto' | 'imagem' | 'audio' | 'video' | 'localizacao' | 'arquivo';
  conteudo: string;
  timestamp: string;
  lida: boolean;
  arquivo?: {
    nome: string;
    tipo: string;
    url?: string;
    tamanho?: number;
    duracao?: string; // Para áudio/vídeo
  };
  localizacao?: {
    latitude: number;
    longitude: number;
    endereco?: string;
  };
  metadados?: {
    obraId: string;
    executorId: string;
    adminId?: string;
    dispositivo: 'mobile' | 'desktop';
  };
}
```

## 🔄 Sincronização

### Envio de Mensagens

```typescript
// Fluxo de envio
1. Usuário digita mensagem
2. Pressiona Enter ou clica em Enviar
3. Mensagem salva localmente (IndexedDB)
4. Tentativa de envio ao servidor
5. Se online: Envia e marca como ✓
6. Se offline: Fica na fila de envio
7. Quando online: Sincroniza automaticamente
8. Servidor confirma: Marca como ✓✓
```

### Recebimento de Mensagens

```typescript
// Fluxo de recebimento
1. WebSocket detecta nova mensagem
2. Adiciona à lista de mensagens
3. Scroll automático para o fim
4. Se chat não está aberto: Incrementa badge
5. Marca como lida quando visualizada
6. Envia confirmação de leitura ao servidor
```

### Estratégia de Sincronização

```typescript
// Ordem de prioridade
1. Mensagens de texto (mais leve)
2. Áudios curtos
3. Imagens comprimidas
4. Vídeos (última prioridade)
```

## 🎯 Casos de Uso

### Caso 1: Reporte Rápido
```
Executor: "Instalamos 10 postes. Próxima etapa: cabos"
Admin: "Ótimo! Material está disponível?"
Executor: "Sim, tudo ok 👍"
```

### Caso 2: Problema em Campo
```
Executor: 🎤 [Áudio 2:15]
"Encontramos um problema no poste 8. 
A fundação está com problema..."

Admin: "Entendi. Pode tirar fotos?"
Executor: 📸 [3 fotos]
Admin: "Vou enviar a equipe técnica. 
Podem continuar nos outros postes."
```

### Caso 3: Dúvida Técnica
```
Executor: "Qual a bitola do cabo para o trecho C?"
Admin: "Cabo 35mm². Conforme projeto página 12"
Executor: "Ok, obrigado!"
```

### Caso 4: Coordenação Logística
```
Admin: "Material chegará em 30 minutos"
Executor: "Perfeito! Estamos finalizando a etapa atual"
Admin: "Ótimo timing 👍"
Executor: 📍 [Localização compartilhada]
Admin: "Caminhão está 5km de distância"
```

## 🔐 Segurança e Privacidade

### Autenticação
- JWT Token em cada mensagem
- Validação de remetente no servidor
- Timeout de sessão configurável

### Criptografia
- End-to-end para mensagens sensíveis (futuro)
- TLS/SSL obrigatório
- Arquivos criptografados em trânsito

### Auditoria
```typescript
// Log de todas as mensagens
{
  mensagemId: string;
  remetente: string;
  destinatario: string;
  timestamp: string;
  tipo: string;
  lida: boolean;
  ip: string;
  dispositivo: string;
}
```

## 📱 Otimizações Mobile

### Performance
- Lazy loading de mensagens antigas
- Scroll virtualizado para muitas mensagens
- Compressão de imagens automática
- Cache de mensagens recentes

### UX Mobile
- Input fixo na parte inferior
- Teclado empurra mensagens (não sobrepõe)
- Botões de tamanho adequado (44px+)
- Gestos de swipe (futuro)

### Offline-First
- Todas as mensagens salvas localmente
- Fila de envio persistente
- Retry automático inteligente
- Indicador visual claro de status

## 🚀 Roadmap de Funcionalidades

### Fase 1 - MVP ✅ (Atual)
- [x] Interface básica do chat
- [x] Envio de texto
- [x] Visualização de mensagens
- [x] Diferenciação executor/admin
- [x] Timestamps
- [x] Badge de não lidas

### Fase 2 - Mídia
- [ ] Envio real de imagens
- [ ] Gravação de áudio
- [ ] Compressão automática
- [ ] Preview de mídia
- [ ] Download de arquivos

### Fase 3 - Tempo Real
- [ ] WebSocket para mensagens
- [ ] Typing indicator
- [ ] Confirmação de leitura real
- [ ] Notificações push
- [ ] Som de notificação

### Fase 4 - Avançado
- [ ] Chamadas de voz
- [ ] Chamadas de vídeo
- [ ] Compartilhamento de tela
- [ ] Mensagens agendadas
- [ ] Respostas rápidas (templates)

### Fase 5 - Colaboração
- [ ] Chat em grupo (múltiplos executores)
- [ ] Canais por obra
- [ ] @menções
- [ ] Reações a mensagens
- [ ] Threads de conversa

## 🎨 Componentes Visuais

### Bolha de Mensagem - Executor
```css
.mensagem-executor {
  background: linear-gradient(to right, #0891b2, #1d4ed8);
  color: white;
  border-radius: 1rem;
  border-top-right-radius: 0.25rem;
  padding: 0.75rem 1rem;
  box-shadow: 0 2px 8px rgba(8, 145, 178, 0.3);
}
```

### Bolha de Mensagem - Admin
```css
.mensagem-admin {
  background: white;
  color: #111827;
  border-radius: 1rem;
  border-top-left-radius: 0.25rem;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

### Avatar
```css
.avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background: linear-gradient(to bottom right, #06b6d4, #2563eb);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(6, 182, 212, 0.4);
  font-size: 1.125rem;
}
```

### Input de Mensagem
```css
.input-mensagem {
  border: 2px solid #d1d5db;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  transition: all 0.2s;
}

.input-mensagem:focus {
  border-color: #0891b2;
  ring: 4px;
  ring-color: rgba(8, 145, 178, 0.2);
}
```

## 🐛 Tratamento de Erros

### Falha no Envio
```typescript
// Exibir mensagem de erro
toast.error('Não foi possível enviar. Tentando novamente...');

// Adicionar à fila de retry
retryQueue.add(mensagem);

// Mostrar indicador visual
<MensagemComErro 
  mensagem={msg}
  onRetry={() => reenviarMensagem(msg.id)}
/>
```

### Conexão Perdida
```typescript
// Detectar perda de conexão
window.addEventListener('offline', () => {
  showToast('Modo Offline. Mensagens serão enviadas quando voltar online.');
});

// Reconexão automática
window.addEventListener('online', () => {
  sincronizarMensagensPendentes();
  showToast('Online novamente. Sincronizando...');
});
```

## 📊 Métricas e Analytics

### Métricas do Chat
- Tempo médio de resposta
- Mensagens por dia
- Taxa de leitura
- Tipos de mídia mais usados
- Horários de pico

### Insights
- Dúvidas mais frequentes
- Problemas recorrentes
- Tópicos mais discutidos
- Eficácia da comunicação

## 📖 Guia de Uso

### Para Executores

1. **Acessar o Chat**
   - Abrir Painel Executor
   - Clicar na aba "Chat"
   - Badge mostra mensagens não lidas

2. **Enviar Mensagem de Texto**
   - Digitar no campo de input
   - Pressionar Enter ou clicar em Enviar
   - Aguardar confirmação (✓✓)

3. **Enviar Foto**
   - Clicar no ícone 📷
   - Tirar foto ou selecionar da galeria
   - Adicionar descrição (opcional)
   - Enviar

4. **Gravar Áudio**
   - Clicar no ícone 🎤
   - Segurar para gravar
   - Soltar para enviar
   - Ou cancelar deslizando

5. **Verificar Status**
   - ✓ = Enviada
   - ✓✓ = Lida pelo admin
   - ⏳ = Enviando
   - ❌ = Erro (tentar novamente)

### Para Administradores

1. **Monitorar Mensagens**
   - Dashboard mostra chats ativos
   - Notificações de novas mensagens
   - Filtrar por obra/executor

2. **Responder Rapidamente**
   - Templates de resposta
   - Atalhos de teclado
   - Respostas rápidas salvas

3. **Gerenciar Conversas**
   - Marcar como resolvida
   - Atribuir a outro admin
   - Adicionar anotações internas

## 🔧 Configurações

### Preferências do Chat
```typescript
interface ConfigChat {
  notificacoesSonoras: boolean;
  vibrar: boolean;
  autoDownloadImagens: boolean;
  autoDownloadAudios: boolean;
  qualidadeImagem: 'baixa' | 'media' | 'alta';
  comprimirAutomaticamente: boolean;
  salvarHistorico: boolean;
  diasDeHistorico: number;
}
```

## 📄 Licença

© 2026 MvOrçaRede. Todos os direitos reservados.
