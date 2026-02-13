# 🚀 Como Usar o Sistema Mockado

## Acesso Rápido

1. **Abra o navegador**: http://localhost:5173/

2. **Faça login com qualquer credencial**:
   - Email: `teste@teste.com` (ou qualquer outro)
   - Senha: `123456` (ou qualquer outra)
   - ✅ O login sempre será bem-sucedido!

3. **Explore as funcionalidades**:
   - Dashboard
   - Gerenciar Materiais
   - Gerenciar Grupos
   - Gerenciar Concessionárias
   - Gerenciar Tipos de Postes
   - Criar Orçamentos

## 📋 Dados Disponíveis

### Materiais Pré-cadastrados (10)
Vá para "Gerenciar Materiais" e você verá:
- Parafusos, cabos, postes, isoladores, cruzetas, etc.
- Você pode adicionar, editar e excluir à vontade!

### Concessionárias (4)
- RGE - Rio Grande Energia
- Equatorial Energia
- CEEE
- CPFL

### Orçamentos de Exemplo (3)
- Loteamento Solar da Serra
- Extensão de Rede - Bairro Centro
- Rede Rural - Linha Nova

## 🎯 Funcionalidades Testadas

### ✅ Funciona Perfeitamente
- Login/Logout
- Visualizar materiais
- Adicionar novo material
- Editar material existente
- Excluir material
- Excluir todos os materiais
- Visualizar orçamentos
- Visualizar concessionárias
- Visualizar grupos de itens
- Visualizar tipos de poste
- Sistema de pastas

### ⚠️ Dados Temporários
- **IMPORTANTE**: Todos os dados são perdidos ao recarregar a página
- Para resetar ao estado inicial, basta recarregar (F5)

## 🔍 Como Verificar Que Está Mockado

1. **Console do navegador** (F12):
   - Você verá logs como:
     ```
     Mock: SELECT from materials
     💰 Material mockado atualizado
     Mock: INSERT into materials
     ```

2. **Não precisa de internet**:
   - Desligue o Wi-Fi
   - Recarregue a página
   - Tudo continuará funcionando!

3. **Velocidade instantânea**:
   - Todas as operações são imediatas
   - Não há delay de rede

## 🧪 Testes Sugeridos

### Teste 1: Gerenciar Materiais
1. Vá para "Gerenciar Materiais"
2. Clique em "Adicionar Material"
3. Preencha os campos e salve
4. ✅ O material aparece na lista instantaneamente

### Teste 2: Editar Material
1. Clique no botão de editar em qualquer material
2. Altere o preço ou descrição
3. Salve
4. ✅ As mudanças são aplicadas imediatamente

### Teste 3: Excluir Material
1. Clique no botão de excluir em qualquer material
2. Confirme a exclusão
3. ✅ O material desaparece da lista

### Teste 4: Recarregar Página
1. Faça algumas alterações (adicione/edite materiais)
2. Recarregue a página (F5)
3. ✅ Tudo volta ao estado inicial (dados originais)

## 🐛 Resolução de Problemas

### Problema: Página em branco
**Solução**: 
1. Abra o console (F12)
2. Procure por erros em vermelho
3. Recarregue a página

### Problema: Login não funciona
**Solução**:
1. Qualquer email/senha deve funcionar
2. Se não funcionar, verifique o console
3. Recarregue a página

### Problema: Dados não aparecem
**Solução**:
1. Abra o console
2. Procure por `Mock: SELECT from...`
3. Se não aparecer, verifique os logs
4. Recarregue a página

### Problema: Erro "VITE_SUPABASE_URL"
**Solução**:
- ✅ IGNORE! Este erro não deveria mais aparecer
- O sistema agora usa o cliente mockado
- Se aparecer, significa que o supabaseClient.ts não foi atualizado corretamente

## 📊 Monitoramento

### Console do Navegador (F12)
Você verá logs úteis:
```
Mock: SELECT from materials
Mock: INSERT into materials {codigo: "TEST-001", ...}
Mock: UPDATE materials {id: "1", ...}
Mock: DELETE from materials filters: [{type: "eq", column: "id", value: "1"}]
💰 Material mockado atualizado
```

### DevTools React
Se você tem React DevTools instalado:
1. Abra as DevTools
2. Vá para a aba "Components"
3. Encontre `AppProvider`
4. Veja o estado em tempo real:
   - `materiais: [...]`
   - `budgets: [...]`
   - `concessionarias: [...]`

## 🎨 Interface

A interface é **exatamente igual** ao sistema real:
- Mesmos botões
- Mesmos formulários
- Mesma aparência
- Mesmas validações

A única diferença é que:
- ✅ Tudo é instantâneo
- ✅ Dados não persistem entre sessões
- ✅ Funciona offline

## 💡 Dicas

1. **Teste à vontade**: Você não pode quebrar nada!
2. **Experimente**: Adicione 100 materiais se quiser
3. **Reset rápido**: F5 volta tudo ao normal
4. **Sem custos**: Não consome recursos do Supabase
5. **Desenvolvimento**: Perfeito para testar novas funcionalidades

## 🔄 Voltando ao Banco Real

Quando quiser reconectar ao Supabase:

1. Edite `src/lib/supabaseClient.ts`:
   ```typescript
   // Comente:
   // export { supabase } from './mockSupabaseClient';
   
   // Descomente o código original do Supabase
   ```

2. OU edite `src/contexts/AppContext.tsx`:
   ```typescript
   // Linha 9, mude para:
   const MOCK_MODE = false;
   ```

3. Recarregue a página

## 📞 Precisa de Ajuda?

Se algo não estiver funcionando:
1. Verifique o console (F12)
2. Leia os erros em vermelho
3. Recarregue a página
4. Verifique se o servidor está rodando (terminal)

---

**Status do Sistema**: ✅ 100% Mockado e Funcional
**Última Atualização**: 13/02/2026
**Servidor**: http://localhost:5173/

Divirta-se testando! 🎉
