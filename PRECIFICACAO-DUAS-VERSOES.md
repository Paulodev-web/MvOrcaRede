# 💰 Módulo de Precificação - Duas Versões

## 📋 Visão Geral

O Módulo de Precificação agora existe em **duas versões complementares**:

1. **Versão Integrada** (dentro do OrçaRede)
2. **Versão Standalone** (ferramenta independente no painel admin)

---

## 🔄 Versão 1: Integrada ao OrçaRede

### 📍 Localização
```
OrçaRede → Dashboard → Orçamento Finalizado → Botão "Precificar"
```

### 🎯 Propósito
Precificar orçamentos **já criados** no OrçaRede.

### ✨ Características
- ✅ Acessa lista de materiais do orçamento
- ✅ Vinculado a um projeto específico
- ✅ Custo de materiais pré-calculado
- ✅ Contexto completo do orçamento
- ✅ Exporta PDF com referência ao projeto

### 📊 Fluxo de Trabalho
```
1. Criar Orçamento no OrçaRede
   ↓
2. Adicionar Postes e Materiais
   ↓
3. Finalizar Orçamento
   ↓
4. Clicar "Precificar" 💰
   ↓
5. Configurar BDI e Mão de Obra
   ↓
6. Exportar Proposta
```

### 🎨 Interface
- Layout 3 colunas
- Materiais vindos do orçamento
- Foco em BDI e mão de obra
- Contexto do projeto visível

### 💼 Casos de Uso
- Precificar projeto de rede elétrica
- Calcular BDI para orçamento técnico
- Gerar proposta comercial de projeto existente

---

## 🆓 Versão 2: Standalone (Independente)

### 📍 Localização
```
Painel Admin → Dashboard → Card "Módulo de Precificação" 💰
```

### 🎯 Propósito
Fazer cálculos de precificação **avulsos**, sem precisar criar orçamento no OrçaRede.

### ✨ Características
- ✅ Funciona independente do OrçaRede
- ✅ Adicionar itens manualmente
- ✅ Lista de materiais/serviços customizável
- ✅ Útil para orçamentos rápidos
- ✅ Não precisa de projeto vinculado

### 📊 Fluxo de Trabalho
```
1. Abrir Módulo de Precificação
   ↓
2. Adicionar Itens Manualmente
   │  ├─ Descrição
   │  ├─ Quantidade
   │  ├─ Unidade
   │  └─ Valor Unitário
   ↓
3. Configurar Mão de Obra
   ↓
4. Ajustar Parâmetros BDI
   ↓
5. Ver Preço Final em Tempo Real
   ↓
6. Exportar PDF
```

### 🎨 Interface
- Layout 3 colunas
- **Formulário para adicionar itens**
- Lista interativa com remover
- Cálculo automático de subtotais
- Mesmo sistema BDI

### 💼 Casos de Uso
- Orçamento rápido sem projeto
- Cálculo de viabilidade
- Simulações rápidas
- Projetos pequenos/simples
- Consulta comercial express

---

## 🔀 Comparação Lado a Lado

| Aspecto | Versão Integrada | Versão Standalone |
|---------|------------------|-------------------|
| **Acesso** | Dentro do OrçaRede | Painel Admin |
| **Materiais** | Vindos do orçamento | Adicionar manualmente |
| **Contexto** | Projeto específico | Independente |
| **Velocidade** | Média (precisa criar orçamento) | Rápida (direto) |
| **Complexidade** | Alta (projetos grandes) | Baixa (orçamentos simples) |
| **Vinculação** | Sim (ao orçamento) | Não |
| **Uso Principal** | Projetos de rede elétrica | Orçamentos diversos |

---

## 🎯 Quando Usar Cada Uma?

### Use a Versão Integrada quando:
- ✅ Tem um projeto completo de rede elétrica
- ✅ Já criou o orçamento no OrçaRede
- ✅ Precisa de rastreabilidade completa
- ✅ Projeto tem muitos postes e materiais
- ✅ Quer exportar com contexto do projeto

### Use a Versão Standalone quando:
- ✅ Precisa de orçamento rápido
- ✅ Não é projeto de rede elétrica
- ✅ Poucos itens para precificar
- ✅ Quer simular cenários rapidamente
- ✅ Cliente pediu orçamento urgente
- ✅ Não precisa de todo o contexto do OrçaRede

---

## 📱 Ambas as Versões Compartilham:

### ✅ Cálculo BDI Idêntico
- Mesma fórmula
- Mesmos parâmetros
- Mesma precisão

### ✅ Interface Similar
- Sliders interativos
- Card de resumo financeiro
- Composição do preço
- Exportação PDF

### ✅ Valores Padrão
- DF: 5%
- FI: 1,5%
- L: 8%
- I: 13,45%

---

## 🎨 Screenshots Conceituais

### Versão Integrada
```
┌─────────────────────────────────────────┐
│  ← Voltar para Dashboard                │
│  💰 Módulo de Precificação              │
│  Orçamento: Projeto Bairro XYZ          │
│                                         │
│  ┌─────────────────┐  ┌──────────────┐ │
│  │ Materiais       │  │   RESUMO     │ │
│  │ (do orçamento)  │  │              │ │
│  │ ✓ Pré-calculado │  │ PV: R$ XXX   │ │
│  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────┘
```

### Versão Standalone
```
┌─────────────────────────────────────────┐
│  💰 Módulo de Precificação              │
│  (Ferramenta Independente)              │
│                                         │
│  ┌─────────────────┐  ┌──────────────┐ │
│  │ [+ Adicionar]   │  │   RESUMO     │ │
│  │ Item 1: R$ XXX  │  │              │ │
│  │ Item 2: R$ XXX  │  │ PV: R$ XXX   │ │
│  │ Item 3: R$ XXX  │  │              │ │
│  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────┘
```

---

## 🚀 Recursos Exclusivos da Versão Standalone

### 1. Adicionar Itens Manualmente
```typescript
Interface de entrada:
├─ Descrição: [____________]
├─ Quantidade: [___]
├─ Unidade: [UN ▼]
├─ Valor Unit: [R$ ___]
└─ [+ Adicionar]
```

### 2. Lista Editável
- Remover itens individualmente
- Ver subtotais em tempo real
- Adicionar quantos itens quiser

### 3. Tipos de Unidade
- UN (Unidade)
- M (Metro)
- M² (Metro Quadrado)
- M³ (Metro Cúbico)
- KG (Quilograma)
- H (Hora)

---

## 💡 Dicas de Uso

### Para Orçamentos Técnicos Complexos
```
Use a Versão Integrada:
1. Crie projeto no OrçaRede
2. Monte lista técnica completa
3. Finalize e precifique
4. Tenha rastreabilidade total
```

### Para Orçamentos Comerciais Rápidos
```
Use a Versão Standalone:
1. Abra direto do painel admin
2. Adicione itens principais
3. Ajuste BDI rapidamente
4. Exporte em minutos
```

---

## 🎯 Roadmap Futuro

### Integrações Planejadas
- [ ] Importar lista da Versão Standalone para OrçaRede
- [ ] Exportar do OrçaRede para Standalone
- [ ] Biblioteca de itens comuns
- [ ] Templates de BDI por tipo de projeto
- [ ] Histórico unificado

---

## 📚 Documentação

### Versão Integrada
- Ver: `MODULO-PRECIFICACAO.md`
- Componente: `ModuloPrecificacao.tsx`

### Versão Standalone
- Ver: Este documento
- Componente: `PrecificacaoStandalone.tsx`

---

**Duas ferramentas, uma fórmula: Flexibilidade para diferentes necessidades!** 💰⚡
