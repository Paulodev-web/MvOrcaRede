# 🚀 Guia Rápido - Mapa de Progresso

## ⚡ Como Testar Agora

### 1. Iniciar o Sistema
```bash
npm run dev
```

### 2. Acessar o Portal do Cliente
No navegador, vá para:
```
http://localhost:5173/portal/obra-123
```

### 3. Ver o Mapa
- Clique na aba **"Mapa"** (segunda aba)
- Você verá um quadro branco com 12 postes de exemplo
- Postes são coloridos por status:
  - 🟢 Verde = Concluído (P-001, P-002, P-003, P-008, P-009)
  - 🟡 Amarelo = Em Progresso (P-004, P-005, P-010)
  - ⚪ Cinza = Pendente (P-006, P-007, P-011, P-012)

### 4. Interagir
- **Zoom**: Use os botões + e - ou scroll do mouse
- **Pan**: Clique e arraste para mover
- **Detalhes**: Passe o mouse sobre qualquer círculo
- **Centralizar**: Clique no botão de reset (ícone circular)

## 🎨 Dados de Exemplo

Atualmente usando dados mockados em `PortalClientePublico.tsx`:

```typescript
const postesExemplo = [
  { id: '1', name: 'P-001', x_coord: 1200, y_coord: 1500, 
    status: 'concluido', tipoPoste: 'Concreto 10m' },
  // ... mais 11 postes
];
```

## 🔗 Próximos Passos

### Para Integrar com Dados Reais

1. **Buscar dados do banco de dados**:
```typescript
// Substituir postesExemplo por:
const { data: postes } = useQuery(['postes', obraId], 
  () => fetchPostesComStatus(obraId)
);
```

2. **Buscar planta da obra**:
```typescript
// Substituir imagemPlantaExemplo por:
const { data: obra } = useQuery(['obra', obraId], 
  () => fetchObra(obraId)
);
const imagemPlanta = obra?.imagemPlanta;
```

3. **Adicionar status aos postes**:
Adicionar campo `status` na tabela de postes:
```sql
ALTER TABLE posts ADD COLUMN status VARCHAR(20) 
DEFAULT 'pendente' 
CHECK (status IN ('pendente', 'em_progresso', 'concluido'));
```

## 📱 Telas do Sistema

### Portal do Cliente
```
┌─────────────────────────────────────────┐
│  Portal do Cliente              65% ✅  │
├─────────────────────────────────────────┤
│  [Progresso] [Mapa] [Galeria] [Contato]│
├─────────────────────────────────────────┤
│                                         │
│  Mapa de Progresso da Obra              │
│  ┌───────────────────────────────────┐  │
│  │ 🟢 5 Concluídos 🟡 3 Em Prog...  │  │
│  │                                   │  │
│  │  [Zoom Controls] [Pages]         │  │
│  │                                   │  │
│  │  ┌──────────────────────────┐    │  │
│  │  │                          │    │  │
│  │  │  🟢 P-001  🟢 P-002     │    │  │
│  │  │                          │    │  │
│  │  │      🟡 P-004  ⚪ P-006  │    │  │
│  │  │                          │    │  │
│  │  │  🟢 P-008  🟡 P-010     │    │  │
│  │  │                          │    │  │
│  │  └──────────────────────────┘    │  │
│  │                                   │  │
│  │  Passe o mouse para ver detalhes │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

## 🎯 Casos de Teste

### Teste 1: Visualização Básica
- [ ] Mapa carrega sem erros
- [ ] 12 postes aparecem no canvas
- [ ] Cores estão corretas (5 verdes, 3 amarelos, 4 cinzas)
- [ ] Estatísticas no topo batem (5/3/4)

### Teste 2: Interatividade
- [ ] Zoom in funciona
- [ ] Zoom out funciona
- [ ] Pan (arrastar) funciona
- [ ] Botão centralizar funciona
- [ ] Tooltip aparece ao passar mouse

### Teste 3: Responsividade
- [ ] Funciona em tela cheia
- [ ] Funciona em janela menor
- [ ] Controles permanecem acessíveis
- [ ] Canvas não quebra layout

### Teste 4: Com PDF
Substituir `imagemPlantaExemplo = null` por URL de PDF:
```typescript
const imagemPlantaExemplo = 'https://exemplo.com/planta.pdf';
```
- [ ] PDF carrega corretamente
- [ ] Postes aparecem sobre o PDF
- [ ] Controles de página aparecem (se PDF > 1 página)
- [ ] Zoom funciona com PDF

## 🐛 Solução de Problemas

### Problema: Mapa não aparece
**Solução**: Verifique console do navegador para erros

### Problema: Postes não aparecem
**Solução**: Verifique array `postesExemplo` não está vazio

### Problema: PDF não carrega
**Solução**: 
1. Verifique URL do PDF
2. Verifique configuração do worker em `MapaProgressoCliente.tsx`
3. Verifique CORS se PDF for externo

### Problema: Zoom muito lento
**Solução**: Ajustar `wheel.step` em `TransformWrapper`:
```typescript
wheel={{ step: 0.2 }} // aumentar de 0.1 para 0.2
```

### Problema: Postes fora da tela
**Solução**: Ajustar coordenadas ou usar botão "Centralizar"

## 🎨 Personalização

### Alterar Cores dos Status
Em `MapaProgressoCliente.tsx`, linha ~107:
```typescript
const statusColors = {
  concluido: { bg: 'bg-green-500', ... },      // Mudar verde
  em_progresso: { bg: 'bg-yellow-500', ... },  // Mudar amarelo
  pendente: { bg: 'bg-gray-400', ... }         // Mudar cinza
};
```

### Alterar Tamanho dos Marcadores
Em `MapaProgressoCliente.tsx`, linha ~155:
```typescript
className="w-8 h-8 ..."  // Mudar de 8 para 10, 12, etc
```

### Alterar Altura do Canvas
Em `PortalClientePublico.tsx`, linha ~252:
```typescript
<div className="h-[600px]">  // Mudar de 600px para outro valor
```

## 📚 Documentação Completa
Ver: `docs/MAPA-PROGRESSO-CLIENTE.md`

## 🤝 Precisa de Ajuda?
- Consulte a documentação completa
- Verifique o console do navegador
- Revise os dados mockados

---

**Última atualização**: 13/02/2026
