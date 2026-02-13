# MvOrçaRede

Sistema de orçamentação de redes elétricas - **100% livre e aberto**

## 🚀 Características

- **Sem autenticação**: Sistema completamente aberto, funciona como um site estático
- **Dados locais**: Todos os dados são armazenados localmente no navegador
- **Acesso imediato**: Não requer login, cadastro ou configuração

## 📦 Como usar

### Desenvolvimento

```bash
npm install
npm run dev
```

### Build para Produção

```bash
npm run build
```

Os arquivos de produção estarão na pasta `dist/`

## 🌐 Deploy

O sistema funciona como uma SPA (Single Page Application) estática. Para deploy:

### Vercel / Netlify
- Basta conectar o repositório e fazer deploy automático
- Configure o comando de build como `npm run build`
- Configure a pasta de output como `dist`

### Servidor próprio (Apache/Nginx)
- Faça upload da pasta `dist` para seu servidor
- Configure o servidor para redirecionar todas as rotas para `index.html`

#### Exemplo de configuração Nginx:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

#### Exemplo de configuração Apache (.htaccess):
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 📱 Módulos

- **Painel Admin** (`/admin`) - Dashboard principal
- **OrçaRede** (`/tools/orcared`) - Ferramenta de orçamentação
- **Portal Cliente** (`/portal-cliente`) - Visualização para clientes
- **Painel Executor** (`/painel-executor`) - Interface mobile para executores

## 💡 Importante

- Sistema totalmente client-side
- Dados salvos no localStorage do navegador
- Cada usuário/navegador tem seus próprios dados
- Para compartilhar dados entre usuários, será necessário implementar backend

## 🛠️ Tecnologias

- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router DOM
