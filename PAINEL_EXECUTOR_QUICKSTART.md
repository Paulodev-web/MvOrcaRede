# Painel Executor - Guia Rápido

## 🎯 O que é o Painel Executor?

Interface mobile-first para executores em campo registrarem o andamento de obras em tempo real, mesmo offline.

## 🚀 Como Acessar

### 1. Desenvolvimento Local

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse no navegador:
```
http://localhost:5173/executor/obra-123
```

### 2. Em Dispositivo Móvel (Rede Local)

1. Descubra o IP da sua máquina:
   - Windows: `ipconfig` (procure por IPv4)
   - Mac/Linux: `ifconfig` ou `ip addr`

2. No dispositivo móvel, acesse:
```
http://[SEU_IP]:5173/executor/obra-123
```

Exemplo:
```
http://192.168.1.100:5173/executor/obra-123
```

### 3. Teste Mobile-First no Desktop

Use as ferramentas de desenvolvedor do navegador:

**Chrome:**
- Pressione `F12` ou `Ctrl+Shift+I`
- Clique no ícone de dispositivo móvel (ou `Ctrl+Shift+M`)
- Selecione um dispositivo (ex: iPhone 12, Pixel 5)

**Firefox:**
- Pressione `F12`
- Clique no ícone de "Design Responsivo"
- Selecione um tamanho de tela mobile

## 📱 Interface Atual

### Funcionalidades Visuais Implementadas:

✅ **Header com Status de Conexão**
- Indicador Online/Offline
- Informações da obra
- Data, horário e setor

✅ **Resumo Rápido**
- Tarefas em progresso
- Tarefas concluídas
- Tarefas pendentes

✅ **Lista de Tarefas**
- Cards expansíveis
- Status visual (pendente, em progresso, concluída)
- Barra de progresso
- Informações do material

✅ **Reporte de Quantitativos**
- Campo numérico grande para facilitar digitação
- Indicação da unidade
- Botão de salvar
- Mensagem informativa sobre salvamento local

✅ **Captura de Evidências**
- Botões grandes e visuais para:
  - 📷 Tirar foto (com marca d'água)
  - 🎤 Gravar áudio
  - 🖼️ Selecionar da galeria
  - 📤 Upload de documentos
- Preview de evidências anexadas
- Indicador de status de sincronização

✅ **Sincronização Offline**
- Badge com quantidade de atualizações pendentes
- Mensagem de alerta quando offline

## 🎨 Design Mobile-First

### Características:

- **Botões Grandes:** Fáceis de tocar, mesmo com luvas
- **Contraste Alto:** Legível sob luz solar
- **Navegação Simples:** Mínimo de cliques
- **Feedback Visual:** Estados claros para todas as ações
- **Cores Intuitivas:**
  - 🔵 Azul: Em progresso
  - 🟢 Verde: Concluído
  - ⚪ Cinza: Pendente
  - 🟠 Laranja: Offline
  - 🔴 Vermelho: Erro/Urgente

## 🛠️ Funcionalidades Pendentes de Implementação

Consulte o arquivo completo de documentação: `docs/PAINEL_EXECUTOR.md`

### Principais Features a Implementar:

1. **Câmera Integrada com Marca d'Água**
   - Captura usando MediaDevices API
   - Adição de marca d'água com canvas
   - Metadados GPS automáticos

2. **Gravação de Áudio**
   - MediaRecorder API
   - Compressão automática
   - Playback antes de enviar

3. **Sincronização Offline**
   - IndexedDB para cache local
   - Service Workers
   - Background Sync API
   - Fila de operações pendentes

4. **Integração com Supabase**
   - Upload de arquivos
   - Storage de evidências
   - Tabelas de quantitativos e tarefas

## 🧪 Como Testar

### Teste de Interface Mobile:

1. Abra o painel no navegador com DevTools mobile
2. Teste a expansão/colapso dos cards de tarefa
3. Insira quantitativos nos campos numéricos
4. Clique nos botões de captura de evidências
5. Observe o indicador de status online/offline

### Teste de Responsividade:

Teste em diferentes resoluções:
- 📱 Mobile Small: 320px
- 📱 Mobile: 375px
- 📱 Mobile Large: 425px
- 📱 Tablet: 768px

### Simular Estado Offline:

**Chrome DevTools:**
1. Abra DevTools (`F12`)
2. Aba "Network"
3. Dropdown "No throttling" → Selecione "Offline"

**Firefox:**
1. Menu → Web Developer → Network
2. Marque "Offline"

Após colocar em modo offline, observe:
- Badge "Offline" no header
- Mensagem de atualizações pendentes

## 📁 Estrutura de Arquivos

```
src/
├── components/
│   ├── PainelExecutor.tsx       # Componente principal
│   ├── ModuloObra.tsx            # Painel de gestão (desktop)
│   └── ...
├── types/
│   └── executor.ts               # Tipos TypeScript completos
└── ...

docs/
└── PAINEL_EXECUTOR.md            # Documentação completa

PAINEL_EXECUTOR_QUICKSTART.md     # Este arquivo
```

## 🔗 Rotas

| Rota | Descrição |
|------|-----------|
| `/admin` | Painel administrativo |
| `/tools/obra` | Módulo de obra (gestão desktop) |
| `/executor/:obraId` | **Painel Executor (mobile)** |
| `/portal/:obraId` | Portal público do cliente |

## 📸 Screenshots Esperados

### Mobile View (375px)
- Header compacto com info da obra
- Cards de tarefa expansíveis
- Botões grandes de evidência
- Fácil digitação de quantitativos

### Tablet View (768px)
- Layout mais espaçoso
- Dois cards lado a lado
- Mesma funcionalidade

## 🐛 Troubleshooting

### Problema: Rota não encontrada
**Solução:** Certifique-se de que:
- O servidor está rodando (`npm run dev`)
- A URL está correta: `/executor/obra-123`
- O import no App.tsx está correto

### Problema: Layout quebrado no mobile
**Solução:**
- Use DevTools mobile mode
- Verifique se há erros no console
- Limpe o cache do navegador

### Problema: Indicador offline não aparece
**Solução:**
- Estado é mockado (hardcoded como `true`)
- Para testar offline, edite o componente e mude:
```tsx
const [isOnline, setIsOnline] = useState(false);
```

## 🚧 Próximas Implementações

Prioridade de desenvolvimento:

1. ⚡ **Alta:** Armazenamento local (IndexedDB)
2. ⚡ **Alta:** Integração com câmera
3. ⚡ **Alta:** Sincronização básica com Supabase
4. 🔹 **Média:** Gravação de áudio
5. 🔹 **Média:** Marca d'água automática
6. 🔹 **Média:** Geolocalização GPS
7. 🔸 **Baixa:** Notificações push
8. 🔸 **Baixa:** Modo escuro

## 📞 Links Úteis

- 📖 [Documentação Completa](./docs/PAINEL_EXECUTOR.md)
- 🎨 [Lucide Icons](https://lucide.dev/) - Ícones usados
- ⚛️ [React Router](https://reactrouter.com/) - Roteamento
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - Estilização

## 💡 Dicas para Desenvolvimento

1. **Sempre teste no mobile primeiro** - É um painel mobile-first
2. **Use o DevTools Network tab** - Para simular conexões lentas
3. **Teste com diferentes tamanhos de tela** - Responsive design
4. **Considere o uso com luvas** - Botões grandes
5. **Pense em luz solar** - Contraste alto

## ✅ Checklist de Implementação Futura

- [ ] Configurar IndexedDB
- [ ] Implementar Service Worker
- [ ] Integrar MediaDevices API (câmera)
- [ ] Integrar MediaRecorder API (áudio)
- [ ] Adicionar marca d'água em fotos
- [ ] Implementar fila de sincronização
- [ ] Criar API Supabase para upload
- [ ] Adicionar geolocalização
- [ ] Implementar retry com backoff
- [ ] Criar sistema de notificações
- [ ] Adicionar testes E2E
- [ ] Otimizar performance
- [ ] Documentar APIs

---

**Criado em:** 13 de Fevereiro de 2026  
**Versão:** 1.0 (Interface Visual)  
**Status:** ✅ Interface Completa | 🚧 Funcionalidades Pendentes
