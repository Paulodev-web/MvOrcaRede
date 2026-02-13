# 🎯 Painel Administrativo Multi-Ferramentas

## 📋 Visão Geral

O projeto agora foi reestruturado em um **Painel Administrativo Modular** que permite gerenciar múltiplas ferramentas em um único lugar. O OrçaRede é a primeira ferramenta integrada, e você pode adicionar quantas ferramentas quiser!

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── AdminLayout.tsx          # Layout principal do painel admin
│   ├── AdminDashboard.tsx       # Dashboard com visão geral
│   ├── ToolsManagement.tsx      # Gerenciamento de ferramentas
│   ├── AdminSettings.tsx        # Configurações do painel
│   ├── Layout.tsx               # Layout do OrçaRede
│   └── [outros componentes...]  # Componentes do OrçaRede
├── types/
│   └── tools.ts                 # Definições de ferramentas
└── App.tsx                      # Roteamento principal
```

## 🌐 Rotas Disponíveis

### Painel Administrativo
- `/admin` - Dashboard principal
- `/admin/tools` - Gerenciamento de ferramentas
- `/admin/settings` - Configurações do painel

### Ferramentas
- `/tools/orcared` - Ferramenta OrçaRede

## ➕ Como Adicionar uma Nova Ferramenta

### Passo 1: Definir a Ferramenta

Edite o arquivo `src/types/tools.ts` e adicione sua ferramenta no array `AVAILABLE_TOOLS`:

```typescript
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
  // 👇 ADICIONE SUA NOVA FERRAMENTA AQUI
  {
    id: 'minha-ferramenta',
    name: 'Minha Ferramenta',
    description: 'Descrição da minha ferramenta',
    icon: '🚀',
    color: 'from-purple-500 to-purple-700',
    route: '/tools/minha-ferramenta',
    enabled: true,
    version: '1.0.0',
    category: 'productivity',
  },
];
```

### Passo 2: Criar o Componente da Ferramenta

Crie um novo componente em `src/components/`:

```tsx
// src/components/MinhaFerramenta.tsx
import React from 'react';

export function MinhaFerramenta() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold">Minha Ferramenta</h1>
      <p>Conteúdo da ferramenta aqui...</p>
    </div>
  );
}
```

### Passo 3: Adicionar a Rota

Edite `src/App.tsx` e adicione a rota da nova ferramenta:

```tsx
import { MinhaFerramenta } from './components/MinhaFerramenta';

// ... dentro do componente App

<Route path="/tools/minha-ferramenta" element={
  <MinhaFerramenta />
} />
```

## 📊 Categorias Disponíveis

- `finance` - Financeiro (verde)
- `productivity` - Produtividade (azul)
- `analytics` - Análise (roxo)
- `utilities` - Utilitários (laranja)
- `other` - Outros (cinza)

## 🎨 Cores de Gradiente

Você pode usar qualquer gradiente do Tailwind CSS:

```typescript
// Exemplos de cores
color: 'from-blue-500 to-blue-700'     // Azul
color: 'from-green-500 to-green-700'   // Verde
color: 'from-purple-500 to-purple-700' // Roxo
color: 'from-red-500 to-red-700'       // Vermelho
color: 'from-yellow-500 to-yellow-700' // Amarelo
color: 'from-pink-500 to-pink-700'     // Rosa
```

## ✨ Recursos do Painel

### Dashboard Principal
- Visão geral de todas as ferramentas
- Estatísticas de ferramentas ativas
- Cards clicáveis para acesso rápido
- Design moderno e responsivo

### Gerenciamento de Ferramentas
- Lista completa de todas as ferramentas
- Status (ativo/inativo)
- Versão de cada ferramenta
- Categorização por tipo
- Acesso direto às ferramentas

### Configurações
- Configurações gerais do painel
- Personalização de aparência
- Notificações
- Segurança
- Banco de dados
- API & Integrações

## 🚀 Exemplo Completo: Adicionar Calculadora

```typescript
// 1. Em src/types/tools.ts
{
  id: 'calculator',
  name: 'Calculadora Financeira',
  description: 'Calculadora para análise financeira e ROI',
  icon: '🧮',
  color: 'from-green-500 to-emerald-700',
  route: '/tools/calculator',
  enabled: true,
  version: '1.0.0',
  category: 'finance',
}
```

```tsx
// 2. Criar src/components/Calculator.tsx
import React, { useState } from 'react';

export function Calculator() {
  const [result, setResult] = useState(0);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Calculadora Financeira</h1>
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Seu conteúdo aqui */}
        </div>
      </div>
    </div>
  );
}
```

```tsx
// 3. Em src/App.tsx, adicionar a rota
import { Calculator } from './components/Calculator';

// Dentro de <Routes>
<Route path="/tools/calculator" element={<Calculator />} />
```

## 📱 Responsividade

O painel é totalmente responsivo e funciona perfeitamente em:
- Desktop (1920px+)
- Laptop (1024px+)
- Tablet (768px+)
- Mobile (320px+)

## 🎯 Próximos Passos

1. **Adicione suas próprias ferramentas** seguindo o guia acima
2. **Personalize o visual** do painel em `AdminSettings`
3. **Configure integrações** entre ferramentas
4. **Adicione autenticação** se necessário
5. **Implemente persistência** de configurações

## 💡 Dicas

- Mantenha os ícones consistentes usando emojis ou ícones do lucide-react
- Use cores que façam sentido para a categoria da ferramenta
- Adicione versões para rastrear atualizações
- Documente cada ferramenta com um README próprio
- Use o `ErrorBoundary` para capturar erros isolados

## 🔧 Tecnologias Utilizadas

- React 18
- TypeScript
- React Router v6
- Tailwind CSS
- Lucide React (ícones)
- Vite

---

**Criado com ❤️ para facilitar o gerenciamento de múltiplas ferramentas em um único painel!**
