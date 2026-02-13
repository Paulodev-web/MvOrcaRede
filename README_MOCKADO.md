# 🎉 Sistema Mockado - Referência Rápida

## ⚡ Status: ATIVO

```
✅ Sistema 100% desconectado do banco de dados
✅ Todos os dados são simulados em memória
✅ Funciona offline
✅ Velocidade instantânea
```

---

## 🚀 Acesso Imediato

**URL**: http://localhost:5173/

**Login**: 
- Email: `qualquer@email.com`
- Senha: `qualquer senha`
- ✅ **Sempre funciona!**

---

## 📚 Documentação Completa

| Arquivo | Descrição |
|---------|-----------|
| [MODO_MOCKADO.md](./MODO_MOCKADO.md) | Documentação técnica completa |
| [COMO_USAR_MOCKADO.md](./COMO_USAR_MOCKADO.md) | Guia do usuário |
| [RESUMO_ALTERACOES.md](./RESUMO_ALTERACOES.md) | Detalhes das alterações |

---

## 🎯 Teste Rápido (30 segundos)

1. Abra http://localhost:5173/
2. Faça login com qualquer email/senha
3. Vá em "Gerenciar Materiais"
4. Adicione um novo material
5. ✅ Deve aparecer instantaneamente!

---

## 🔧 Arquivos Importantes

### Criados
```
src/lib/mockSupabaseClient.ts    ← Cliente Supabase mockado
src/data/mockDatabase.ts          ← Banco de dados em memória
```

### Modificados
```
src/lib/supabaseClient.ts         ← Exporta o mock
src/data/mockData.ts              ← Usa o mockDB
src/contexts/AppContext.tsx       ← 9 funções mockadas
```

---

## 📊 Dados Disponíveis

```
✅ 10 Materiais (parafusos, cabos, postes, etc.)
✅ 4 Concessionárias (RGE, Equatorial, CEEE, CPFL)
✅ 5 Grupos de Itens
✅ 4 Tipos de Poste
✅ 3 Orçamentos de Exemplo
✅ 2 Pastas de Organização
```

---

## 🔄 Reverter para Banco Real

### Opção 1 (Recomendada)
Edite `src/lib/supabaseClient.ts`:
```typescript
// Linha 4 - Comente:
// export { supabase } from './mockSupabaseClient';

// Descomente o bloco do Supabase real
```

### Opção 2
Edite `src/contexts/AppContext.tsx`:
```typescript
// Linha 9 - Mude para:
const MOCK_MODE = false;
```

---

## ⚠️ Importante

- ❌ **Dados NÃO persistem** ao recarregar a página
- ✅ Para resetar: Pressione F5
- ✅ Não precisa de internet
- ✅ Tudo é instantâneo

---

## 🐛 Problema?

1. Abra o console (F12)
2. Procure erros em vermelho
3. Veja os logs mockados:
   ```
   Mock: SELECT from materials
   Mock: INSERT into materials
   ```

---

## 💡 Dica Profissional

Abra as DevTools (F12) e veja os logs em tempo real!

Você verá algo como:
```javascript
Mock: SELECT from materials filters: []
Mock: INSERT into materials {codigo: "TEST", ...}
💰 Material mockado atualizado
```

---

## 📞 Precisa de Ajuda?

1. Leia [COMO_USAR_MOCKADO.md](./COMO_USAR_MOCKADO.md)
2. Verifique [MODO_MOCKADO.md](./MODO_MOCKADO.md)
3. Consulte [RESUMO_ALTERACOES.md](./RESUMO_ALTERACOES.md)

---

## ✅ Checklist Rápido

- [x] Sistema mockado
- [x] Sem dependência do Supabase
- [x] Funciona offline
- [x] Dados de exemplo
- [x] Documentação completa
- [x] Fácil reversão
- [x] Logs de debug
- [x] Interface igual

---

**Tudo funcionando!** 🎉

Aproveite o sistema mockado para desenvolvimento e testes!

---

*Última atualização: 13/02/2026*
*Versão: 1.0.0 - Sistema Mockado*
