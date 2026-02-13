# 🛠️ Exemplos de Ferramentas para Adicionar

Este documento contém exemplos práticos de ferramentas que você pode adicionar ao painel administrativo.

## 📊 1. Dashboard de Análise

Uma ferramenta para visualizar métricas e KPIs em tempo real.

### Configuração (tools.ts)
```typescript
{
  id: 'analytics-dashboard',
  name: 'Dashboard de Análise',
  description: 'Visualize métricas e KPIs em tempo real',
  icon: '📊',
  color: 'from-purple-500 to-purple-700',
  route: '/tools/analytics',
  enabled: true,
  version: '1.0.0',
  category: 'analytics',
}
```

### Componente Base
```tsx
// src/components/AnalyticsDashboard.tsx
import React from 'react';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

export function AnalyticsDashboard() {
  const metrics = [
    { label: 'Receita Total', value: 'R$ 125.000', icon: DollarSign, change: '+12%' },
    { label: 'Usuários Ativos', value: '1.234', icon: Users, change: '+8%' },
    { label: 'Taxa de Conversão', value: '3.2%', icon: TrendingUp, change: '+2.1%' },
    { label: 'Projetos Ativos', value: '45', icon: Activity, change: '+15%' },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard de Análise</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div key={idx} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="h-8 w-8 text-purple-600" />
                  <span className="text-green-600 text-sm font-medium">{metric.change}</span>
                </div>
                <p className="text-gray-600 text-sm">{metric.label}</p>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

---

## 📝 2. Sistema de Tarefas

Gerenciador de tarefas e projetos estilo Kanban.

### Configuração (tools.ts)
```typescript
{
  id: 'task-manager',
  name: 'Gerenciador de Tarefas',
  description: 'Organize tarefas e projetos em quadros Kanban',
  icon: '✅',
  color: 'from-green-500 to-emerald-700',
  route: '/tools/tasks',
  enabled: true,
  version: '1.0.0',
  category: 'productivity',
}
```

### Componente Base
```tsx
// src/components/TaskManager.tsx
import React, { useState } from 'react';
import { Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export function TaskManager() {
  const [tasks] = useState([
    { id: 1, title: 'Revisar código', status: 'todo', priority: 'high' },
    { id: 2, title: 'Fazer deploy', status: 'in-progress', priority: 'medium' },
    { id: 3, title: 'Documentar API', status: 'done', priority: 'low' },
  ]);

  const columns = [
    { id: 'todo', name: 'A Fazer', icon: Clock, color: 'bg-gray-100' },
    { id: 'in-progress', name: 'Em Progresso', icon: AlertCircle, color: 'bg-blue-100' },
    { id: 'done', name: 'Concluído', icon: CheckCircle, color: 'bg-green-100' },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Gerenciador de Tarefas</h1>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Tarefa
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(column => {
            const Icon = column.icon;
            return (
              <div key={column.id} className={`${column.color} rounded-xl p-4`}>
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="h-5 w-5" />
                  <h2 className="font-semibold">{column.name}</h2>
                </div>
                <div className="space-y-3">
                  {tasks.filter(t => t.status === column.id).map(task => (
                    <div key={task.id} className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="font-medium">{task.title}</p>
                      <span className={`text-xs px-2 py-1 rounded mt-2 inline-block ${
                        task.priority === 'high' ? 'bg-red-100 text-red-700' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

---

## 💰 3. Controle Financeiro

Sistema para gestão financeira pessoal ou empresarial.

### Configuração (tools.ts)
```typescript
{
  id: 'finance-control',
  name: 'Controle Financeiro',
  description: 'Gerencie receitas, despesas e fluxo de caixa',
  icon: '💰',
  color: 'from-emerald-500 to-green-700',
  route: '/tools/finance',
  enabled: true,
  version: '1.0.0',
  category: 'finance',
}
```

### Componente Base
```tsx
// src/components/FinanceControl.tsx
import React from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export function FinanceControl() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Controle Financeiro</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Receitas</p>
                <p className="text-2xl font-bold text-green-600">R$ 45.230</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Despesas</p>
                <p className="text-2xl font-bold text-red-600">R$ 32.150</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Wallet className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Saldo</p>
                <p className="text-2xl font-bold text-blue-600">R$ 13.080</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Transações Recentes</h2>
          <div className="space-y-3">
            {/* Adicione sua lista de transações aqui */}
            <p className="text-gray-500 text-center py-8">
              Nenhuma transação para exibir
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 📅 4. Agenda/Calendário

Sistema de agendamento e compromissos.

### Configuração (tools.ts)
```typescript
{
  id: 'calendar',
  name: 'Agenda',
  description: 'Gerencie compromissos e reuniões',
  icon: '📅',
  color: 'from-orange-500 to-red-700',
  route: '/tools/calendar',
  enabled: true,
  version: '1.0.0',
  category: 'productivity',
}
```

---

## 🗂️ 5. Gerenciador de Arquivos

Upload, organização e compartilhamento de arquivos.

### Configuração (tools.ts)
```typescript
{
  id: 'file-manager',
  name: 'Gerenciador de Arquivos',
  description: 'Organize e compartilhe arquivos',
  icon: '🗂️',
  color: 'from-cyan-500 to-blue-700',
  route: '/tools/files',
  enabled: true,
  version: '1.0.0',
  category: 'utilities',
}
```

---

## 📧 6. Centro de Notificações

Sistema centralizado de notificações e alertas.

### Configuração (tools.ts)
```typescript
{
  id: 'notifications',
  name: 'Centro de Notificações',
  description: 'Gerencie todas as notificações do sistema',
  icon: '🔔',
  color: 'from-yellow-500 to-orange-700',
  route: '/tools/notifications',
  enabled: true,
  version: '1.0.0',
  category: 'utilities',
}
```

---

## 👥 7. CRM Simples

Sistema de gestão de relacionamento com clientes.

### Configuração (tools.ts)
```typescript
{
  id: 'crm',
  name: 'CRM',
  description: 'Gestão de clientes e relacionamento',
  icon: '👥',
  color: 'from-indigo-500 to-purple-700',
  route: '/tools/crm',
  enabled: true,
  version: '1.0.0',
  category: 'productivity',
}
```

---

## 📊 8. Relatórios

Gerador de relatórios personalizados.

### Configuração (tools.ts)
```typescript
{
  id: 'reports',
  name: 'Relatórios',
  description: 'Gere relatórios personalizados e exportações',
  icon: '📈',
  color: 'from-pink-500 to-rose-700',
  route: '/tools/reports',
  enabled: true,
  version: '1.0.0',
  category: 'analytics',
}
```

---

## 🚀 Como Usar Estes Exemplos

1. **Copie a configuração** do `tools.ts` para o array `AVAILABLE_TOOLS`
2. **Crie o componente** na pasta `src/components/`
3. **Adicione a rota** no `App.tsx`:
   ```tsx
   <Route path="/tools/[nome-da-ferramenta]" element={<SeuComponente />} />
   ```
4. **Personalize** conforme suas necessidades

## 💡 Dicas de Desenvolvimento

- Use **Tailwind CSS** para estilização rápida e consistente
- Aproveite os **ícones do Lucide React** para uma UI profissional
- Mantenha os componentes **modulares e reutilizáveis**
- Adicione **tratamento de erros** com ErrorBoundary
- Use **TypeScript** para type safety
- Implemente **responsividade** desde o início

---

**Escolha as ferramentas que fazem sentido para seu negócio e comece a construir!** 🎉
