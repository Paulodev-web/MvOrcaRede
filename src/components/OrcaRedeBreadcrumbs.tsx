import React from 'react';
import { ChevronRight, Home, Calculator } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function OrcaRedeBreadcrumbs() {
  const { currentView, setCurrentView } = useApp();

  const getBreadcrumbLabel = (view: string): string => {
    switch (view) {
      case 'dashboard': return 'Dashboard';
      case 'orcamento': return 'Área de Trabalho';
      case 'configuracoes': return 'Configurações';
      case 'materiais': return 'Gerenciar Materiais';
      case 'grupos': return 'Grupos de Itens';
      case 'concessionarias': return 'Concessionárias';
      case 'tipos-postes': return 'Tipos de Postes';
      case 'editor-grupo': return 'Editor de Grupo';
      case 'precificacao': return 'Precificação';
      default: return 'OrçaRede';
    }
  };

  const breadcrumbs: Array<{ view: string; label: string; isRoot?: boolean }> = [
    { view: 'dashboard', label: 'OrçaRede', isRoot: true }
  ];

  if (currentView !== 'dashboard') {
    breadcrumbs.push({ view: currentView, label: getBreadcrumbLabel(currentView) });
  }

  return (
    <nav className="flex items-center space-x-2 text-sm">
      <Calculator className="h-4 w-4 text-blue-600" />
      
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-gray-900 font-medium">{crumb.label}</span>
          ) : (
            <button
              onClick={() => setCurrentView(crumb.view)}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              {crumb.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
