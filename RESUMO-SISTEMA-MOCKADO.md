# SISTEMA COMPLETAMENTE DESCONECTADO DO BANCO DE DADOS

## O QUE FOI FEITO

Seu sistema MvOrcaRede esta agora 100% mockado e funcional sem necessidade de conexao com o Supabase.

## ARQUIVOS PRINCIPAIS DO SISTEMA MOCKADO

### 1. src/lib/supabaseClient.ts
- EXPORTA O MOCK (ATIVO)
- Supabase real (DESATIVADO/COMENTADO)
Status: Usando cliente mockado

### 2. src/lib/mockSupabaseClient.ts
Cliente Supabase completamente simulado que implementa:
- Auth API (login, signup, logout, reset password)
- Database API (select, insert, update, delete, upsert)
- Storage API (upload, download, delete)
- Usuario pre-logado para desenvolvimento

### 3. src/data/mockDatabase.ts
Banco de dados em memoria com:
- 10 Materiais pre-cadastrados
- 4 Concessionarias
- 5 Grupos de itens
- 4 Tipos de poste
- 3 Orcamentos de exemplo
- 2 Pastas organizacionais
- Sistema completo de CRUD

### 4. src/contexts/AppContext.tsx
const MOCK_MODE = true; // ATIVO

## FUNCIONALIDADES DISPONIVEIS

Autenticacao - Mockada - Login/logout simulado, usuario pre-logado
Materiais - Funcional - CRUD completo em memoria
Concessionarias - Funcional - Gerenciamento completo
Grupos de Itens - Funcional - Criacao e edicao de grupos
Orcamentos - Funcional - Criacao, edicao, exclusao
Pastas - Funcional - Organizacao de orcamentos
Postes - Funcional - Adicionar/editar/remover
Calculos - Funcional - Precos consolidados
Import/Export - Funcional - CSV e outros formatos
Upload - Simulado - Upload de plantas/imagens

## DADOS DE DEMONSTRACAO

Usuario Pre-Logado:
- Email: usuario@exemplo.com
- Nome: Usuario Teste
- ID: mock-user-id-123

Materiais Disponiveis (10 itens):
1. Parafuso Galvanizado 10x80mm - R$ 2,50
2. Cabo de Aluminio 16mm - R$ 8,75
3. Poste de Concreto 9m - R$ 285,00
4. Isolador de Porcelana 15kV - R$ 12,30
5. Cruzeta de Concreto 2,40m - R$ 95,00
E mais 5 itens...

Orcamentos de Exemplo (3):
1. Loteamento Solar da Serra (Em Andamento)
2. Extensao de Rede - Bairro Centro (Finalizado)
3. Rede Rural - Linha Nova (Em Andamento)

## COMO USAR

1. Inicie o servidor (se nao estiver rodando): npm run dev
2. Acesse: http://localhost:5173/
3. Sistema ja esta autenticado automaticamente!
4. Explore as funcionalidades

## DEBUGGING

Abra o console do navegador (F12) para ver os logs:
- Mock: SELECT from budgets
- Mock: INSERT into materials
- Mock: UPDATE budget_posts
- Mock: DELETE from folders

## IMPORTANTE

Dados NAO sao persistidos:
- Todas as alteracoes existem apenas em memoria
- Ao recarregar a pagina, dados voltam ao estado inicial
- Para persistencia real, reconecte ao Supabase

Vantagens do Mock:
- Desenvolvimento ultra rapido (sem latencia)
- Zero custos de API
- Funciona offline
- Dados consistentes para testes
- Configuracao zero

## STATUS FINAL

SISTEMA 100% MOCKADO E FUNCIONAL!

- Banco de dados desconectado
- Todos os dados simulados localmente
- Sistema totalmente operacional
- Zero dependencias externas
- Pronto para desenvolvimento

Para reconectar ao Supabase real, veja: MOCK-SYSTEM-README.md
