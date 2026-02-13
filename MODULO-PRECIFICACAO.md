# 💰 Módulo de Precificação - OrçaRede

## 📋 Visão Geral

O **Módulo de Precificação** é uma extensão integrada ao OrçaRede que transforma listas técnicas de materiais em orçamentos comerciais viáveis, aplicando inteligência de custos através do cálculo automatizado de BDI (Benefícios e Despesas Indiretas).

## 🎯 Objetivo

Permitir que engenheiros e orçamentistas convertam rapidamente uma lista de materiais em um preço de venda final, considerando todos os custos indiretos, impostos, despesas fixas e margem de lucro desejada.

## 🔄 Fluxo de Trabalho

```
1. Criar Orçamento no OrçaRede
   ↓
2. Adicionar Postes e Materiais
   ↓
3. Finalizar Orçamento
   ↓
4. Clicar em "Precificar" ⭐
   ↓
5. Configurar Parâmetros BDI
   ↓
6. Simular Margens
   ↓
7. Exportar PDF (Detalhado ou Simplificado)
```

## 🧮 Fórmula do BDI

O módulo utiliza a fórmula padrão de BDI:

```
PV = CD / (1 - (DF + FI + L + I))
```

Onde:
- **PV** = Preço de Venda
- **CD** = Custo Direto (Materiais + Mão de Obra)
- **DF** = Despesas Fixas (%)
- **FI** = Despesas Financeiras (%)
- **L** = Lucro (%)
- **I** = Impostos (%)

### Exemplo Prático

```
Custo Direto: R$ 50.000,00
Despesas Fixas: 5%
Despesas Financeiras: 1,5%
Lucro: 8%
Impostos: 13,45%

PV = 50.000 / (1 - (0,05 + 0,015 + 0,08 + 0,1345))
PV = 50.000 / (1 - 0,2795)
PV = 50.000 / 0,7205
PV = R$ 69.396,53

BDI = ((69.396,53 - 50.000) / 50.000) × 100
BDI = 38,79%
```

## 📊 Componentes do Módulo

### 1. Entrada de Dados

#### Custos Diretos
- **Custo de Materiais**: Calculado automaticamente da lista do OrçaRede
- **Mão de Obra**: 
  - Quantidade de Horas Estimadas
  - Valor por Hora (R$/HH)
  - Cálculo automático do custo total

#### Parâmetros BDI (Sliders Interativos)
- **Despesas Fixas (DF)**: 0% a 20%
  - Aluguel, água, luz, internet
  - Salários administrativos
  - Depreciação de equipamentos
  
- **Despesas Financeiras (FI)**: 0% a 10%
  - Juros bancários
  - Taxas de cartão
  - Custos de capital de giro

- **Margem de Lucro (L)**: 0% a 30%
  - Lucro líquido desejado
  - Retorno sobre investimento

- **Impostos (I)**: 0% a 30%
  - ISS (5% típico)
  - PIS (0,65%)
  - COFINS (3%)
  - Outros tributos federais

### 2. Resultados em Tempo Real

#### Resumo Financeiro (Card Destaque)
- Custo Total (CD)
- BDI Aplicado (%)
- **Preço de Venda (PV)** ⭐
- Lucro Estimado (R$)

#### Composição do Preço
Detalhamento de cada componente:
- Materiais
- Mão de Obra
- Despesas Fixas (% e R$)
- Despesas Financeiras (% e R$)
- Impostos (% e R$)
- Lucro (% e R$)

### 3. Simulação Interativa

Os **sliders** permitem:
- Ajustar cada parâmetro individualmente
- Ver impacto imediato no preço final
- Testar diferentes cenários de negociação
- Encontrar o ponto ideal de lucro vs. competitividade

### 4. Exportação de Memória de Cálculo

#### PDF Detalhado (Para Engenheiro)
```
📄 Conteúdo:
├── Cabeçalho (Nome do Projeto, Data, Validade)
├── Resumo Executivo
├── Lista Completa de Materiais
│   ├── Código
│   ├── Descrição
│   ├── Quantidade
│   ├── Unidade
│   ├── Preço Unitário
│   └── Total
├── Mão de Obra Detalhada
├── Composição BDI
│   ├── Despesas Fixas (detalhadas)
│   ├── Despesas Financeiras (detalhadas)
│   ├── Lucro (cálculo)
│   └── Impostos (discriminados)
├── Cálculo Completo
├── Observações Técnicas
└── Assinaturas
```

#### PDF Simplificado (Para Cliente)
```
📄 Conteúdo:
├── Cabeçalho (Nome do Projeto, Data)
├── Resumo
│   ├── Descrição do Projeto
│   ├── Prazo de Execução
│   └── Validade da Proposta
├── Itens Principais (Agrupados)
├── Valor Total do Investimento
├── Forma de Pagamento
├── Garantias
└── Contato
```

## 🎨 Interface do Usuário

### Layout Responsivo (3 Colunas)

#### Coluna Esquerda (2/3)
- **Card Custos Diretos**
  - Input: Custo de Materiais
  - Inputs: Horas e Valor/Hora MO
  
- **Card Parâmetros BDI**
  - 4 Sliders interativos
  - Botão "Restaurar Padrões"
  - Info tooltip com fórmula

#### Coluna Direita (1/3)
- **Card Resumo Financeiro** (Gradiente Azul-Roxo)
  - Valores destacados
  - Cores semânticas
  
- **Card Composição do Preço**
  - Lista detalhada
  - Percentuais e valores

- **Card Dica**
  - Orientações contextuais

## 🔧 Valores Padrão Sugeridos

Baseados em práticas do mercado brasileiro:

```typescript
Despesas Fixas: 5,0%
Despesas Financeiras: 1,5%
Lucro: 8,0%
Impostos: 13,45%
  ├── ISS: 5,0%
  ├── PIS: 0,65%
  ├── COFINS: 3,0%
  └── Outros: 4,8%
```

## 📁 Estrutura de Arquivos

```
src/
├── types/
│   └── precificacao.ts          # Interfaces e tipos
├── components/
│   └── ModuloPrecificacao.tsx   # Componente principal
├── services/
│   └── precificacaoService.ts   # Lógica de cálculo
└── App.tsx                      # Rota integrada
```

## 🚀 Como Usar

### 1. Finalizar um Orçamento
```
Dashboard → Selecionar Orçamento → Finalizar
```

### 2. Acessar Precificação
```
Orçamento Finalizado → Botão "Precificar" 💰
```

### 3. Configurar Parâmetros
- Inserir custo de materiais (se não automático)
- Definir horas de mão de obra
- Ajustar sliders de BDI
- Observar impacto em tempo real

### 4. Exportar
- **PDF Detalhado**: Para análise interna
- **PDF Simplificado**: Para enviar ao cliente

## 💡 Casos de Uso

### Caso 1: Orçamento Rápido
```
Situação: Cliente pede orçamento urgente
Ação:
1. Usar valores padrão de BDI
2. Ajustar apenas margem de lucro
3. Exportar PDF simplificado
Tempo: < 5 minutos
```

### Caso 2: Análise Detalhada
```
Situação: Projeto grande, precisa de precisão
Ação:
1. Revisar todos os custos
2. Calcular HH detalhadamente
3. Ajustar cada parâmetro BDI
4. Simular cenários diferentes
5. Exportar PDF detalhado
Tempo: 15-30 minutos
```

### Caso 3: Negociação
```
Situação: Cliente acha caro, precisa reduzir
Ação:
1. Usar sliders para simular
2. Testar redução de margem
3. Verificar viabilidade
4. Apresentar nova proposta
Tempo: < 10 minutos
```

## 🎯 Vantagens

### ✅ Para o Engenheiro
- Cálculo automático e preciso
- Reduz erros manuais
- Memória de cálculo profissional
- Simulações rápidas
- Padronização de propostas

### ✅ Para a Empresa
- Precificação consistente
- Margem de lucro controlada
- Rastreabilidade de custos
- Competitividade no mercado
- Redução de tempo de resposta

### ✅ Para o Cliente
- Proposta clara e transparente
- Valor justo e fundamentado
- Profissionalismo

## 🔮 Próximas Melhorias

### Fase 2 (Futuro)
- [ ] Histórico de precificações
- [ ] Comparação entre orçamentos
- [ ] Templates de BDI por tipo de projeto
- [ ] Integração com sistemas contábeis
- [ ] Alertas de margem baixa
- [ ] Análise de competitividade
- [ ] Dashboard de rentabilidade

### Fase 3 (Futuro)
- [ ] Machine Learning para sugerir BDI
- [ ] Integração com bancos (taxas reais)
- [ ] Cálculo automático de impostos por região
- [ ] Sincronização com ERP
- [ ] API para integrações externas

## 📚 Referências

- NBR 14653 (Avaliação de Bens)
- TCU (Tribunal de Contas da União) - Orientações sobre BDI
- SICRO (Sistema de Custos Rodoviários)
- SINAPI (Sistema Nacional de Pesquisa de Custos e Índices)

## 🤝 Suporte

Para dúvidas sobre o módulo:
1. Consulte os tooltips (ícone ℹ️)
2. Veja os exemplos práticos
3. Teste com dados reais

---

**Desenvolvido para otimizar a precificação de projetos elétricos!** ⚡💰
