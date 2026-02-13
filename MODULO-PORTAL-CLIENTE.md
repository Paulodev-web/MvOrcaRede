# 👁️ Módulo Portal do Cliente - Transparência Total

## 📋 Visão Geral

O **Módulo Portal do Cliente** é uma ferramenta de configuração que permite ao administrador definir exatamente o que cada cliente pode visualizar sobre sua obra. É o controle central de transparência e comunicação com o cliente final.

## 🎯 Propósito

Dar ao admin controle total sobre:
- ✅ O que o cliente vê
- ✅ Como as informações são apresentadas
- ✅ Quais fotos são aprovadas
- ✅ Nível de detalhamento financeiro
- ✅ Personalização da marca

## 🔄 Fluxo de Trabalho

```
1. Admin cria obra no sistema
   ↓
2. Abre Portal do Cliente
   ↓
3. Seleciona a obra
   ↓
4. Configura visibilidade de seções
   ↓
5. Define detalhes de cada seção
   ↓
6. Modera fotos (aprova/rejeita)
   ↓
7. Personaliza aparência (logo, cores)
   ↓
8. Preview do portal
   ↓
9. Salva configurações
   ↓
10. Gera link para o cliente
```

## 📱 Interface do Módulo (3 Abas)

### 1️⃣ Aba: Configurar Visibilidade

Interface de controle com toggles visuais.

#### Seções Principais (Toggle Cards)
```
┌─────────────────────────────────────────┐
│  ✅ 📊 Progresso da Obra                │
│  Barras de progresso e percentuais      │
│  [👁️ Visível]                           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  ✅ 📅 Timeline da Obra                 │
│  Marcos e fases concluídas              │
│  [👁️ Visível]                           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  ✅ 📸 Galeria de Fotos                 │
│  Fotos do andamento da obra             │
│  [👁️ Visível]                           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  ❌ 💰 Financeiro                       │
│  Pagamentos e saldo                     │
│  [👁️‍🗨️ Oculto]                          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  ❌ 📄 Documentos                       │
│  Certificados e relatórios              │
│  [👁️‍🗨️ Oculto]                          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  ❌ ✅ Checklist de Qualidade           │
│  Itens verificados                      │
│  [👁️‍🗨️ Oculto]                          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  ✅ 💬 Contato                          │
│  Formulário de mensagens                │
│  [👁️ Visível]                           │
└─────────────────────────────────────────┘
```

#### Configurações Detalhadas

**Quando "Progresso" está ativo:**
```
┌─────────────────────────────────────────┐
│  📊 Configurações: Progresso da Obra    │
├─────────────────────────────────────────┤
│  ✅ Mostrar Postes Instalados           │
│     Ex: 130 de 200 postes (65%)         │
│                                         │
│  ✅ Mostrar Rede Instalada              │
│     Ex: 3.2km de 5km (64%)              │
│                                         │
│  ❌ Mostrar Materiais Utilizados        │
│     Ex: 58% dos materiais               │
│                                         │
│  ✅ Mostrar Porcentagem Geral           │
│     Barra de progresso principal        │
│                                         │
│  ✅ Mostrar Cronograma                  │
│     Início, previsão e dias restantes   │
└─────────────────────────────────────────┘
```

**Quando "Financeiro" está ativo:**
```
┌─────────────────────────────────────────┐
│  💰 Configurações: Financeiro           │
├─────────────────────────────────────────┤
│  ✅ Mostrar Valor Total                 │
│     Valor contratado da obra            │
│                                         │
│  ✅ Mostrar Histórico de Pagamentos     │
│     Parcelas pagas e pendentes          │
│                                         │
│  ❌ Mostrar Saldo Devedor               │
│     Quanto falta pagar                  │
│                                         │
│  ❌ Mostrar Detalhamento de Custos      │
│     Breakdown materiais e MO            │
└─────────────────────────────────────────┘
```

**Quando "Galeria" está ativo:**
```
┌─────────────────────────────────────────┐
│  📸 Configurações: Galeria de Fotos     │
├─────────────────────────────────────────┤
│  ✅ Moderação de Fotos                  │
│     Admin aprova antes de exibir        │
│                                         │
│  ✅ Permitir Download                   │
│     Cliente pode baixar fotos           │
│                                         │
│  ✅ Seção Antes/Depois                  │
│     Comparação visual automática        │
│                                         │
│  ✅ Organizar por Data                  │
│     Fotos cronológicas                  │
├─────────────────────────────────────────┤
│  Fotos Pendentes de Aprovação: 3       │
│  [IMG_001] [IMG_002] [IMG_003]         │
│  [Aprovar] [Rejeitar]                  │
└─────────────────────────────────────────┘
```

---

### 2️⃣ Aba: Aparência

Personalização visual do portal.

```
┌─────────────────────────────────────────┐
│  🎨 Cores do Portal                     │
├─────────────────────────────────────────┤
│  Cor Primária:   [🎨] #0891b2          │
│  Cor Secundária: [🎨] #3b82f6          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  📝 Textos e Logo                       │
├─────────────────────────────────────────┤
│  Logo da Empresa:                       │
│  [📤 Clique para upload]                │
│  PNG, JPG (máx 2MB)                     │
│                                         │
│  Mensagem de Boas-Vindas:               │
│  [Acompanhe o progresso da sua obra...] │
│                                         │
│  Rodapé Personalizado:                  │
│  [© 2026 Sua Empresa - Todos...]       │
└─────────────────────────────────────────┘
```

---

### 3️⃣ Aba: Preview

Visualização em tempo real do portal do cliente.

```
┌─────────────────────────────────────────┐
│  Preview do Portal do Cliente           │
│  [💻 Desktop] [📱 Mobile]               │
├─────────────────────────────────────────┤
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  PORTAL DO CLIENTE (Preview)      │ │
│  ├───────────────────────────────────┤ │
│  │  [LOGO]    Sua Obra      65%      │ │
│  │  Instalação Rede - Bairro Centro  │ │
│  ├───────────────────────────────────┤ │
│  │                                   │ │
│  │  📊 Progresso da Obra             │ │
│  │  ████████████░░░░░░░░░ 65%       │ │
│  │                                   │ │
│  │  📅 Timeline                      │ │
│  │  ✓ Início - 15/01                │ │
│  │  ⏳ Em Andamento                  │ │
│  │  ○ Conclusão - 25/02              │ │
│  │                                   │ │
│  │  📸 Galeria (23 fotos)            │ │
│  │  [📷] [📷] [📷]                   │ │
│  │                                   │ │
│  │  💬 Fale Conosco                  │ │
│  │  [Formulário de contato]          │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## 🎛️ Sistema de Controle

### Níveis de Visibilidade

#### 🟢 Nível 1: Básico (Transparência Mínima)
```
Mostrar:
├─ ✅ Progresso geral (só %)
├─ ✅ Timeline simples
└─ ✅ Formulário de contato

Ocultar:
├─ ❌ Detalhes técnicos
├─ ❌ Financeiro
├─ ❌ Checklist
└─ ❌ Documentos
```

#### 🟡 Nível 2: Moderado (Transparência Média)
```
Mostrar:
├─ ✅ Progresso detalhado
├─ ✅ Timeline completa
├─ ✅ Galeria moderada
└─ ✅ Contato

Ocultar:
├─ ❌ Financeiro detalhado
├─ ❌ Checklist técnico
└─ ❌ Documentos internos
```

#### 🟢 Nível 3: Total (Transparência Máxima)
```
Mostrar:
├─ ✅ Tudo do progresso
├─ ✅ Timeline detalhada
├─ ✅ Todas as fotos
├─ ✅ Financeiro completo
├─ ✅ Checklist
├─ ✅ Documentos
└─ ✅ Relatórios

Filosofia: Total transparência
```

---

## 📸 Sistema de Moderação de Fotos

### Fluxo de Moderação

```
Executor tira foto no campo
        ↓
Foto vai para fila de moderação
        ↓
Admin vê no Portal do Cliente
        ↓
Admin decide:
├─ ✅ Aprovar → Vai para galeria do cliente
└─ ❌ Rejeitar → Não aparece

Motivos para rejeitar:
├─ Qualidade baixa
├─ Conteúdo inadequado
├─ Informação sensível
└─ Foto duplicada
```

### Interface de Moderação
```
┌─────────────────────────────────────────┐
│  Fotos Pendentes: 3                     │
├─────────────────────────────────────────┤
│  [📷 IMG_001]  [📷 IMG_002]  [📷 IMG_003]│
│  13/02 14:30   13/02 15:45   13/02 16:20│
│                                         │
│  (hover na foto)                        │
│  ┌──────────────┐                       │
│  │ [✅ Aprovar] │                       │
│  │ [❌ Rejeitar]│                       │
│  └──────────────┘                       │
└─────────────────────────────────────────┘
```

---

## 📊 Gráfico Físico-Financeiro

Correlação entre progresso físico e pagamentos.

### Conceito
```
PROGRESSO FÍSICO:     ████████████░░░░░░░░░░ 65%
PROGRESSO FINANCEIRO: ███████████░░░░░░░░░░░ 50%

Status: ⚠️ Cliente está com pagamento atrasado
        (65% executado mas só 50% pago)
```

### Visualização para Cliente
```
┌─────────────────────────────────────────┐
│  📊 Progresso Físico x Financeiro       │
├─────────────────────────────────────────┤
│  Obra Executada:                        │
│  ████████████░░░░░░░░░░ 65%            │
│                                         │
│  Pagamentos Realizados:                 │
│  ███████████░░░░░░░░░░░ 50%            │
│                                         │
│  Status: ⚠️ Pagamento da parcela 3     │
│           previsto para esta semana     │
└─────────────────────────────────────────┘
```

---

## 🖼️ Timeline Antes/Depois Automática

### Como Funciona

```
Sistema detecta automaticamente:

ANTES (Início da Obra):
├─ Primeira foto do local
├─ Data: 15/01/2026
└─ Tag automática: "Antes"

DURANTE (Progresso):
├─ Fotos do dia-a-dia
├─ Organizadas por data
└─ Tag: "Em Andamento"

DEPOIS (Conclusão):
├─ Últimas fotos
├─ Data: 25/02/2026
└─ Tag automática: "Depois"
```

### Visualização para Cliente
```
┌─────────────────────────────────────────┐
│  📸 Antes e Depois                      │
├─────────────────────────────────────────┤
│  ┌──────────────┐    ┌──────────────┐  │
│  │    ANTES     │    │    DEPOIS    │  │
│  │              │    │              │  │
│  │  [Foto 1]    │ vs │  [Foto 2]    │  │
│  │              │    │              │  │
│  │  15/01/2026  │    │  25/02/2026  │  │
│  └──────────────┘    └──────────────┘  │
│                                         │
│  [← Anterior] [1/5] [Próximo →]        │
└─────────────────────────────────────────┘
```

---

## 🎨 Personalização de Marca

### Elementos Customizáveis

#### 1. Logo
```
Upload da logo da empresa
├─ Aparece no header
├─ Formatos: PNG, JPG, SVG
├─ Tamanho máx: 2MB
└─ Dimensões recomendadas: 200x60px
```

#### 2. Cores
```
Cor Primária:
├─ Botões principais
├─ Barras de progresso
├─ Links e destaques
└─ Default: #0891b2 (Cyan)

Cor Secundária:
├─ Elementos de apoio
├─ Hover states
└─ Default: #3b82f6 (Blue)
```

#### 3. Mensagens
```
Boas-Vindas:
"Acompanhe o progresso da sua obra em tempo real"

Rodapé:
"© 2026 Sua Empresa Ltda - Todos os direitos reservados"
```

---

## 👁️ Portal do Cliente (Visão do Cliente)

### Interface que o Cliente Vê

```
┌─────────────────────────────────────────────────┐
│  [LOGO]                              65% ✅     │
│  Obra: Instalação Rede Elétrica - Bairro Centro│
├─────────────────────────────────────────────────┤
│  Acompanhe o progresso da sua obra em tempo real│
├─────────────────────────────────────────────────┤
│                                                 │
│  📊 PROGRESSO DA OBRA                           │
│  ┌───────────────────────────────────────────┐ │
│  │  Progresso Geral                          │ │
│  │  ████████████░░░░░░░░░░ 65%              │ │
│  │                                           │ │
│  │  Postes: 130/200 ████████░░ 65%          │ │
│  │  Rede:   3.2/5km ████████░░ 64%          │ │
│  │                                           │ │
│  │  📅 Início: 15/01  |  Previsão: 25/02    │ │
│  │  ⏱️ Faltam 12 dias para conclusão         │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  📅 TIMELINE                                    │
│  ┌───────────────────────────────────────────┐ │
│  │  ✅ 15/01 - Início da Obra                │ │
│  │  ✅ 28/01 - Fundações Concluídas          │ │
│  │  ⏳ Atual - Instalação em Andamento       │ │
│  │  ○  25/02 - Conclusão Prevista           │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  📸 GALERIA (23 fotos)                         │
│  ┌───────────────────────────────────────────┐ │
│  │  [📷]  [📷]  [📷]  [📷]  [📷]  [📷]      │ │
│  │  [📷]  [📷]  [📷]  [Ver todas →]         │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  📸 ANTES E DEPOIS                              │
│  ┌─────────────┐         ┌─────────────┐      │
│  │   ANTES     │         │   DEPOIS    │      │
│  │ [Foto área  │    →    │ [Foto obra  │      │
│  │  vazia]     │         │  instalada] │      │
│  └─────────────┘         └─────────────┘      │
│                                                 │
│  💬 FALE CONOSCO                                │
│  ┌───────────────────────────────────────────┐ │
│  │  Seu Nome: [____________]                 │ │
│  │  Mensagem: [____________]                 │ │
│  │            [____________]                 │ │
│  │  [Enviar Mensagem]                        │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  © 2026 Sua Empresa - Contato: (11) 9999-9999 │
└─────────────────────────────────────────────────┘
```

---

## 🔐 Acesso ao Portal

### Geração de Links

```
Admin gera link único por obra:

https://portal.suaempresa.com/obra/abc123

Onde:
├─ abc123 = Token único e seguro
├─ Não requer login (ou senha simples)
├─ Válido durante a obra
└─ Pode ser revogado a qualquer momento
```

### Níveis de Acesso
```
1. Link Público (Senha Simples)
   └─ Cliente digita senha de 4-6 dígitos

2. Link Privado (Token Único)
   └─ Acesso direto via link

3. Link com Login (Email)
   └─ Cliente faz login com email
```

---

## 📊 Cenários de Configuração

### Cenário 1: Cliente VIP (Transparência Total)
```
✅ Progresso completo
✅ Timeline detalhada
✅ Galeria sem moderação
✅ Financeiro completo
✅ Documentos disponíveis
✅ Checklist visível

Objetivo: Máxima confiança
```

### Cenário 2: Cliente Padrão (Transparência Moderada)
```
✅ Progresso geral
✅ Timeline simples
✅ Galeria moderada
❌ Financeiro (só total)
❌ Documentos técnicos
❌ Checklist

Objetivo: Informação necessária
```

### Cenário 3: Cliente Distante (Transparência Mínima)
```
✅ Progresso em %
✅ Timeline básica
✅ Poucas fotos selecionadas
❌ Financeiro
❌ Documentos
❌ Detalhes técnicos

Objetivo: Tranquilidade sem detalhes
```

---

## 💼 Benefícios

### Para o Admin
```
✅ Controle total sobre informações
✅ Moderação de conteúdo
✅ Reduz ligações e emails
✅ Profissionalismo
✅ Diferencial competitivo
```

### Para o Cliente
```
✅ Transparência
✅ Acesso 24/7
✅ Informação atualizada
✅ Registro visual
✅ Tranquilidade
```

### Para a Empresa
```
✅ Menos suporte
✅ Cliente satisfeito
✅ Diferencial de mercado
✅ Branding
✅ Retenção de clientes
```

---

## 🎯 Casos de Uso

### Caso 1: Configurar Portal Nova Obra
```
1. Obra criada no sistema
2. Admin abre Portal do Cliente
3. Seleciona a obra
4. Ativa: Progresso + Timeline + Galeria
5. Configura moderação de fotos
6. Personaliza cores da empresa
7. Salva e gera link
8. Envia link para o cliente
```

### Caso 2: Moderar Fotos Diárias
```
Todo dia:
1. Executor envia 5-10 fotos
2. Admin recebe notificação
3. Abre moderação no Portal
4. Revisa fotos rapidamente
5. Aprova fotos de qualidade
6. Rejeita fotos ruins/duplicadas
7. Cliente vê fotos aprovadas
```

### Caso 3: Ajustar Visibilidade
```
Cliente reclama de "muita informação":
1. Admin abre configurações
2. Desativa "Checklist técnico"
3. Desativa "Materiais utilizados"
4. Mantém só progresso geral
5. Salva
6. Portal simplificado instantaneamente
```

### Caso 4: Cliente Quer Ver Financeiro
```
Cliente solicita transparência financeira:
1. Admin ativa seção "Financeiro"
2. Escolhe mostrar:
   ✅ Valor total
   ✅ Pagamentos
   ❌ Detalhamento de custos
3. Salva
4. Cliente pode acompanhar pagamentos
```

---

## 🔄 Integração com Outros Módulos

### Com OrçaRede
```
Orçamento aprovado
    ↓
Cria obra
    ↓
Configura portal
    ↓
Link para cliente
```

### Com Módulo Obra
```
Executor atualiza progresso
    ↓
Dados atualizados no portal cliente
    ↓
Cliente vê em tempo real
    ↓
Admin recebe feedback do cliente
```

### Com Precificação
```
Valor do BDI
    ↓
Pode ser exibido no portal
    ↓
Cliente vê composição de custos
    ↓
Transparência total
```

---

## 📱 Responsividade

### Desktop (Cliente em Casa)
```
Layout 2 colunas:
├─ Coluna esquerda: Progresso + Timeline
└─ Coluna direita: Galeria + Contato
```

### Mobile (Cliente no Celular)
```
Layout 1 coluna:
├─ Progresso (cards)
├─ Timeline (vertical)
├─ Galeria (grid 2 colunas)
└─ Contato (formulário)
```

---

## 🎨 Customização por Tipo de Obra

### Obra Residencial
```
Configuração típica:
✅ Progresso simples (%)
✅ Fotos antes/depois
✅ Timeline visual
❌ Detalhes técnicos
❌ Checklist complexo

Mensagem: "Sua casa está ficando pronta!"
```

### Obra Industrial/Comercial
```
Configuração típica:
✅ Progresso detalhado
✅ Financeiro completo
✅ Documentos técnicos
✅ Checklist de qualidade
✅ Relatórios semanais

Mensagem: "Acompanhamento técnico completo"
```

### Obra Pública/Licitação
```
Configuração típica:
✅ Transparência máxima
✅ Todos os documentos
✅ Checklist completo
✅ Financeiro detalhado
✅ Histórico completo

Mensagem: "Transparência total conforme contrato"
```

---

## 🚀 Recursos Futuros

### Fase 2
- [ ] QR Code para acesso rápido
- [ ] Notificações por email ao cliente
- [ ] Cliente pode comentar nas fotos
- [ ] Download de relatório PDF
- [ ] Múltiplos acessos (dono + arquiteto)

### Fase 3
- [ ] App mobile para cliente
- [ ] Push notifications
- [ ] Chat bidirecional
- [ ] Assinatura digital
- [ ] Avaliação de satisfação

### Fase 4
- [ ] Portal white-label customizável
- [ ] Sub-domínio personalizado
- [ ] Integração com WhatsApp
- [ ] Tour virtual 360°
- [ ] Realidade aumentada

---

## 📊 Métricas de Sucesso

### Para Medir
```
1. Taxa de Acesso
   - Quantos clientes acessam regularmente
   - Frequência de visitas

2. Satisfação
   - Mensagens de feedback
   - Elogios vs reclamações

3. Redução de Suporte
   - Menos ligações
   - Menos emails
   - Menos visitas ao escritório

4. Conversão
   - Clientes que indicam
   - Novos contratos
   - Upsell de serviços
```

---

## 🎯 Diferenciais Competitivos

### Por que isso é inovador?

```
❌ Competidor Tradicional:
├─ Cliente liga para perguntar
├─ Envia fotos por WhatsApp
├─ Sem organização
└─ Baixa transparência

✅ Com Portal do Cliente:
├─ Cliente acessa quando quiser
├─ Fotos organizadas e aprovadas
├─ Timeline clara
├─ Transparência profissional
└─ Diferencial de mercado
```

---

## 💡 Dicas de Configuração

### 🟢 Recomendações Gerais

1. **Sempre mostre progresso**
   - Clientes querem ver evolução

2. **Modere fotos**
   - Só mostre fotos de qualidade
   - Evita confusão

3. **Timeline é essencial**
   - Cliente entende onde está
   - Reduz ansiedade

4. **Contato sempre ativo**
   - Canal de comunicação aberto
   - Cliente se sente ouvido

### 🟡 Cuidados

1. **Financeiro sensível**
   - Só mostre se cliente quiser
   - Evita constrangimento

2. **Checklist técnico**
   - Pode confundir cliente leigo
   - Mostrar só se solicitado

3. **Documentos internos**
   - Não expor informações sensíveis
   - Só certificados finais

---

## 📚 Documentação do Portal

### Para o Cliente (Incluir no Portal)
```
❓ Como Usar Este Portal

1. Acesse o link enviado
2. Veja o progresso em tempo real
3. Navegue pela galeria de fotos
4. Acompanhe a timeline
5. Entre em contato se necessário

🔐 Segurança
Seus dados estão protegidos e apenas
você tem acesso a este portal.
```

---

## 🎊 Resultado Final

### O que o Admin Pode Fazer:

```
✅ Escolher o que mostrar
✅ Configurar cada detalhe
✅ Moderar conteúdo
✅ Personalizar marca
✅ Preview antes de publicar
✅ Gerar link seguro
✅ Controlar tudo de um lugar
```

### O que o Cliente Recebe:

```
✅ Portal personalizado
✅ Acesso 24/7
✅ Informações atualizadas
✅ Fotos de qualidade
✅ Timeline clara
✅ Canal de comunicação
✅ Tranquilidade e confiança
```

---

**Transparência sob controle: mostre o que importa, oculte o que confunde!** 👁️📊✨
