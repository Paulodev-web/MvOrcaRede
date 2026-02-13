# ARQUITETURA DO SISTEMA MOCKADO

## FLUXO DE DADOS

```
+-------------------------------------------------------------------+
|                         APLICACAO REACT                            |
|  (Componentes, Pages, Hooks)                                      |
+-------------------------------------------------------------------+
                               |
                               | usa
                               v
+-------------------------------------------------------------------+
|                    CONTEXTOS (AppContext, AuthContext)             |
|  - MOCK_MODE = true                                               |
|  - Gerencia estado global                                         |
+-------------------------------------------------------------------+
                               |
                               | importa
                               v
+-------------------------------------------------------------------+
|                  src/lib/supabaseClient.ts                        |
|  export { supabase } from './mockSupabaseClient'                 |
|  (Supabase real esta comentado)                                  |
+-------------------------------------------------------------------+
                               |
                               | exporta
                               v
+-------------------------------------------------------------------+
|              src/lib/mockSupabaseClient.ts                        |
|  - Mock do cliente Supabase completo                             |
|  - Auth API (login, signup, logout)                              |
|  - Database API (CRUD operations)                                |
|  - Storage API (upload, download)                                |
+-------------------------------------------------------------------+
                               |
                               | acessa
                               v
+-------------------------------------------------------------------+
|                 src/data/mockDatabase.ts                          |
|  - Banco de dados em memoria                                     |
|  - Arrays de objetos simulando tabelas                           |
|  - CRUD operations em memoria                                    |
|  - Dados iniciais pre-carregados                                 |
+-------------------------------------------------------------------+
                               |
                               | contem
                               v
+-------------------------------------------------------------------+
|                     DADOS EM MEMORIA                              |
|  - Materiais (10 itens)                                          |
|  - Concessionarias (4 registros)                                 |
|  - Grupos de Itens (5 grupos)                                    |
|  - Tipos de Poste (4 tipos)                                      |
|  - Orcamentos (3 exemplos)                                       |
|  - Pastas (2 pastas)                                             |
|  - Usuario mockado (pre-autenticado)                             |
+-------------------------------------------------------------------+
```

## COMPARACAO: REAL vs MOCKADO

### SISTEMA REAL (Supabase)
```
Componente -> AppContext -> supabaseClient -> Supabase Cloud
                                              (Postgres + Auth)
                                                   |
                                                   v
                                            Internet / API
                                                   |
                                                   v
                                          Banco de Dados Real
```

### SISTEMA MOCKADO (Atual)
```
Componente -> AppContext -> mockSupabaseClient -> mockDatabase
                                                      |
                                                      v
                                                  Memoria RAM
                                               (Dados locais)
```

## VANTAGENS DA ARQUITETURA MOCKADA

1. VELOCIDADE
   - Sem latencia de rede
   - Operacoes instantaneas
   - HMR mais rapido

2. CONFIABILIDADE
   - Sem dependencia de internet
   - Sem erros de API externa
   - Dados sempre disponiveis

3. CUSTO ZERO
   - Nao consome API do Supabase
   - Nao usa storage cloud
   - Desenvolvimento gratuito

4. FACILIDADE
   - Configuracao zero
   - Sem variaveis de ambiente
   - Sem credenciais necessarias

5. TESTES
   - Dados consistentes
   - Estado resetavel
   - Isolamento total

## ESTRUTURA DE ARQUIVOS

```
src/
|
+-- lib/
|   +-- supabaseClient.ts          [Ponto de entrada - exporta mock]
|   +-- mockSupabaseClient.ts      [Cliente Supabase simulado]
|   +-- utils.ts
|
+-- data/
|   +-- mockDatabase.ts            [Banco de dados em memoria]
|   +-- mockData.ts                [Dados iniciais]
|
+-- contexts/
|   +-- AppContext.tsx             [MOCK_MODE = true]
|   +-- AuthContext.tsx            [Usa supabase mockado]
|
+-- services/
|   +-- authService.ts             [Servicos que usam supabase]
|   +-- exportService.ts
|   +-- materialImportService.ts
|   +-- securityService.ts
|
+-- components/
|   +-- Dashboard.tsx              [UI - consome contextos]
|   +-- AreaTrabalho.tsx
|   +-- Configuracoes.tsx
|   +-- ...
|
+-- types/
    +-- index.ts                   [Definicoes de tipos]
```

## CICLO DE VIDA DE UMA OPERACAO

### Exemplo: Adicionar Material

1. Usuario clica em "Adicionar Material" no componente
2. Componente chama funcao do AppContext
3. AppContext chama mockSupabaseClient.from('materials').insert()
4. mockSupabaseClient chama mockDatabase.addMaterial()
5. mockDatabase adiciona item ao array em memoria
6. mockDatabase retorna sucesso
7. mockSupabaseClient retorna { data, error: null }
8. AppContext atualiza estado com novo material
9. React re-renderiza componente com dados atualizados

Total: ~5ms (vs ~200-500ms com Supabase real)

## PERSISTENCIA

### Dados em Memoria (Sessao)
- Duram enquanto o app estiver aberto
- Perdidos ao recarregar pagina
- Rapidos e eficientes

### Reset Automatico
- F5 = dados voltam ao inicial
- Ctrl+R = dados resetados
- Close tab = dados perdidos

### Para Persistencia Real
- Reconecte ao Supabase (veja README)
- Ou implemente localStorage (browser)
- Ou implemente IndexedDB (browser avancado)

## LOGS DE DEBUGGING

Todo o sistema mockado registra operacoes no console:

```javascript
Mock: SELECT from materials
Mock: INSERT into budgets { nome: "Novo Orcamento", ... }
Mock: UPDATE budget_posts filters: [...]
Mock: DELETE from folders filters: [...]
```

Abra DevTools (F12) para monitorar operacoes em tempo real.

---

**Sistema desenvolvido para maxima produtividade em desenvolvimento!**
