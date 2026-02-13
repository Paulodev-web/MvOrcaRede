import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  Settings, 
  Menu, 
  X,
  Home,
  ChevronLeft,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      path: '/admin',
      description: 'Visão geral'
    },
    {
      id: 'tools',
      label: 'Ferramentas',
      icon: LayoutGrid,
      path: '/admin/tools',
      description: 'Todas as ferramentas'
    },
    {
      id: 'settings',
      label: 'Configurações',
      icon: Settings,
      path: '/admin/settings',
      description: 'Configurar painel'
    }
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Botão mobile para abrir sidebar */}
      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg text-gray-600 hover:text-gray-900 border border-gray-200 transition-all duration-200"
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      
      {/* Overlay para mobile */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileSidebar}
        />
      )}

      <div className="flex h-full">
        {/* Sidebar */}
        <div className={`
          ${isCollapsed ? 'w-16' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          fixed lg:static left-0 top-0 h-screen bg-white shadow-xl border-r border-gray-200 z-40 
          transition-all duration-300 ease-in-out
          flex flex-col
        `}>
          {/* Header da Sidebar */}
          <div className={`
            flex items-center justify-between p-4 border-b border-gray-200
            ${isCollapsed ? 'px-2' : 'px-4'}
          `}>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
                <p className="text-xs text-gray-500 truncate">
                  Painel de Gerenciamento
                </p>
              </div>
            )}
            
            {/* Botão de colapsar - só visível no desktop */}
            <button
              onClick={toggleSidebar}
              className="hidden lg:block p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
              title={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Navegação */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileOpen(false);
                  }}
                  className={`
                    w-full flex items-center px-3 py-2.5 text-left rounded-lg transition-all duration-200
                    ${active 
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                    ${isCollapsed ? 'justify-center' : 'space-x-3'}
                  `}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium block">{item.label}</span>
                      <span className="text-xs opacity-75 block truncate">{item.description}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer da Sidebar */}
          <div className="border-t border-gray-200 p-3">
            {!isCollapsed && (
              <div className="px-3">
                <p className="text-xs text-gray-500">
                  Admin Panel v1.0
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Breadcrumbs e Navegação */}
            {location.pathname !== '/admin' && (
              <div className="mb-6 flex items-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Voltar"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
                <Breadcrumbs />
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
