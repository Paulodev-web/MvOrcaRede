# ðŸŽ­ SISTEMA COMPLETAMENTE MOCKADO

## Status Atual
âœ… O sistema estÃ¡ **100% desconectado do banco de dados Supabase**
âœ… Todos os dados sÃ£o simulados em memÃ³ria
âœ… Sistema totalmente funcional sem necessidade de credenciais
âœ… Dados persistem durante a sessÃ£o do navegador

## ðŸ“ Arquitetura do Sistema Mockado

### 1. Cliente Supabase Mockado
**Arquivo:** \src/lib/mockSupabaseClient.ts\
- Simula completamente a API do Supabase
- Inclui Auth, Storage e Database APIs
- UsuÃ¡rio padrÃ£o prÃ©-logado para desenvolvimento
- Suporta todas as operaÃ§Ãµes: login, signup, logout, etc.

### 2. Banco de Dados em MemÃ³ria
**Arquivo:** \src/data/mockDatabase.ts\
- Sistema completo de CRUD em memÃ³ria
- Dados iniciais prÃ©-carregados:
  - 10 materiais de exemplo
  - 4 concessionÃ¡rias
  - 5 grupos de itens
  - 4 tipos de poste
  - 3 orÃ§amentos de exemplo
  - 2 pastas
- Todas as operaÃ§Ãµes sÃ£o instantÃ¢neas
- Dados resetÃ¡veis a qualquer momento

### 3. ConfiguraÃ§Ã£o Central
**Arquivo:** \src/lib/supabaseClient.ts\
- Exporta o cliente mockado por padrÃ£o
- CÃ³digo do Supabase real comentado e preservado
- InstruÃ§Ãµes claras para reconexÃ£o

### 4. Contexto da AplicaÃ§Ã£o
**Arquivo:** \src/contexts/AppContext.tsx\
- \MOCK_MODE = true\ (linha 8)
- Todas as operaÃ§Ãµes usam o mockDB
- Sem chamadas reais ao Supabase

## ðŸ”§ Dados Mockados DisponÃ­veis

### Materiais (10 itens)
- Parafusos, cabos, postes, isoladores
- Cruzetas, ferragens, aterramentos
- Transformadores, conectores, luminÃ¡rias

### ConcessionÃ¡rias (4)
- RGE - Rio Grande Energia
- Equatorial Energia
- CEEE
- CPFL

### Grupos de Itens (5)
- Poste Simples - RGE
- Poste com Cruzeta - RGE
- Poste com Transformador - RGE
- Poste BÃ¡sico - Equatorial
- IluminaÃ§Ã£o PÃºblica - RGE

### OrÃ§amentos (3)
- Loteamento Solar da Serra
- ExtensÃ£o de Rede - Bairro Centro
- Rede Rural - Linha Nova

### AutenticaÃ§Ã£o
- UsuÃ¡rio mockado prÃ©-logado:
  - Email: usuario@exemplo.com
  - Nome: UsuÃ¡rio Teste
  - ID: mock-user-id-123

## ðŸ”„ Como Funciona

1. **InicializaÃ§Ã£o**
   - Ao iniciar, o mockDB carrega dados iniciais
   - UsuÃ¡rio jÃ¡ estÃ¡ autenticado
   - Sem necessidade de configuraÃ§Ã£o

2. **OperaÃ§Ãµes**
   - Todas as operaÃ§Ãµes (CREATE, READ, UPDATE, DELETE) funcionam em memÃ³ria
   - MudanÃ§as persistem durante a sessÃ£o
   - Reload da pÃ¡gina recarrega dados iniciais

3. **Sem DependÃªncias Externas**
   - NÃ£o precisa de internet
   - NÃ£o precisa de credenciais Supabase
   - NÃ£o precisa de arquivo .env
   - Sistema 100% local

## â™»ï¸ Reconectar ao Banco de Dados Real

Se precisar reconectar ao Supabase real:

### Passo 1: Configure as variÃ¡veis de ambiente
Crie arquivo \.env\ na raiz do projeto:
\\\env
VITE_SUPABASE_URL=sua-url-do-supabase
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
\\\

### Passo 2: Edite \src/lib/supabaseClient.ts\
\\\	ypescript
// COMENTE esta linha:
// export { supabase } from './mockSupabaseClient';

// DESCOMENTE o bloco abaixo:
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
\\\

### Passo 3: Edite \src/contexts/AppContext.tsx\
\\\	ypescript
// Mude de:
const MOCK_MODE = true;

// Para:
const MOCK_MODE = false;
\\\

### Passo 4: Reinicie o servidor
\\\ash
npm run dev
\\\

## ðŸŽ¨ Funcionalidades DisponÃ­veis no Modo Mock

âœ… Login/Logout (simulado)
âœ… Cadastro de usuÃ¡rios (simulado)
âœ… Reset de senha (simulado)
âœ… CRUD de materiais
âœ… CRUD de concessionÃ¡rias
âœ… CRUD de grupos de itens
âœ… CRUD de tipos de poste
âœ… CRUD de orÃ§amentos
âœ… Sistema de pastas
âœ… Adicionar/remover postes
âœ… Adicionar/remover grupos em postes
âœ… Materiais avulsos em postes
âœ… CÃ¡lculos de preÃ§o consolidado
âœ… Upload de imagens (simulado)
âœ… Export de dados
âœ… ImportaÃ§Ã£o de CSV

## ðŸ“Š Vantagens do Sistema Mockado

1. **Desenvolvimento RÃ¡pido**: Sem latÃªncia de rede
2. **Sem Custos**: NÃ£o consome recursos do Supabase
3. **Testes FÃ¡ceis**: Dados sempre consistentes
4. **Offline**: Funciona sem internet
5. **Sem ConfiguraÃ§Ã£o**: Pronto para usar
6. **Dados de Exemplo**: PrÃ©-carregado com dados realistas
7. **ResetÃ¡vel**: Volta ao estado inicial a qualquer momento

## ðŸ” Logs e Debugging

O sistema mockado imprime logs no console para cada operaÃ§Ã£o:
- \Mock: INSERT into [tabela]\
- \Mock: SELECT from [tabela]\
- \Mock: UPDATE [tabela]\
- \Mock: DELETE from [tabela]\

Abra o DevTools (F12) para ver as operaÃ§Ãµes em tempo real.

## ðŸ“ Notas Importantes

- Os dados em modo mock **NÃƒO** sÃ£o persistidos no banco de dados
- Ao recarregar a pÃ¡gina, os dados voltam ao estado inicial
- Para persistÃªncia real, reconecte ao Supabase
- O cÃ³digo de reconexÃ£o estÃ¡ preservado e comentado

---

**Sistema desenvolvido para mÃ¡xima flexibilidade entre desenvolvimento local e produÃ§Ã£o.**
