# 🎨 Guia Visual do Chat Executor-Admin

## Paleta de Cores

### Cores do Painel Admin
O chat utiliza as mesmas cores do painel administrativo para manter consistência visual:

```css
/* Gradientes Principais */
background: linear-gradient(to right, #0891b2, #1d4ed8);
/* cyan-600: #0891b2 */
/* blue-700: #1d4ed8 */

/* Estados */
hover: from-cyan-700 to-blue-800
active: scale(0.95)

/* Backgrounds */
cyan-50:  #ecfeff   /* Light backgrounds */
cyan-100: #cffafe   /* Hover states */
cyan-600: #0891b2   /* Primary color */
cyan-700: #0e7490   /* Hover */

blue-600: #2563eb
blue-700: #1d4ed8
blue-800: #1e40af

/* Status */
green-400: #4ade80  /* Online */
red-500:   #ef4444  /* Notifications badge */
```

## Layout Completo do Chat

```
┌─────────────────────────────────────────────────┐
│  Header do Chat (cyan-600 to blue-700)         │
│  ┌────────────────────────────────────────┐   │
│  │ 👨‍💼 Admin - Central        📞  📹   │   │
│  │ ● Online                              │   │
│  └────────────────────────────────────────┘   │
├─────────────────────────────────────────────────┤
│  Info Banner (cyan-50)                          │
│  💬 Chat direto com a equipe administrativa    │
├─────────────────────────────────────────────────┤
│                                                 │
│  Área de Mensagens (bg-gray-50)                │
│  ┌──────────────────────────────────────┐     │
│  │                                       │     │
│  │  ┌──────────────────┐                │     │
│  │  │ 👨‍💼 Mensagem     │                │     │
│  │  │    do Admin      │                │     │
│  │  └──────────────────┘                │     │
│  │       08:30                           │     │
│  │                                       │     │
│  │                ┌──────────────────┐  │     │
│  │                │   Mensagem do    │  │     │
│  │                │   Executor    👷│  │     │
│  │                └──────────────────┘  │     │
│  │                           08:35 ✓✓  │     │
│  │                                       │     │
│  │  ┌──────────────────┐                │     │
│  │  │ 👨‍💼 Outra        │                │     │
│  │  │    mensagem      │                │     │
│  │  └──────────────────┘                │     │
│  │       08:37                           │     │
│  │                                       │     │
│  │                ┌──────────────────┐  │     │
│  │                │  📸 [Imagem]     │  │     │
│  │                │  anexada      👷│  │     │
│  │                └──────────────────┘  │     │
│  │                           10:15 ✓✓  │     │
│  │                                       │     │
│  └──────────────────────────────────────┘     │
│                                                 │
├─────────────────────────────────────────────────┤
│  Input de Mensagem (bg-white)                  │
│  ┌──────────────────────────────────────┐     │
│  │ [📷] [🎤] [📎] [📍]                  │     │
│  │                                       │     │
│  │ ┌───────────────────────────┬──────┐│     │
│  │ │ Digite sua mensagem...    │  ➤   ││     │
│  │ └───────────────────────────┴──────┘│     │
│  │                                       │     │
│  │ 💡 Use o áudio para mensagens        │     │
│  │    mais detalhadas                   │     │
│  └──────────────────────────────────────┘     │
└─────────────────────────────────────────────────┘
```

## Componentes Detalhados

### 1. Header do Chat

```
┌─────────────────────────────────────────┐
│ Gradiente: cyan-600 → blue-700         │
│ Texto: Branco                           │
│ Padding: 1rem                           │
│                                         │
│ ┌────┐  Admin - Central      [📞][📹]│
│ │👨‍💼│  ● Online                       │
│ └────┘                                  │
│  Avatar  Nome + Status   Ações         │
└─────────────────────────────────────────┘

Elementos:
- Avatar: 2.5rem circular, bg-white/20
- Nome: font-semibold, text-sm
- Status: text-xs, green-400 dot + "Online"
- Botões: hover:bg-white/10, rounded-lg
```

### 2. Bolha de Mensagem - Admin (Esquerda)

```
┌─────────────────────────────────┐
│ 👨‍💼                              │  Avatar (esquerda)
│     ┌─────────────────────┐     │  
│     │ Como está a obra?   │     │  Bolha branca
│     │                     │     │  border: 1px gray-200
│     └─────────────────────┘     │  rounded-2xl
│          08:30                   │  Timestamp
└─────────────────────────────────┘

Estilos da Bolha:
- background: white
- color: gray-900
- border: 1px solid #e5e7eb
- border-radius: 1rem
- border-top-left-radius: 0.25rem (ponta)
- padding: 0.75rem 1rem
- box-shadow: 0 1px 3px rgba(0,0,0,0.1)
```

### 3. Bolha de Mensagem - Executor (Direita)

```
┌─────────────────────────────────┐
│                              👷│  Avatar (direita)
│     ┌─────────────────────┐     │
│     │ Instalamos 8 postes │     │  Bolha gradiente
│     │                     │     │  cyan-600 → blue-700
│     └─────────────────────┘     │  rounded-2xl
│                    08:35 ✓✓     │  Timestamp + Status
└─────────────────────────────────┘

Estilos da Bolha:
- background: linear-gradient(to right, #0891b2, #1d4ed8)
- color: white
- border-radius: 1rem
- border-top-right-radius: 0.25rem (ponta)
- padding: 0.75rem 1rem
- box-shadow: 0 2px 8px rgba(8,145,178,0.3)

Confirmação de Leitura:
- ✓ = Enviada (gray)
- ✓✓ = Lida (cyan-600)
```

### 4. Mensagem com Imagem

```
┌─────────────────────────────────┐
│                              👷│
│     ┌─────────────────────┐     │
│     │ Seguem fotos...     │     │
│     │                     │     │
│     │ ┌─────────────────┐│     │
│     │ │ 📷 IMG_001.jpg  ││     │
│     │ │ [Imagem preview]││     │
│     │ │                 ││     │
│     │ └─────────────────┘│     │
│     └─────────────────────┘     │
│                    10:15 ✓✓     │
└─────────────────────────────────┘

Preview da Imagem:
- Container: bg-white/10 (executor) ou bg-gray-100 (admin)
- Border: border-white/20 ou border-gray-200
- Padding: 0.75rem
- Rounded: rounded-lg
```

### 5. Mensagem com Áudio

```
┌─────────────────────────────────┐
│                              👷│
│     ┌─────────────────────┐     │
│     │ ┌──────────────────┐│     │
│     │ │ ⏯  ───────●────  ││     │
│     │ │    Áudio sobre   ││     │
│     │ │    material 1:23 ││     │
│     │ └──────────────────┘│     │
│     └─────────────────────┘     │
│                    11:45 ✓✓     │
└─────────────────────────────────┘

Player de Áudio:
- Botão Play: circular, bg-white/20 ou bg-cyan-100
- Barra de Progresso: bg-white/20 ou bg-gray-300
- Progresso: bg-white ou bg-cyan-600
- Duração: text-xs, opacity-75
```

### 6. Input de Mensagem

```
┌─────────────────────────────────┐
│                                 │
│  Botões de Anexo               │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐          │
│  │📷│ │🎤│ │📎│ │📍│          │
│  └──┘ └──┘ └──┘ └──┘          │
│                                 │
│  Input Principal + Enviar      │
│  ┌──────────────────────┬────┐│
│  │ Digite...            │ ➤  ││
│  └──────────────────────┴────┘│
│                                 │
│  💡 Dica contextual            │
└─────────────────────────────────┘

Botões de Anexo:
- Size: 2.5rem × 2.5rem
- Padding: 0.5rem
- Hover: bg-cyan-50
- Color: text-cyan-600
- Rounded: rounded-lg

Input:
- Border: 2px solid gray-300
- Focus: border-cyan-500, ring-4 ring-cyan-200
- Rounded: rounded-xl
- Padding: 0.75rem 1rem

Botão Enviar:
- Background: gradient cyan-600 → blue-700
- Hover: cyan-700 → blue-800
- Disabled: gray-300 → gray-400
- Active: scale-95
- Rounded: rounded-xl
```

### 7. Badge de Notificações

```
Aba do Chat com Badge:
┌────────────────────┐
│  💬 Chat      [3]  │  ← Badge vermelho
└────────────────────┘

Badge:
- Position: absolute, top-right
- Size: 1.25rem circular
- Background: red-500
- Color: white
- Font: text-xs, font-bold
- Shadow: shadow-lg
```

### 8. Indicador de Status

```
Online:
┌──────────────┐
│ ● Online     │  ← green-400 dot + texto
└──────────────┘

Offline:
┌──────────────┐
│ ○ Offline    │  ← gray-400 dot + texto
└──────────────┘

Typing (futuro):
┌────────────────────────┐
│ Admin está digitando...│  ← cyan-600, animado
└────────────────────────┘
```

## Animações e Transições

### 1. Envio de Mensagem
```
1. Mensagem aparece no bottom (opacity: 0 → 1)
2. Scroll automático suave para o fim
3. Indicador ✓ aparece
4. Após confirmação: ✓✓ em cyan-600
```

### 2. Recebimento de Mensagem
```
1. Nova mensagem desliza da esquerda
2. Badge incrementa (se chat não está aberto)
3. Scroll automático
4. Notificação sonora (futuro)
```

### 3. Hover nos Botões
```
transition: all 0.2s ease
hover: background-color, scale
active: scale(0.95)
```

### 4. Abertura do Chat
```
- Fade in da área de mensagens
- Badge desaparece (fade out)
- Scroll para última mensagem
- Marca mensagens como lidas
```

## Responsividade

### Mobile (< 768px)
```
- Chat ocupa 100% da largura
- Input fixo no bottom
- Mensagens max-width: 75%
- Botões de anexo: scroll horizontal
- Font-size: 0.875rem (14px)
```

### Tablet (768px - 1024px)
```
- Chat max-width: 600px
- Mensagens max-width: 70%
- Botões maiores
- Font-size: 1rem (16px)
```

### Desktop (> 1024px)
```
- Chat max-width: 800px
- Sidebar lateral (futuro)
- Mensagens max-width: 60%
- Hover states mais elaborados
```

## Estados de Interação

### Normal
```
- Scroll habilitado
- Input focável
- Botões clicáveis
```

### Enviando Mensagem
```
- Input desabilitado temporariamente
- Botão Enviar com loading spinner
- Mensagem com ⏳ indicator
```

### Offline
```
- Header mostra "Offline"
- Banner de aviso aparece
- Mensagens ficam na fila
- Botão "Tentar Novamente" aparece
```

### Erro
```
- Mensagem com ❌ indicator
- Background vermelho claro
- Botão "Tentar Novamente"
- Toast de erro
```

## Acessibilidade

### Contraste
```
- Texto branco em cyan-600: WCAG AAA ✓
- Texto gray-900 em white: WCAG AAA ✓
- Ícones: mínimo 4.5:1 ✓
```

### Touch Targets
```
- Botões: 44px × 44px mínimo ✓
- Input: altura 48px ✓
- Bolhas: padding adequado ✓
```

### Screen Readers
```
- Alt text em ícones
- Aria-labels nos botões
- Role="log" na área de mensagens
- Aria-live para novas mensagens
```

## Exemplos de Uso Visual

### Conversa Típica
```
08:30 Admin:  "Como está o andamento?"
08:35 Exec:   "Instalamos 8 postes"
08:37 Admin:  "Ótimo progresso!"
10:15 Exec:   📸 [Foto dos postes]
10:20 Admin:  "Perfeito! Continue 👍"
11:45 Exec:   🎤 [Áudio 1:23]
12:00 Admin:  "Vou providenciar material"
```

### Reporte de Problema
```
11:00 Exec:   "Problema no poste 8"
11:01 Exec:   📸 [Foto do problema]
11:02 Admin:  "Vejo o problema"
11:03 Admin:  "Pode fazer X Y Z?"
11:05 Exec:   "Sim, vou fazer agora"
11:30 Exec:   📸 [Foto resolvido]
11:31 Admin:  "Perfeito! Resolvido ✓"
```

### Coordenação Logística
```
14:00 Admin:  "Material sai em 30min"
14:01 Exec:   "Ok, estarei no local"
14:02 Exec:   📍 [Localização]
14:30 Admin:  "Caminhão a 5km"
14:45 Exec:   "Material recebido 👍"
14:46 Admin:  "Ótimo! Bom trabalho"
```

---

**Desenvolvido para MvOrçaRede**  
Design System baseado em Tailwind CSS  
Cores do Admin: cyan-600 to blue-700
