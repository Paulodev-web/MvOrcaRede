import React from 'react';
import { Bell, Shield, Palette, Globe, Database, Key } from 'lucide-react';

export function AdminSettings() {
  const settingsSections = [
    {
      id: 'general',
      title: 'Configurações Gerais',
      icon: Globe,
      description: 'Configurações básicas do painel',
      settings: [
        { id: 'app_name', label: 'Nome do Painel', value: 'Admin Panel', type: 'text' },
        { id: 'language', label: 'Idioma', value: 'Português', type: 'select' },
        { id: 'timezone', label: 'Fuso Horário', value: 'America/Sao_Paulo', type: 'select' },
      ]
    },
    {
      id: 'appearance',
      title: 'Aparência',
      icon: Palette,
      description: 'Personalize o visual do painel',
      settings: [
        { id: 'theme', label: 'Tema', value: 'Claro', type: 'select' },
        { id: 'color_scheme', label: 'Esquema de Cores', value: 'Azul', type: 'select' },
        { id: 'compact_mode', label: 'Modo Compacto', value: false, type: 'toggle' },
      ]
    },
    {
      id: 'notifications',
      title: 'Notificações',
      icon: Bell,
      description: 'Configure alertas e notificações',
      settings: [
        { id: 'email_notifications', label: 'Notificações por Email', value: true, type: 'toggle' },
        { id: 'push_notifications', label: 'Notificações Push', value: false, type: 'toggle' },
        { id: 'sound_alerts', label: 'Alertas Sonoros', value: true, type: 'toggle' },
      ]
    },
    {
      id: 'security',
      title: 'Segurança',
      icon: Shield,
      description: 'Configurações de segurança',
      settings: [
        { id: 'two_factor', label: 'Autenticação de Dois Fatores', value: false, type: 'toggle' },
        { id: 'session_timeout', label: 'Tempo de Sessão (min)', value: '30', type: 'number' },
        { id: 'ip_whitelist', label: 'Lista de IPs Permitidos', value: false, type: 'toggle' },
      ]
    },
    {
      id: 'database',
      title: 'Banco de Dados',
      icon: Database,
      description: 'Configurações do banco de dados',
      settings: [
        { id: 'db_host', label: 'Host', value: 'localhost', type: 'text' },
        { id: 'db_port', label: 'Porta', value: '5432', type: 'number' },
        { id: 'auto_backup', label: 'Backup Automático', value: true, type: 'toggle' },
      ]
    },
    {
      id: 'api',
      title: 'API & Integrações',
      icon: Key,
      description: 'Gerenciar chaves de API',
      settings: [
        { id: 'api_enabled', label: 'API Habilitada', value: true, type: 'toggle' },
        { id: 'api_key', label: 'Chave da API', value: '••••••••••••', type: 'password' },
        { id: 'rate_limit', label: 'Limite de Requisições/min', value: '100', type: 'number' },
      ]
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Configurações
          </h1>
          <p className="text-gray-600">
            Gerencie as configurações do painel administrativo
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {section.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {section.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {section.settings.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        {setting.label}
                      </label>
                      
                      {setting.type === 'toggle' && (
                        <button
                          className={`
                            relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                            ${setting.value ? 'bg-blue-600' : 'bg-gray-200'}
                          `}
                        >
                          <span
                            className={`
                              inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                              ${setting.value ? 'translate-x-6' : 'translate-x-1'}
                            `}
                          />
                        </button>
                      )}

                      {setting.type === 'text' && (
                        <input
                          type="text"
                          value={setting.value as string}
                          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      )}

                      {setting.type === 'number' && (
                        <input
                          type="number"
                          value={setting.value as string}
                          className="w-24 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      )}

                      {setting.type === 'select' && (
                        <select
                          value={setting.value as string}
                          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option>{setting.value}</option>
                        </select>
                      )}

                      {setting.type === 'password' && (
                        <input
                          type="password"
                          value={setting.value as string}
                          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end gap-3">
          <button className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Cancelar
          </button>
          <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-sm">
            Salvar Configurações
          </button>
        </div>
      </div>
    </div>
  );
}
