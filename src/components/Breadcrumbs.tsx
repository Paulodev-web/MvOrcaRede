import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

export function Breadcrumbs() {
  const navigate = useNavigate();
  const location = useLocation();

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const path = location.pathname;
    const breadcrumbs: BreadcrumbItem[] = [];

    // Admin routes
    if (path.startsWith('/admin')) {
      breadcrumbs.push({ label: 'Admin', path: '/admin' });
      
      if (path === '/admin/tools') {
        breadcrumbs.push({ label: 'Ferramentas' });
      } else if (path === '/admin/settings') {
        breadcrumbs.push({ label: 'Configurações' });
      }
    }
    
    // Tools routes
    else if (path.startsWith('/tools')) {
      breadcrumbs.push({ label: 'Admin', path: '/admin' });
      breadcrumbs.push({ label: 'Ferramentas', path: '/admin/tools' });
      
      if (path.startsWith('/tools/orcared')) {
        breadcrumbs.push({ label: 'OrçaRede' });
      } else if (path.startsWith('/tools/precificacao')) {
        breadcrumbs.push({ label: 'Precificação' });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      <button
        onClick={() => navigate('/admin')}
        className="flex items-center hover:text-gray-900 transition-colors"
      >
        <Home className="h-4 w-4" />
      </button>
      
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          {crumb.path ? (
            <button
              onClick={() => navigate(crumb.path!)}
              className="hover:text-gray-900 transition-colors font-medium"
            >
              {crumb.label}
            </button>
          ) : (
            <span className="text-gray-900 font-medium">{crumb.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
