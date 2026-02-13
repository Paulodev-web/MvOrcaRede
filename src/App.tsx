import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import { Layout } from './components/Layout';
import { AdminLayout } from './components/AdminLayout';
import { AdminDashboard } from './components/AdminDashboard';
import { ToolsManagement } from './components/ToolsManagement';
import { AdminSettings } from './components/AdminSettings';
import { Dashboard } from './components/Dashboard';
import { AreaTrabalho } from './components/AreaTrabalho';
import { Configuracoes } from './components/Configuracoes';
import { GerenciarMateriais } from './components/GerenciarMateriais';
import { GerenciarGrupos } from './components/GerenciarGrupos';
import { GerenciarConcessionarias } from './components/GerenciarConcessionarias';
import { GerenciarTiposPostes } from './components/GerenciarTiposPostes';
import { EditorGrupo } from './components/EditorGrupo';
import { ModuloPrecificacao } from './components/ModuloPrecificacao';
import { PrecificacaoStandalone } from './components/PrecificacaoStandalone';
import { ModuloSourcing } from './components/ModuloSourcing';
import { ModuloObra } from './components/ModuloObra';
import { ModuloPortalCliente } from './components/ModuloPortalCliente';
import { PortalClientePublico } from './components/PortalClientePublico';
import { ErrorBoundary } from './components/ErrorBoundary';

// Componente OrçaRede - a ferramenta de orçamentos
function OrcaRedeApp() {
  const { currentView } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'orcamento':
        return <AreaTrabalho />;
      case 'configuracoes':
        return <Configuracoes />;
      case 'materiais':
        return <GerenciarMateriais />;
      case 'grupos':
        return <GerenciarGrupos />;
      case 'concessionarias':
        return <GerenciarConcessionarias />;
      case 'tipos-postes':
        return <GerenciarTiposPostes />;
      case 'editor-grupo':
        return <EditorGrupo />;
      case 'precificacao':
        return <ModuloPrecificacao />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      <ErrorBoundary>
        {renderCurrentView()}
      </ErrorBoundary>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Rota raiz redireciona para o painel admin */}
          <Route path="/" element={<Navigate to="/admin" replace />} />

          {/* Rotas do Painel Administrativo */}
          <Route path="/admin" element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          } />
          
          <Route path="/admin/tools" element={
            <AdminLayout>
              <ToolsManagement />
            </AdminLayout>
          } />
          
          <Route path="/admin/settings" element={
            <AdminLayout>
              <AdminSettings />
            </AdminLayout>
          } />

          {/* Rota da Ferramenta OrçaRede */}
          <Route path="/tools/orcared/*" element={
            <AppProvider>
              <OrcaRedeApp />
            </AppProvider>
          } />

          {/* Rota da Ferramenta Precificação (Standalone) */}
          <Route path="/tools/precificacao" element={
            <AppProvider>
              <PrecificacaoStandalone />
            </AppProvider>
          } />

          {/* Rota da Ferramenta Sourcing */}
          <Route path="/tools/sourcing" element={<ModuloSourcing />} />

          {/* Rota da Ferramenta Obra */}
          <Route path="/tools/obra" element={<ModuloObra />} />

          {/* Rota da Ferramenta Portal do Cliente (Admin Config) */}
          <Route path="/tools/portal-cliente" element={<ModuloPortalCliente />} />

          {/* Rota Pública - Portal que o Cliente Acessa */}
          <Route path="/portal/:obraId" element={<PortalClientePublico />} />

          {/* Rota catch-all */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;