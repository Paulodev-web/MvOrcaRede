# ⚡ Guia Rápido - Módulo de Precificação

## 🎯 Acesso Rápido (3 Passos)

### 1️⃣ Finalizar Orçamento
```
Dashboard → Selecionar Orçamento → Clicar "Finalizar"
```

### 2️⃣ Acessar Precificação
```
Orçamento Finalizado → Botão "💰 Precificar"
```

### 3️⃣ Configurar e Exportar
```
Ajustar Parâmetros → Exportar PDF
```

---

## 📊 Interface Principal

```
┌─────────────────────────────────────────────────────┐
│  💰 Módulo de Precificação                          │
│  Orçamento: [Nome do Projeto]                       │
│                                      [PDF Cliente]  │
│                                      [PDF Detalhado]│
└─────────────────────────────────────────────────────┘

┌──────────────────────────┐  ┌──────────────────┐
│  💵 CUSTOS DIRETOS       │  │  📊 RESUMO       │
│                          │  │                  │
│  Custo de Materiais      │  │  Custo Total     │
│  [____________] R$       │  │  R$ 50.000,00    │
│                          │  │                  │
│  Mão de Obra (HH)        │  │  BDI             │
│  Horas: [____]           │  │  38,79%          │
│  Valor/H: [____] R$      │  │                  │
│                          │  │  Preço Venda     │
│  Custo Total MO:         │  │  R$ 69.396,53    │
│  R$ 5.000,00             │  │                  │
│                          │  │  Lucro Estimado  │
└──────────────────────────┘  │  R$ 5.551,72     │
                              └──────────────────┘
┌──────────────────────────┐  
│  📐 PARÂMETROS BDI       │  ┌──────────────────┐
│                          │  │  🥧 COMPOSIÇÃO   │
│  Despesas Fixas (DF)     │  │                  │
│  ◄─────●────────► 5.0%   │  │  Materiais       │
│                          │  │  R$ 45.000,00    │
│  Desp. Financeiras (FI)  │  │                  │
│  ◄───●──────────► 1.5%   │  │  Mão de Obra     │
│                          │  │  R$ 5.000,00     │
│  Margem de Lucro (L)     │  │                  │
│  ◄───────●──────► 8.0%   │  │  Desp. Fixas     │
│                          │  │  R$ 3.469,83     │
│  Impostos (I)            │  │                  │
│  ◄──────────●───► 13.45% │  │  ... e mais      │
│                          │  │                  │
│  [Restaurar Padrões]     │  └──────────────────┘
│                          │  
│  ℹ️ Fórmula do BDI:      │  ┌──────────────────┐
│  PV = CD/(1-(DF+FI+L+I)) │  │  💡 DICA         │
└──────────────────────────┘  │  Use os sliders  │
                              │  para simular!   │
                              └──────────────────┘
```

---

## 🎮 Como Usar os Sliders

### Despesas Fixas (0% - 20%)
```
Baixo (3-5%):     Empresa pequena, home office
Médio (5-8%):     Escritório próprio
Alto (8-15%):     Estrutura grande
```

### Despesas Financeiras (0% - 10%)
```
Baixo (1-2%):     À vista, capital próprio
Médio (2-4%):     Parcelado, cartão
Alto (4-8%):      Financiamento bancário
```

### Margem de Lucro (0% - 30%)
```
Mínimo (5-8%):    Competição alta
Médio (8-15%):    Mercado normal
Alto (15-25%):    Especialização
```

### Impostos (0% - 30%)
```
Simples (5-13%):  Simples Nacional
Lucro Pres (13%): Lucro Presumido
Lucro Real (15%): Lucro Real
```

---

## 💡 Cenários Práticos

### 🏃 Orçamento Expresso (5 min)
```
1. Aceitar valores padrão
2. Ajustar só a margem de lucro (slider verde)
3. Clicar "PDF Cliente"
```

### 🎯 Orçamento Preciso (15 min)
```
1. Revisar custo de materiais
2. Calcular HH detalhadamente
3. Ajustar cada slider conforme empresa
4. Simular cenários
5. Clicar "PDF Detalhado"
```

### 🤝 Negociação (10 min)
```
1. Cliente achou caro?
2. Mova o slider de Lucro para esquerda
3. Veja novo preço em tempo real
4. Encontre ponto de equilíbrio
```

---

## 📤 Exportação

### PDF Detalhado (Engenheiro)
```
✓ Lista completa de materiais
✓ Mão de obra detalhada
✓ Cálculos completos
✓ Memória de cálculo
✓ Composição BDI
✓ Observações técnicas
```

### PDF Simplificado (Cliente)
```
✓ Descrição do projeto
✓ Itens principais (agrupados)
✓ Valor total
✓ Prazo e garantias
✓ Forma de pagamento
```

---

## ⚠️ Validações Automáticas

O sistema valida:
- ✅ Soma (DF+FI+L+I) < 100%
- ✅ Todos os valores positivos
- ✅ Custo direto > 0

---

## 🧮 Exemplo Rápido

```
ENTRADA:
├─ Materiais: R$ 45.000,00
├─ Mão Obra: 50h × R$100 = R$ 5.000,00
├─ DF: 5%
├─ FI: 1,5%
├─ L: 8%
└─ I: 13,45%

CÁLCULO:
CD = 45.000 + 5.000 = R$ 50.000
PV = 50.000 / (1 - 0,2795) = R$ 69.396,53
BDI = 38,79%

RESULTADO:
✓ Preço de Venda: R$ 69.396,53
✓ Lucro: R$ 5.551,72
✓ Margem: 8%
```

---

## 🎨 Dicas Visuais

### Cores dos Resultados
- 🟢 **Verde**: Lucro estimado
- 🔵 **Azul**: Preço de venda
- 🟡 **Amarelo**: Alertas
- 🔴 **Vermelho**: Erros

### Sliders Interativos
- Arraste para ajustar
- Valor atualiza em tempo real
- Verde = Lucro (mais importante)

---

## ❓ FAQ Rápido

**P: Posso alterar um orçamento finalizado?**
R: Não, duplique-o primeiro.

**P: Os materiais vêm automaticamente?**
R: Sim, da lista do OrçaRede.

**P: Posso salvar configurações BDI?**
R: Futuro! Por ora use "Restaurar Padrões".

**P: Como escolher margem ideal?**
R: Teste cenários com os sliders!

---

## 🚀 Atalhos

| Ação | Caminho |
|------|---------|
| Voltar | Seta ← no topo |
| PDF Cliente | Botão branco |
| PDF Detalhado | Botão azul |
| Restaurar | Link azul no card BDI |

---

**Precifique com confiança e agilidade!** 💰⚡
