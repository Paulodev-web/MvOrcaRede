# Sistema Mockado - Banco de Dados Desconectado

## 🎯 O que foi feito

O sistema foi completamente desconectado do banco de dados Supabase e agora funciona com dados simulados em memória. Todas as funcionalidades continuam operacionais, mas usando dados mockados.

## 📁 Arquivos Criados/Modificados

### 1. `src/lib/mockSupabaseClient.ts` (NOVO)
- Cliente Supabase mockado completo
- Simula todas as operações de autenticação (login, cadastro, logout, etc.)
- Simula operações de banco de dados (CRUD)
- Simula storage de arquivos
- Mantém sessão de usuário mockada

### 2. `src/data/mockDatabase.ts` (NOVO)
- Sistema de banco de dados em memória
- Armazena e gerencia todos os dados mockados:
  - **Materiais**: 10 materiais pré-cadastrados
  - **Concessionárias**: 4 concessionárias
  - **Grupos de Itens**: 5 grupos pré-configurados
  - **Tipos de Poste**: 4 tipos de poste
  - **Orçamentos**: 3 orçamentos de exemplo
  - **Pastas**: 2 pastas de organização
- Funções CRUD completas para todos os recursos
- Dados persistem durante a sessão da aplicação

### 3. `src/lib/supabaseClient.ts` (MODIFICADO)
- Agora exporta o cliente mockado ao invés do Supabase real
- Código original comentado para fácil reversão
- Instruções claras de como reconectar ao banco real

### 4. `src/data/mockData.ts` (MODIFICADO)
- Agora importa dados do mockDatabase
- Serve como ponte entre o código legado e o novo sistema mockado

### 5. `src/contexts/AppContext.tsx` (MODIFICADO)
- Adicionado flag `MOCK_MODE = true` no topo
- Funções principais modificadas para usar mockDB:
  - `fetchMaterials()` - busca materiais mockados
  - `addMaterial()` - adiciona material ao banco mockado
  - `updateMaterial()` - atualiza material mockado
  - `deleteMaterial()` - remove material mockado
  - `deleteAllMaterials()` - limpa todos os materiais mockados
  - `fetchBudgets()` - busca orçamentos mockados
  - `fetchPostTypes()` - busca tipos de poste mockados
  - `fetchUtilityCompanies()` - busca concessionárias mockadas
  - `fetchFolders()` - busca pastas mockadas
- Código original mantido para referência e fácil reversão

## ✅ Funcionalidades Mockadas

### Autenticação
- ✅ Login (sempre bem-sucedido com qualquer credencial)
- ✅ Cadastro (cria usuário mockado)
- ✅ Logout (limpa sessão mockada)
- ✅ Recuperação de senha (simula envio de email)
- ✅ Verificação de email (sempre confirmado)
- ✅ Sessão persistente (usuário mockado pré-logado)

### Dados
- ✅ Materiais (CRUD completo)
- ✅ Concessionárias (leitura)
- ✅ Grupos de Itens (leitura)
- ✅ Tipos de Poste (leitura)
- ✅ Orçamentos (leitura e operações básicas)
- ✅ Pastas (leitura)

### Operações
- ✅ Todas as operações de leitura
- ✅ Todas as operações de criação
- ✅ Todas as operações de atualização
- ✅ Todas as operações de exclusão
- ✅ Logs no console para debug

## 🔧 Como Usar

### Para manter o modo mockado (atual)
Não precisa fazer nada! O sistema já está configurado para usar dados mockados.

### Para reconectar ao banco de dados real

#### Opção 1: Modificar `supabaseClient.ts`
```typescript
// Em src/lib/supabaseClient.ts

// Comente esta linha:
// export { supabase } from './mockSupabaseClient';

// Descomente o bloco abaixo:
/*
import { createClient } from '@supabase/supabase-js';

if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error('Missing environment variable: VITE_SUPABASE_URL');
}

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error('Missing environment variable: VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);
*/
```

#### Opção 2: Modificar flag em `AppContext.tsx`
```typescript
// Em src/contexts/AppContext.tsx
// Linha 9, mude de true para false:
const MOCK_MODE = false;
```

## 📊 Dados Pré-carregados

### Usuário Mockado
```
Email: usuario@exemplo.com
ID: mock-user-id-123
Nome: Usuário Teste
Status: Email verificado
```

### Materiais (10 itens)
- Parafuso Galvanizado 10x80mm (R$ 2,50)
- Cabo de Alumínio 16mm² (R$ 8,75)
- Poste de Concreto 9m (R$ 285,00)
- Isolador de Porcelana 15kV (R$ 12,30)
- Cruzeta de Concreto 2,40m (R$ 95,00)
- Ferragem para Fixação (R$ 15,80)
- Aterramento com Haste (R$ 125,00)
- Transformador 15kVA (R$ 1.250,00)
- Conector de Alumínio (R$ 5,20)
- Luminária LED 100W (R$ 280,00)

### Concessionárias (4 itens)
- RGE - Rio Grande Energia
- Equatorial Energia
- CEEE - Companhia Estadual de Energia Elétrica
- CPFL - Companhia Paulista de Força e Luz

### Tipos de Poste (4 itens)
- Poste Concreto 9m (R$ 285,00)
- Poste Concreto 11m (R$ 385,00)
- Poste Concreto 12m (R$ 435,00)
- Poste Metálico 10m (R$ 520,00)

### Orçamentos (3 itens)
- Loteamento Solar da Serra
- Extensão de Rede - Bairro Centro
- Rede Rural - Linha Nova

## 🚀 Vantagens do Modo Mockado

1. **Desenvolvimento Offline**: Não precisa de conexão com internet
2. **Velocidade**: Operações instantâneas sem latência de rede
3. **Testes**: Ambiente seguro para testar funcionalidades
4. **Custos**: Não consome recursos do Supabase
5. **Debugging**: Logs claros no console
6. **Reset Fácil**: Recarregue a página para resetar dados

## ⚠️ Limitações

1. **Dados não persistem**: Dados são perdidos ao recarregar a página
2. **Sem imagens reais**: Upload de imagens é simulado
3. **Sem sincronização**: Cada instância tem seus próprios dados
4. **Algumas operações complexas**: Podem não estar 100% implementadas

## 🔄 Estrutura do Sistema Mockado

```
src/
├── lib/
│   ├── mockSupabaseClient.ts  → Cliente Supabase mockado
│   └── supabaseClient.ts      → Exporta o cliente mockado
├── data/
│   ├── mockDatabase.ts        → Banco de dados em memória
│   └── mockData.ts            → Exporta dados mockados
└── contexts/
    └── AppContext.tsx         → Usa mockDB quando MOCK_MODE = true
```

## 📝 Logs de Debug

O sistema mockado registra todas as operações no console:
- `Mock: INSERT into [tabela]` - Inserção de dados
- `Mock: UPDATE [tabela]` - Atualização de dados
- `Mock: DELETE from [tabela]` - Exclusão de dados
- `Mock: SELECT from [tabela]` - Consulta de dados
- `Mock: Upload de arquivo` - Upload simulado
- `💰 Material mockado atualizado` - Operações específicas

## 🎓 Para Desenvolvedores

### Adicionar novos dados mockados

1. Edite `src/data/mockDatabase.ts`
2. Adicione novos itens aos arrays iniciais (`initialMaterials`, etc.)
3. Recarregue a aplicação

### Implementar nova funcionalidade mockada

1. Adicione método no `mockDB` em `mockDatabase.ts`
2. Modifique a função correspondente no `AppContext.tsx`
3. Adicione verificação `if (MOCK_MODE)`

### Exemplo de código mockado

```typescript
const minhaFuncao = async () => {
  if (MOCK_MODE) {
    // Versão mockada
    const dados = mockDB.getMeusDados();
    setMeusDados(dados);
  } else {
    // Versão real com Supabase
    const { data } = await supabase.from('tabela').select();
    setMeusDados(data);
  }
};
```

## 📞 Suporte

Se encontrar algum problema ou comportamento inesperado:
1. Verifique o console do navegador para logs
2. Confirme que `MOCK_MODE = true` em `AppContext.tsx`
3. Recarregue a página para resetar o estado
4. Verifique se todos os arquivos foram criados corretamente

---

**Status**: ✅ Sistema 100% funcional em modo mockado
**Última atualização**: 13/02/2026
