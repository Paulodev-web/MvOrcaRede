# 🗺️ Mapa de Progresso - Portal do Cliente

## 📋 Visão Geral

O **Mapa de Progresso** é uma funcionalidade visual do Portal do Cliente que permite acompanhar o andamento da obra através da planta/PDF do projeto, com indicadores coloridos mostrando o status de cada poste/elemento.

## 🎯 Objetivo

Proporcionar ao cliente uma visão **espacial e visual** do progresso da obra, complementando as informações numéricas com uma representação gráfica intuitiva diretamente na planta do projeto.

## 🎨 Sistema de Cores

O mapa utiliza um sistema de cores intuitivo para indicar o status de cada elemento:

| Cor | Status | Símbolo | Descrição |
|-----|--------|---------|-----------|
| 🟢 **Verde** | Concluído | ✓ | Trabalho finalizado e aprovado |
| 🟡 **Amarelo** | Em Progresso | ⏳ | Trabalho em andamento |
| ⚪ **Cinza** | Pendente | ○ | Trabalho ainda não iniciado |

## 📊 Funcionalidades

### 1. Visualização da Planta
- **Suporte a PDF**: Renderiza PDFs técnicos da obra
- **Suporte a Imagens**: JPG, PNG e outros formatos de imagem
- **Quadro Branco**: Quando não há planta, usa canvas branco 6000x6000px

### 2. Controles de Navegação
- **Zoom In/Out**: Aumentar ou diminuir zoom
- **Pan**: Arrastar para navegar pela planta
- **Centralizar**: Botão para resetar a visualização
- **Navegação entre páginas**: Para PDFs com múltiplas páginas

### 3. Marcadores Interativos
- **Posicionamento Preciso**: Cada poste/elemento é posicionado com coordenadas X, Y
- **Tooltip ao Passar Mouse**: Mostra informações detalhadas:
  - Nome do poste (ex: P-001)
  - Tipo do poste (ex: Concreto 10m)
  - Status atual (Concluído/Em Progresso/Pendente)

### 4. Estatísticas em Tempo Real
Painel superior mostra:
- **Total de Postes**: Quantidade total de elementos
- **Concluídos**: Quantos já foram finalizados (verde)
- **Em Progresso**: Quantos estão sendo trabalhados (amarelo)
- **Pendentes**: Quantos ainda não iniciaram (cinza)

## 🏗️ Arquitetura Técnica

### Componente Principal
```
src/components/MapaProgressoCliente.tsx
```

### Dependências
- `react-pdf`: Renderização de PDFs
- `react-zoom-pan-pinch`: Controles de zoom e pan
- `pdfjs-dist`: Worker para processar PDFs
- `lucide-react`: Ícones

### Interface de Dados

```typescript
interface PosteMapa {
  id: string;              // Identificador único
  name: string;            // Nome do poste (ex: "P-001")
  x_coord: number;         // Coordenada X em pixels
  y_coord: number;         // Coordenada Y em pixels
  status: 'concluido' | 'em_progresso' | 'pendente';
  tipoPoste?: string;      // Tipo opcional (ex: "Concreto 10m")
}
```

### Props do Componente

```typescript
interface MapaProgressoClienteProps {
  imagemPlanta?: string | null;  // URL do PDF/imagem ou null
  postes: PosteMapa[];            // Array de postes com status
  renderVersion?: number;         // 1 ou 2 (compatibilidade)
}
```

## 🚀 Como Usar

### No Portal do Cliente

1. **Acesse o Portal**: Cliente acessa o link único da obra
2. **Clique em "Mapa"**: Segunda aba após "Progresso"
3. **Visualize a Planta**: Mapa carrega automaticamente
4. **Explore**:
   - Use zoom para ampliar áreas específicas
   - Passe o mouse sobre os círculos para ver detalhes
   - Use pan para navegar por plantas grandes

### Integração no Código

```tsx
import { MapaProgressoCliente } from './MapaProgressoCliente';

// Dados de exemplo
const postes = [
  { 
    id: '1', 
    name: 'P-001', 
    x_coord: 1200, 
    y_coord: 1500, 
    status: 'concluido',
    tipoPoste: 'Concreto 10m'
  },
  // ... mais postes
];

// Renderizar
<MapaProgressoCliente 
  imagemPlanta="https://exemplo.com/planta.pdf"
  postes={postes}
  renderVersion={1}
/>
```

## 📐 Sistema de Coordenadas

### Coordenadas Absolutas (Pixels)
- **Origem**: Canto superior esquerdo (0, 0)
- **Espaço**: Canvas de 6000x6000 pixels
- **Posicionamento**: Valores diretos em pixels (ex: x=1200, y=1500)

### Para PDFs
- PDF é centralizado em 3000x3000 (meio do canvas)
- Postes são posicionados em coordenadas absolutas do canvas
- Sistema mantém precisão independente do tamanho do PDF

### Para Imagens
- Imagem é centralizada e redimensionada proporcionalmente
- Postes mantêm coordenadas em relação à imagem original

## 🎯 Casos de Uso

### 1. Acompanhamento Diário
**Cliente**: "Quantos postes foram instalados hoje?"
- Entra no mapa
- Vê visualmente os novos postes em verde
- Compara com ontem

### 2. Verificação de Localização
**Cliente**: "O poste P-005 já foi instalado?"
- Abre o mapa
- Procura visualmente ou usa zoom
- Vê que está amarelo (em progresso)

### 3. Reuniões de Acompanhamento
**Gerente + Cliente**: "Qual região está mais atrasada?"
- Visualiza o mapa juntos
- Identifica áreas com mais círculos cinzas
- Discute prioridades

## 🔄 Fluxo de Atualização

```
1. Executor marca poste como concluído
   ↓
2. Status é atualizado no banco de dados
   ↓
3. Portal do Cliente recarrega dados
   ↓
4. Mapa atualiza automaticamente
   ↓
5. Cliente vê mudança de cor (cinza → amarelo → verde)
```

## 🎨 Personalização

### Configuração no Admin
O admin pode configurar no **Módulo Portal do Cliente**:
- ✅ Habilitar/desabilitar aba "Mapa"
- ✅ Definir quais status mostrar
- ✅ Customizar cores (futuro)
- ✅ Upload de planta atualizada

### Configurações Disponíveis
```typescript
// Em ModuloPortalCliente.tsx
secoes: {
  mapa: boolean;  // Mostrar ou ocultar aba
  // ... outras seções
}

mapaConfig: {
  mostrarConcluidos: boolean;
  mostrarEmProgresso: boolean;
  mostrarPendentes: boolean;
  permitirZoom: boolean;
  permitirDownload: boolean; // futuro
}
```

## 📱 Responsividade

### Desktop
- Canvas em tela cheia
- Controles à esquerda
- Estatísticas no topo
- Tooltips expansivos

### Mobile (Futuro)
- Canvas adaptativo
- Controles em barra inferior
- Tooltips compactos
- Gestos touch (pinch-to-zoom)

## 🔐 Segurança

### Dados Visíveis
- ✅ Status dos postes (público para o cliente)
- ✅ Localização visual na planta
- ✅ Nome/código do poste
- ❌ Custos (não exibido)
- ❌ Informações sensíveis (não exibido)

### Controle de Acesso
- Apenas clientes com link válido podem acessar
- Admin controla quais obras têm mapa ativo
- Histórico de acessos pode ser rastreado

## 🚀 Recursos Futuros

### Fase 2
- [ ] Filtro por status (mostrar só concluídos, etc)
- [ ] Linha do tempo (slider para ver progresso histórico)
- [ ] Áreas/zonas coloridas (região norte vs sul)
- [ ] Download do mapa como imagem

### Fase 3
- [ ] Animação de progresso
- [ ] Comparação antes/depois visual
- [ ] Marcadores personalizados
- [ ] Anotações do cliente no mapa
- [ ] Street View integration

### Fase 4
- [ ] Realidade aumentada (AR)
- [ ] Tour virtual 3D
- [ ] Vídeo time-lapse automático
- [ ] Comparação com satélite

## 🎯 Benefícios

### Para o Cliente
```
✅ Visualização intuitiva e espacial
✅ Acompanhamento em tempo real
✅ Entendimento claro do progresso
✅ Redução de dúvidas sobre localização
✅ Sensação de transparência total
```

### Para a Empresa
```
✅ Reduz ligações e visitas desnecessárias
✅ Cliente mais satisfeito e informado
✅ Diferencial competitivo forte
✅ Demonstra organização e tecnologia
✅ Facilita comunicação técnica
```

### Para o Gerente de Obra
```
✅ Menos tempo explicando localização
✅ Cliente entende melhor o cronograma
✅ Reduz mal-entendidos
✅ Ferramenta visual em reuniões
✅ Histórico de progresso automático
```

## 📊 Métricas de Sucesso

### Indicadores de Uso
- Taxa de acesso à aba "Mapa" (meta: 70%+)
- Tempo médio na aba (meta: 2-5 minutos)
- Redução de ligações sobre localização (meta: 40%)
- Satisfação do cliente com clareza (meta: 90%+)

## 🛠️ Manutenção

### Atualização de Plantas
1. Admin acessa Módulo Portal do Cliente
2. Clica em "Upload Nova Planta"
3. Seleciona PDF/imagem atualizada
4. Sistema recalcula posições automaticamente (futuro)
5. Cliente vê planta atualizada instantaneamente

### Correção de Coordenadas
Se postes aparecerem em local errado:
1. Admin acessa o orçamento
2. Abre o canvas visual (admin)
3. Arrasta o poste para posição correta
4. Salva automaticamente
5. Portal do cliente atualiza

## 🎓 Treinamento

### Para o Cliente
**Onboarding (1 minuto)**:
1. "Veja a planta da sua obra aqui"
2. "Verde = pronto, Amarelo = fazendo, Cinza = falta fazer"
3. "Passe o mouse para ver detalhes"
4. "Use os botões para dar zoom"

### Para o Admin
**Configuração (5 minutos)**:
1. Ative a aba "Mapa" nas configurações
2. Faça upload da planta (PDF ou imagem)
3. Verifique se os postes aparecem corretamente
4. Teste o link do cliente
5. Ajuste conforme necessário

---

## 📞 Suporte

Para dúvidas ou problemas:
- **Técnico**: Verifique console do navegador
- **Funcional**: Contate o suporte do sistema
- **Documentação**: Este arquivo

---

**Última atualização**: 13/02/2026
**Versão**: 1.0
**Status**: ✅ Implementado e funcional
