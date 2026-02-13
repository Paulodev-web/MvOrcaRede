# 📱 Painel Executor - Guia Rápido

## Acesso Rápido

Para acessar o Painel Executor mobile:

```
http://localhost:5173/executor/obra-123
```

Ou através do **Módulo de Obra**:
1. Acesse `/tools/obra`
2. Na aba "Progresso", clique em **"Abrir Painel Executor"**

## 🎯 O que é?

Interface mobile-first para executores em campo reportarem andamento de obras com:

- ✅ Lista de tarefas do dia
- 📊 Reporte de quantitativos instalados
- 📸 Evidências com câmera (marca d'água automática)
- 🎤 Gravação de áudio para observações
- 💬 **Chat em tempo real com o admin** (NOVO!)
- 🔄 Sincronização offline (IndexedDB)

## 📱 Design Mobile-First

O painel foi otimizado para:
- Dispositivos móveis (smartphones/tablets)
- Uso em canteiros de obra
- Operação com uma mão
- Botões grandes e fáceis de tocar
- Modo offline robusto

## 🎨 Interface

### Header Fixo
- Status de conexão (Online/Offline)
- Informações do executor e obra
- Tabs: Tarefas | Evidências

### Aba Tarefas
- **Resumo do Dia**: Tarefas concluídas/pendentes
- **Cards Expansíveis**: Toque para abrir formulário
- **Input Numérico Grande**: Fácil digitação mobile
- **Botões de Atalho**: 25%, 50%, 100%
- **Barra de Progresso**: Visual claro

### Aba Evidências
- Galeria de fotos e áudios
- Indicador de sincronização
- Metadados automáticos

### 💬 Aba Chat (NOVA!)
- **Chat em tempo real** com equipe administrativa
- Cores do painel admin (cyan-600 to blue-700)
- Mensagens de texto, imagens e áudios
- Indicador de mensagens não lidas
- Status online/offline
- Confirmação de leitura (✓ enviado, ✓✓ lido)
- Scroll automático para novas mensagens
- Botões para chamada de voz/vídeo (futuro)

### Footer Fixo
- 📷 **Foto**: Câmera com marca d'água
- 🎤 **Áudio**: Observações rápidas
- 💾 **Salvar**: Armazenamento local
- ⬆️ **Enviar**: Sincronização forçada

## 🔄 Modo Offline

O painel funciona mesmo **sem internet**:

1. Dados salvos localmente (IndexedDB)
2. Sincronização automática quando online
3. Indicador visual de status
4. Retry automático em caso de falha

## 📊 Funcionalidades

### Reporte de Quantitativos

```typescript
Exemplo de tarefa:
┌─────────────────────────────────┐
│ 📍 Instalação de Postes 9m      │
│ Status: Em Andamento            │
│ Meta: 15 unidades              │
│ Realizado: 8/15 (53%)          │
│ ▓▓▓▓▓▓▓░░░░░░                  │
│                                 │
│ [Expandir para reportar] ▼     │
└─────────────────────────────────┘

Ao expandir:
┌─────────────────────────────────┐
│ Quantidade Instalada:           │
│ ┌─────────────┬──────────┐     │
│ │     10      │ unidades │     │
│ └─────────────┴──────────┘     │
│                                 │
│ [25%] [50%] [100%]             │
│                                 │
│ Observações:                    │
│ ┌─────────────────────────┐    │
│ │ Texto opcional...       │    │
│ └─────────────────────────┘    │
│                                 │
│ [✓ Confirmar e Salvar]         │
└─────────────────────────────────┘
```

### Evidências Multimídia

```typescript
Foto com marca d'água:
┌─────────────────────────────────┐
│ [Imagem da obra]                │
│                                 │
│ ┌─────────────────────────┐    │
│ │ 13/02/2026 14:30        │    │
│ │ João Silva - Equipe A   │    │
│ │ Obra: Centro            │    │
│ │ GPS: -23.550, -46.633   │    │
│ └─────────────────────────┘    │
└─────────────────────────────────┘
```

## 💬 Sistema de Chat

### Comunicação em Tempo Real

O chat permite comunicação direta entre executor e admin:

```
┌─────────────────────────────────┐
│ 👨‍💼 Admin - Central    📞 📹 │
│ ● Online                        │
├─────────────────────────────────┤
│                                 │
│ 👨‍💼 Como está o andamento?    │
│    08:30                        │
│                                 │
│         Instalamos 10 postes 👷│
│                        08:35 ✓✓│
│                                 │
│ 👨‍💼 Ótimo! Continue assim 👍  │
│    08:37                        │
├─────────────────────────────────┤
│ [📷] [🎤] [📎] [📍]            │
│ ┌───────────────────┬────┐     │
│ │ Digite...         │ ➤  │     │
│ └───────────────────┴────┘     │
└─────────────────────────────────┘
```

### Funcionalidades do Chat

1. **Mensagens de Texto**
   - Digite e envie mensagens instantâneas
   - Confirmação de leitura (✓✓)
   - Timestamps em todas as mensagens

2. **Compartilhamento de Mídia**
   - 📷 Fotos da obra
   - 🎤 Áudios explicativos
   - 📎 Anexos de documentos
   - 📍 Localização GPS

3. **Status e Notificações**
   - Badge vermelho com contador de não lidas
   - Indicador de online/offline
   - Scroll automático para novas mensagens

4. **Design com Cores do Admin**
   - Gradiente cyan-600 to blue-700
   - Consistência visual com painel admin
   - Bolhas de mensagem diferenciadas
   - Avatares com emojis

### Casos de Uso

**Reporte Rápido:**
```
Executor: "8 postes concluídos"
Admin: "Perfeito! Continue"
```

**Envio de Evidências:**
```
Executor: 📸 [Foto do progresso]
Admin: "Ótima qualidade! 👍"
```

**Dúvidas Técnicas:**
```
Executor: "Qual bitola do cabo?"
Admin: "35mm² - Projeto pág 12"
```

**Problemas em Campo:**
```
Executor: 🎤 [Áudio 2:15]
Admin: "Entendi. Envio equipe técnica"
```

## 🚀 Status de Implementação

### ✅ Implementado (Visual)
- Interface mobile completa
- Design responsivo
- Componentes interativos
- Mock de dados
- Fluxos de UX
- **Chat completo com UI** (NOVO!)
- **Badge de notificações** (NOVO!)
- **Diferenciação executor/admin** (NOVO!)

### 🔄 Próximas Implementações
- [ ] Integração real com câmera
- [ ] Gravação de áudio
- [ ] Persistência IndexedDB
- [ ] Sincronização Supabase
- [ ] GPS e geolocalização
- [ ] Compressão de mídia
- [ ] PWA (instalação no device)
- [ ] **WebSocket para chat em tempo real** (NOVO!)
- [ ] **Notificações push do chat** (NOVO!)
- [ ] **Chamadas de voz/vídeo** (NOVO!)

## 📖 Documentação Completa

Para documentação técnica detalhada, veja:
- **[docs/PAINEL_EXECUTOR.md](docs/PAINEL_EXECUTOR.md)**: Documentação completa
- **Tipos**: `src/types/executor.ts`
- **Componente**: `src/components/PainelExecutor.tsx`

## 🎓 Como Testar

1. Inicie o servidor dev:
   ```bash
   npm run dev
   ```

2. Abra em um navegador mobile ou use DevTools:
   - Chrome: F12 → Toggle Device Toolbar (Ctrl+Shift+M)
   - Selecione um dispositivo (ex: iPhone 12 Pro)

3. Acesse:
   ```
   http://localhost:5173/executor/obra-123
   ```

4. Teste as interações:
   - Expanda tarefas
   - Preencha quantitativos
   - Alterne entre tabs
   - Teste botões de ações rápidas
   - Toggle online/offline

## 📱 Simulação de Uso Real

### Cenário 1: Início do Dia
```
1. Executor abre o app no celular
2. Vê lista de 3 tarefas do dia
3. Expande primeira tarefa (Postes)
4. Vê que precisa instalar 15 unidades
```

### Cenário 2: Durante o Trabalho
```
1. Após instalar 8 postes
2. Abre o app
3. Expande a tarefa
4. Digita "8" no campo
5. Adiciona observação: "Terreno estável"
6. Clica em "Confirmar e Salvar"
7. Tira foto do progresso
```

### Cenário 3: Sem Internet
```
1. Conexão cai
2. Header mostra "Modo Offline"
3. Continua reportando normalmente
4. Dados salvos localmente
5. Quando voltar online, sincroniza automaticamente
```

## 🎨 Paleta de Cores

```css
/* Status */
Verde: #10B981  /* Concluída, Online */
Azul: #3B82F6   /* Em Andamento */
Cinza: #6B7280  /* Pendente */
Laranja: #F59E0B /* Offline */
Roxo: #8B5CF6   /* Ações Primárias */

/* Gradientes */
Header: from-indigo-600 to-purple-700
Cards: from-indigo-500 to-purple-600
```

## 📞 Feedback

Sugestões ou problemas? Entre em contato através do módulo de obra.

---

**Desenvolvido para MvOrçaRede**  
Foco em simplicidade e robustez para canteiros de obra 🏗️
