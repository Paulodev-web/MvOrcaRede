import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AVAILABLE_TOOLS, Tool } from '../types/tools';
import { ExternalLink, Plus, Settings, CheckCircle, XCircle } from 'lucide-react';

export function ToolsManagement() {
  const navigate = useNavigate();
  const [tools] = useState<Tool[]>(AVAILABLE_TOOLS);

  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case 'finance': return 'Financeiro';
      case 'productivity': return 'Produtividade';
      case 'analytics': return 'Análise';
      case 'utilities': return 'Utilitários';
      default: return 'Outros';
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'finance': return 'bg-green-100 text-green-700';
      case 'productivity': return 'bg-blue-100 text-blue-700';
      case 'analytics': return 'bg-purple-100 text-purple-700';
      case 'utilities': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gerenciar Ferramentas
          </h1>
          <p className="text-gray-600">
            Configure e gerencie todas as ferramentas disponíveis no painel
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
              <Plus className="h-4 w-4" />
              Nova Ferramenta
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configurações
            </button>
          </div>
          
          <div className="text-sm text-gray-600">
            <span className="font-medium">{tools.length}</span> ferramentas no total
          </div>
        </div>

        {/* Tools List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ferramenta
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Versão
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tools.map((tool) => (
                  <tr key={tool.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center text-xl mr-3 shadow-sm flex-shrink-0`}>
                          {tool.icon}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {tool.name}
                          </div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {tool.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(tool.category)}`}>
                        {getCategoryLabel(tool.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tool.version || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {tool.enabled ? (
                        <span className="inline-flex items-center gap-1 text-green-700 text-sm font-medium">
                          <CheckCircle className="h-4 w-4" />
                          Ativo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-700 text-sm font-medium">
                          <XCircle className="h-4 w-4" />
                          Inativo
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(tool.route)}
                          className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                        >
                          Abrir
                          <ExternalLink className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-700 font-medium">
                          Configurar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-lg">💡</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900 mb-1">
                Adicione Novas Ferramentas
              </h3>
              <p className="text-sm text-blue-700">
                Para adicionar uma nova ferramenta, edite o arquivo <code className="bg-blue-100 px-1 rounded">src/types/tools.ts</code> e 
                adicione a configuração da ferramenta no array <code className="bg-blue-100 px-1 rounded">AVAILABLE_TOOLS</code>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
